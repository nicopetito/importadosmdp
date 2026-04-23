import { ReactNode } from 'react'
import { generateMetadata } from './metadata'

export { generateMetadata }

export default function ProductLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
