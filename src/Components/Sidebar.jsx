import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'

export default function Sidebar() {
  return (
    <div className='flex-2 w-2/6 bg-[#3e3c61] overflow-y-scroll overflow-x-hidden relative'/*w-2/5*/>
        <Navbar />
        <Search />
        <Chats />
    </div>
  )
}
