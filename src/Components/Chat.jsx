import React, {useContext} from 'react'
import Cam from '../images/cam.png'
import Add from '../images/add.png'
import More from '../images/more.png'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'

export default function Chat() {
  const { data } = useContext(ChatContext);
  console.log(data);

  return (
    <div className='chat flex-1 '>
      <div className="chatInfo h-12 bg-[#5d5b8d] text-gray-100 flex items-center justify-between p-2">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons flex">
          <img src={Cam} alt="" className='h-6 cursor-pointer' />
          <img src={Add} alt="" className='h-6 cursor-pointer' />
          <img src={More} alt="" className='h-6 cursor-pointer' />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}
