import React, { useContext, useEffect, useState } from 'react'
import LinkBox from '../components/LinkBox';
import UserHeader from '../components/UserHeader';
import { toast } from 'react-toastify';
import UserContext from '../context/userContext';
import NavBar from '@/components/Navbar';
import { API_URL } from '../lib/api';
import ServerLoading from '../components/ServerLoading';

const dashboard = () => {

  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true);

  const { setUserData } = useContext(UserContext);

  useEffect(() => {
    if(!localStorage.getItem('LinkTreeToken')) return window.location.href = "/login";
    setIsLoading(true);
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
      setIsLoading(false);
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
    }).catch((err) => {
      console.log(err);
      setIsLoading(false);
    })
  }, [])

  return (
    <>
      <ServerLoading isLoading={isLoading} />
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