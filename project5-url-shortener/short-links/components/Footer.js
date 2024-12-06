import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    

<footer className="bg-white rounded-lg shadow dark:bg-gray-800 fixed bottom-0 w-full">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-4">
        <div className="sm:flex sm:items-center sm:justify-between">
            <Link href="/" className="flex items-center sm:mb-0 space-x-3 rtl:space-x-reverse">
                <Image className="rounded-lg" src="/logo.png" width={30} height={30} alt="BitLinks Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BitLinks</span>
            </Link>
            <ul className="flex flex-wrap items-center mb-1 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <Link href="/about" className="hover:underline me-2 md:me-6">About</Link>
                </li>
                <li>
                    <Link href="#" className="hover:underline me-2 md:me-6">Privacy Policy</Link>
                </li>
                <li>
                    <Link href="#" className="hover:underline me-2 md:me-6">Licensing</Link>
                </li>
                <li>
                    <Link href="/contact" className="hover:underline">Contact</Link>
                </li>
            </ul>
        </div>
        <hr className="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <Link href="/" className="hover:underline">BitLinks™</Link>. All Rights Reserved.</span>
    </div>
</footer>


  )
}

export default Footer
