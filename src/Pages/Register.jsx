import React, { useState } from 'react'
import Add from '../images/gallery.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)

        const date = new Date().getTime();
        const storageRef = ref(storage, `${displayName + date}`);

        await uploadBytesResumable(storageRef, file).then(()=>{
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
              await setDoc(doc(db, "users", res.user.uid), {
                displayName,
                email,
                photoURL: downloadURL,
                uid: res.user.uid,
              });
              await setDoc(doc(db, "userChats", res.user.uid), {});
              navigate('/');
            } catch (error) {
              setErr(error.message);
              setLoading(false);
            }
        });
      });
          } catch (error) {
              setErr(error.message)
              setLoading(false);
            }

    };

  return (
      <div className='bg-[#a7bcff] h-screen flex items-center justify-center'>
        <div className='bg-white rounded-xl py-5 px-14 text-center flex-col items-center justify-center'>
          <div className='mb-5 text-2xl text-[#5d5b8d] font-bold'>My Chat</div>
          <div className='text-sm text-[#5d5b8d]' >Register</div>
          <form className='space-y-4 sm:w-80 flex flex-col items-center justify-center' onSubmit={handleSubmit}>
            <input
              className='w-64 border-b border-b-[#a7bcff] px-3 py-2'
              type='text'
              placeholder='Name'
            />
            <input
              className='w-64 border-b border-b-[#a7bcff] px-3 py-2'
              type='email'
              placeholder='Email'
            />
            <input
              className='w-64 border-b border-b-[#a7bcff] px-3 py-2'
              type='password'
              placeholder='Password'
            />
            <input className='hidden' type='file' id='file' />
            <label className='w-64 ml-8 flex items-center justify-center cursor-pointer' htmlFor="file">
              <img className='h-10' src={Add} alt="add image" />
              <span className='text-[#8da4f1] text-sm ml-2'>Add image</span>
            </label>
            <button
              className='w-64 bg-[#7b96ec] text-white font-semibold py-2 px-4 rounded hover:bg-blue-500'
              type='submit'
              disabled={loading}
            >
              Sign up
            </button>
            {loading && "Uploading and compressing the image please wait..."}
            {err !=='' && <p className='text-red-500'>{err}</p>}
          </form>
          <p className='text-[#5d5b8d] mt-3 text-center'>
            You already have an account? <Link to="/Login">Login</Link>
          </p>
        </div>
      </div>
  )
}
