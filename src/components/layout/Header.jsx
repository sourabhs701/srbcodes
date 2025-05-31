// app/components/Navbar.jsx
'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <nav className='flex justify-between items-center px-5 md:px-10 py-4 sticky top-0 z-50 bg-white'>
      <div className='font-handwritten text-2xl md:text-3xl'>
        <Link href={'/'} className="hover:opacity-80 transition-opacity">SRB.Codes</Link>
      </div>
      <div className='font-inter text-sm flex space-x-6 items-center'>
        <Link href={'/work'} className='blue-dot hover:text-blue-600 transition-colors font-medium'>Work</Link>
        <Link href={'/me'} className='hover:text-blue-600 transition-colors font-medium'>me?</Link>
      </div>
    </nav>
  )
}