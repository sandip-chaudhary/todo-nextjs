import React from 'react'

export default function Navbar() {
  return (
    <nav className="flex justify-between bg-indigo-900 text-white py-2">
        <div className="logo">
            <span className="font-bold text-xl mx-9">iTask</span>
        </div>
        <ul className="flex gap-8 mx-9">
            <li className='cursor-pointer hover:font-bold transition-all duration-150 w-10'>home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-150 w-24'>Your Tasks</li>
        </ul>
    </nav>
  )
}
