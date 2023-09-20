import React from 'react'
import Sidebar from '../Components/Sidebar'
import Chat from '../Components/Chat'

export default function Home() {
  return (
    <div className='bg-[#a7bcff] h-screen flex items-center justify-center'>
      <div className="container border border-white rounded-lg w-3/4 h-4/5 max-md:w-11/12 flex overflow-hidden">
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}
/**w-3/4 */