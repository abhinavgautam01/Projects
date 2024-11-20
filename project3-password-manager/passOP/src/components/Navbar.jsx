import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800'>
      <div className="mycontainer flex justify-between items-center px-4 py-5 max-h-14">
        <div className="logo font-bold text-white text-2xl">
            <span className='text-green-600'>&lt;</span>
            <span>Pass</span>
            <span className='text-green-600'>OP/&gt;</span>
          </div>
        {/* <ul>
          <li className='flex gap-4 text-white'>
            <a className='hover:font-bold ' href="/">Home</a>
            <a className='hover:font-bold' href="#">About</a>
            <a className='hover:font-bold' href="#">Contact Us</a>
          </li>
        </ul> */}
        <button className='text-white bg-green-700 my-5 rounded-full flex gap-2 justify-between items-center ring-white ring-1'>
          <img className='invert p-1 w-10' src="/github.svg" alt="" />
          <span className="font-bold px-2">GitHub</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
