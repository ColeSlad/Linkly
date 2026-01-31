import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';
import Link from 'next/link';
import UserContext from '../context/userContext';
import { API_URL } from '../lib/api';

const UserHeader = () => {

  const router = useRouter();

  // const {name, role, avatar, username, links} = data;

  const handleLogout = () => {
    localStorage.removeItem("LinkTreeToken");
    router.push('/login')
    toast.success('You have been logged out successfully', {
      position: 'bottom-right',
      theme: 'dark'
    })
  }

  const { userData, setUserData } = useContext(UserContext);
  const {role, avatar, username} = userData;

  useEffect(() => {
    if(!localStorage.getItem('LinkTreeToken')) return window.location.href = "/login";
    fetch(`${API_URL}/data/dashboard`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        tokenMail: localStorage.getItem('LinkTreeToken')
      })
    }).then((res) => res.json())
    .then((data) => {
      if(data.status === 'error') { 
        toast.error('An error has occurred', 
        {
          position: "bottom-right",
          theme: "dark",
        })
      }
      
      setUserData(data.userData);
      localStorage.setItem('userUsername', data.userData.username)
      // toast.success(data.message, 
      // {
      //   position: "bottom-right",
      //   theme: "dark",
      // })
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <>
      <header className='flex flex-row justify-between items-center'>
        <div className="flex flex-col md:flex-row p-3">
          <Link href="/edit/links">
            <button className='inline-flex w-full md:w-auto px-5 py-3 text-cyan-500 hover:text-cyan-400 hover:bg-cyan-950 hover:bg-opacity-20  rounded-md my-2 border-2 border-cyan-950'>
              <img src="/svg/linkwhite.svg" className="w-6 mr-2"/> 
              <h5>Edit Links</h5>
            </button>
          </Link>
          <Link href="/edit/profile">
            <button className='inline-flex w-full md:w-auto px-5 py-3 text-blue-500 hover:text-blue-400 hover:bg-blue-950 hover:bg-opacity-20 rounded-md my-2 md:ml-3 border-2 border-blue-950'>
              <img src="/svg/user.svg" className="w-6 mr-2"/> 
              <h5>Edit Profile</h5>
            </button>
          </Link>
        </div>
          <div className="flex flex-row">
          <Link href={`/${username}`} className='mr-5'>
            <div className="inline-flex text-white text-right items-center bg-cyan-900 bg-opacity-20 px-5 py-2 rounded-lg">
              <div className="text-xs md:text-md flex flex-col flex-wrap">
                <span className='font-bold'>{username}</span>
                <span>{role?.charAt(0).toUpperCase()+ role?.slice(1)} Account</span>
              </div>
              <div className="user-img">
                <img src={avatar} className="w-10 ml-3 rounded-full"/>
              </div>
            </div>
          </Link>
          <img className='w-6 mr-5 cursor-pointer' src="/svg/notification.svg" alt=""/>
          <img className='w-6 mr-5 cursor-pointer' src="/svg/exit.svg" alt="" onClick={handleLogout}/>
          </div>

      </header>
    </>
  )
}

export default UserHeader