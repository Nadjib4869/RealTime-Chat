import React, { useContext, useState } from 'react'
import Img from '../images/img.png'
import Attach from '../images/attach.png'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { doc, serverTimestamp, Timestamp, arrayUnion, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import {v4 as uuid} from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function Input() {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);


  const handleSend = async () => {
    
    if(img){
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          sender: currentUser.uid,
          date: Timestamp.now()
        })
      })
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText('');
    setImg(null);
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className='input h-12 bg-white p-2 flex items-center justify-between'>
      <input value={text} onKeyDown={handleEnter} onChange={e=>setText(e.target.value)} type="text" placeholder='Tap a Message...' className='w-full text-lg text-[#2f2d52] outline-none' />
      <div className="send flex items-center">
        <img src={Attach} alt="attach icon" className='h-6 cursor-pointer' />
        <input onChange={e=>setImg(e.target.files[0])} type="file" className='hidden' id='file' />
        <label htmlFor="file">
          <img src={Img} alt="image icon" className='h-6 cursor-pointer w-12 max-sm:w-16 pr-1.5' />
        </label>
        <button onClick={handleSend} className='text-white bg-[#8da4f1] cursor-pointer p-1 rounded'>Send</button>
      </div>
    </div>
  )
}
