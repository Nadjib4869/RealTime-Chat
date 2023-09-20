import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {

  const [err, setErr] = useState('');
  const navigate = useNavigate();

 async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
     } catch (error) {
        setErr(error.message)
     }

  }

  return (
      <div className='bg-[#a7bcff] h-screen flex items-center justify-center'>
        <div className='bg-white rounded-xl py-5 px-14 text-center flex-col items-center justify-center'>
          <div className='mb-5 text-2xl text-[#5d5b8d] font-bold'>My Chat</div>
          <div className='text-sm text-[#5d5b8d]'>Login</div>
          <form onSubmit={handleSubmit} className='space-y-4 sm:w-80 flex flex-col justify-center items-center'>
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
            <button
              className='w-64 bg-[#7b96ec] text-white font-semibold py-2 px-4 rounded hover:bg-blue-500'
              type='submit'
            >
              Sign in
            </button>
            {err !=='' && <p className='text-red-500'>{err}</p>}
          </form>
          <p className='text-[#5d5b8d] mt-3 text-center'>
            You don't have an account? <Link to="/Register">Register</Link>
          </p>
        </div>
      </div>
  )
}
