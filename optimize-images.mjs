import sharp from 'sharp';
import { readdir, stat, unlink } from 'fs/promises';
import { join } from 'path';

const publicDir = './public';

// Optimize iPhone image specifically
await sharp(join(publicDir, 'Iphone.jpg'))
  .resize(600)
  .webp({ quality: 82 })
  .toFile(join(publicDir, 'iphone-hero.webp'));

const orig = await stat(join(publicDir, 'Iphone.jpg'));
const opt = await stat(join(publicDir, 'iphone-hero.webp'));
console.log(`✅ Iphone.jpg: ${(orig.size/1024).toFixed(0)}KB → iphone-hero.webp: ${(opt.size/1024).toFixed(0)}KB (${((1 - opt.size/orig.size)*100).toFixed(0)}% reduction)`);

// Also convert other product images to webp
const images = ['compu.jpeg', 'modeloUno.jpeg', 'modeloDos.jpeg', 'modeloTres.jpeg'];
for (const img of images) {
  const name = img.replace(/\.(jpeg|jpg|png)$/i, '.webp');
  await sharp(join(publicDir, img))
    .resize(400)
    .webp({ quality: 82 })
    .toFile(join(publicDir, name));
  const o = await stat(join(publicDir, img));
  const n = await stat(join(publicDir, name));
  console.log(`✅ ${img}: ${(o.size/1024).toFixed(0)}KB → ${name}: ${(n.size/1024).toFixed(0)}KB`);
}

console.log('\n🎉 All images optimized!');
