import React, { useContext, useEffect, useState } from 'react'
import LinkBox from '../components/LinkBox';
import UserHeader from '../components/UserHeader';
import { toast } from 'react-toastify';
import UserContext from '../context/userContext';
import NavBar from '@/components/Navbar';
import { API_URL } from '../lib/api';

const dashboard = () => {

  const [data, setData] = useState({})

  const { setUserData } = useContext(UserContext);

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
      setData(data.userData);
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
      <NavBar />
      <div className="">
      <UserHeader/>
        <main>
          <section className='grid md:grid-cols-2 xl:grid-cols-4 gap-5'>
            <LinkBox title="Links" number={data.links ? data.links : 0} svg="link" bgcolor="bg-cyan-400"/>
            <LinkBox title="Growth" number="50%" svg="chart" bgcolor="bg-green-400"/>
          </section>
          <section>
            
          </section>
        </main>
      </div>
    </>
  )
}

export default dashboard;