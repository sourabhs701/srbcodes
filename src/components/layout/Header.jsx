// app/components/Navbar.jsx
'use client';
import Link from 'next/link';
export default function Header() {
  return (
    <nav className='flex justify-between p-5 md:p-10 mx-5 md:mx-10 sticky top-0 z-50 '>
      <div className='font-handwritten text-3xl md:text-4xl'>
        <Link href={'/'}>SRB.Codes</Link>
      </div>
      <div className='font-inter text-sm flex space-x-3 md:space-x-4 items-center'>
        <Link href={'/work'} className='blue-dot'>work</Link>
        <Link href={'/me'}>me?</Link>
      </div>
    </nav>
  )
}