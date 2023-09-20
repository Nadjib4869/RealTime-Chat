import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

export default function Navbar() {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='flex items-center justify-between bg-[#2f2d52] h-12 p-2 text-[#ddddf7]'>
      <span className='Logo font-bold max-md:hidden'>My Chat</span>
      <div className="user flex gap-2">
        <img src={currentUser.photoURL} alt="" className='bg-[#ddddf7] h-6 w-6 rounded-full object-cover'/>
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)} className='bg-[#5d5b8d] text-xs cursor-pointer hover:bg-slate-600 rounded p-1 max-md:absolute max-md:bottom-2.5'>Logout</button>
      </div>
    </div>
  )
}
