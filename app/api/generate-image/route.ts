import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
  try {
    const { name, brand, category, id } = await req.json()

    if (!name || !brand || !category) {
      return NextResponse.json({ error: 'Faltan parámetros requeridos: name, brand, category' }, { status: 400 })
    }

    const falKey = process.env.FAL_KEY || process.env.NEXT_PUBLIC_FAL_KEY

    if (!falKey) {
      console.error('FAL_KEY is not configured in environment variables')
      return NextResponse.json({ error: 'La API Key de Fal.ai no está configurada.' }, { status: 500 })
    }

    // Dynamic prompt focused on creating clean studio shots with solid pure white background
    const prompt = `Professional studio product shot of ${brand} ${name} ${category}, centered, sharp focus, cinematic lighting, high resolution, isolated on a solid, clean, pure white background.`

    console.log(`Generating image for: ${brand} ${name} with prompt: ${prompt}`)

    // Use Fal.ai fast Stable Diffusion 3.5 Large model
    const response = await fetch('https://queue.fal.run/fal-ai/stable-diffusion-v35/large', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${falKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        image_size: 'square',
        num_inference_steps: 28,
        guidance_scale: 7.5,
        sync_mode: true
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Fal.ai image generation failed:', errorText)
      return NextResponse.json({ error: 'La generación de imagen falló en el proveedor de IA.' }, { status: 502 })
    }

    const result = await response.json()
    const imageUrl = result?.images?.[0]?.url

    if (!imageUrl) {
      return NextResponse.json({ error: 'No se recibió una URL de imagen de la IA.' }, { status: 500 })
    }

    // If ID is supplied, attempt to download the image and upload it to Supabase Storage
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

    if (id && supabaseUrl && supabaseServiceKey) {
      const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

      // Fetch the image file as a blob
      const imageFetch = await fetch(imageUrl)
      const imageBlob = await imageFetch.blob()
      const fileExt = imageBlob.type === 'image/png' ? 'png' : 'jpg'
      const filePath = `products/${id}-${Date.now()}.${fileExt}`

      // Upload image to products bucket (Ensure bucket is created in Supabase with public access)
      const { error: uploadError } = await supabaseAdmin.storage
        .from('product-images')
        .upload(filePath, imageBlob, {
          contentType: imageBlob.type,
          cacheControl: '3600',
          upsert: true
        })

      if (uploadError) {
        console.error('Failed to upload generated image to Supabase Storage:', uploadError)
        // Fallback: return the fal.ai URL if storage upload failed
        return NextResponse.json({ success: true, imageUrl })
      }

      // Get public URL of the uploaded file
      const { data: { publicUrl } } = supabaseAdmin.storage
        .from('product-images')
        .getPublicUrl(filePath)

      return NextResponse.json({ success: true, imageUrl: publicUrl })
    }

    return NextResponse.json({ success: true, imageUrl })
  } catch (error: any) {
    console.error('Error generating image route:', error)
    return NextResponse.json({ error: error.message || 'Error interno del servidor' }, { status: 500 })
  }
}
