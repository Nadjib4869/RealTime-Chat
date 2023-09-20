import React, {useContext, useState} from 'react'
import { collection, query, where, doc, getDocs, getDoc, setDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from '../context/AuthContext';

export default function Search() {
  const [userName, setUserName] = useState('')
  const [user, setUser] = useState(null)
  const [err, setErr] = useState('')

  const {currentUser} = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", userName));
    
    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      });
    } catch (error) {
      setErr(error.message)
    }
  }

  const handleKey = (e) => {
    e.code === 'Enter' && handleSearch() 
  }

  const handleSelect = async () => {
    //check if the group(chats in firestore) already exist, if not create
    const comdinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try{
      const res = await getDoc(doc(db,"chats", comdinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", comdinedId), {
          messages: [],
        });
        
        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [comdinedId+".userInfo"]:{
            uid:user.uid,
            displayName:user.displayName,
            photoURL:user.photoURL
          },
          [comdinedId+".date"]:serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [comdinedId+".userInfo"]:{
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL:currentUser.photoURL
          },
          [comdinedId+".date"]:serverTimestamp(),
        });
        /*userChats:{
          janesId:{
            combinedId:{
              userInfo{
                dn,img,id
              },
              lastMessage:''
              date:
            }
          }
        }*/

      }
    } catch (error) {
      setErr(error.message)
    }

    setUser(null)
    setUserName('')
  }

  return (
    <div className='search border-b border-b-gray-500'>
      <div className="searchForm p-2.5">
        <input value={userName} onKeyDown={handleKey} onChange={e => setUserName(e.target.value)} type="text" placeholder='Find a user' className='bg-transparent text-white' />
      </div>
      {err !== '' && <p className='text-red-500'>{err}</p>}
      {user && <div onClick={handleSelect} className="userChat p-2 flex items-center gap-10 text-white cursor-pointer hover:bg-[#2f2d52]">
        <img src={user.photoURL} alt="" className='w-12 h-12 rounded-full object-cover' />
        <div className="userChatInfo">
          <span className='text-lg font-medium max-xs:hidden'>
            {user.displayName}
          </span>
        </div>
      </div>}
    </div>
  )
}
