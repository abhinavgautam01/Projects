import React from 'react'
import Link from 'next/link'
const Navbar = () => {
  return (
    <nav className='h-16 dark:bg-gray-900 flex justify-between px-3 items-center text-white'>
        <div className='logo font-bold text-2xl'>
            <Link href="/">BitLinks</Link>
        </div>
        <ul className='flex justify-center gap-4 items-center font-semibold'>
            <Link className='hover:text-[17px] transition-all' href="/"><li>Home</li></Link>
            <Link className='hover:text-[17px] transition-all' href="/about"><li>About</li></Link>
            <Link className='hover:text-[17px] transition-all' href="/shorten"><li>Shorten</li></Link>
            <Link className='hover:text-[17px] transition-all' href="/contact"><li>Contact Us</li></Link>
            <li className='flex gap-3'>
                <Link href="/shorten" className='bg-slate-700 hover:bg-slate-600 hover:text-[17px] transition-all shadow-lg rounded-lg p-3 py-2 font-bold'><button>Try Now</button></Link>
                <Link href="/github" className='bg-slate-700 hover:bg-slate-600 hover:text-[17px] transition-all shadow-lg rounded-lg p-3 py-2 font-bold'><button>GitHub</button></Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar
