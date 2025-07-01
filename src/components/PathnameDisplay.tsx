'use client'

import { usePathname } from 'next/navigation'

export default function PathnameDisplay() {
  const pathname = usePathname()
  
  return (
    <p className="text-sm text-blue-600 mt-2">Current path: {pathname}</p>
  )
}