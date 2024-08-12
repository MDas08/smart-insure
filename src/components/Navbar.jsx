import React from 'react'

function Navbar() {
  return (
    <div>
    <div className='flex bg-color-blue h-14 justify-end' >
      <ul className='flex flex-row justify-end text-white mr-8'>
        <li><button className='py-4 px-8 bg-transparent hover:bg-color-dark '>Home</button></li>
        <li><button className='p-4 bg-transparent hover:bg-color-dark '>Dashboard</button></li>
        <li><button className='p-4 bg-transparent hover:bg-color-dark '>Claims</button></li>
        <li><button className='p-4 bg-transparent hover:bg-color-dark '>Log Out</button></li>
      </ul>
    </div>
    </div>
  )
}

export default Navbar