import LinkTree from '../components/LinkTree'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';
import Link from 'next/link';
import SocialTree from '../components/SocialTree';
import ShareButton from '../components/ShareButton';
import NavBar from '@/components/Navbar';

// Dynamic profile page at /[username]
// Fetches public profile data from backend and renders LinkTree + socials
const Username = () => {

  const router = useRouter();
  const [data, setData] = useState({});
  const [userFound, setUserFound] = useState(false);

  const [socials, setSocials] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    youtube: '',
    linkedin: '',
    github: ''
  })

  useEffect(() => {
    // When the router has the username param, fetch profile from backend
    if(router.query?.username) {
      fetch(`http://localhost:8000/get/${router.query.username}`)
      .then((res) => res.json())
      .then((data) => {
        if(data.status === 'error') {
          console.log(data.error);
          return toast.error(data.error, {
            position: 'bottom-right',
            theme: 'dark'
          })
        }
        if(data.status === 'success') {
          setData(data.userData);
          setSocials(data.socials);
          setUserFound(true);
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  }, [router.query])

  // useEffect(() => {
  //   if(router.query?.username) {
  //     fetch(`http://localhost:8000/get/socials/${router.query.username}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if(data.status === 'error') {
  //         console.log(data.error);
  //         return toast.error(data.error, {
  //           position: 'bottom-right',
  //           theme: 'dark'
  //         })
  //       }
  //       if(data.status === 'success') {
  //         setSocials(data.socials);
  //       }
  //     }).catch((err) => {
  //       console.log(err);
  //     })
  //   }
  // }, [router.query])


  if(!userFound) {
    return(
      <>
        <NavBar />
        <div className='flex justify-center items-center h-screen text-white text-center'>
          <div className='not-found px-3'>
            <h1 className='font-bold text-xl'>User Not Found</h1>
            <p>If you're looking for a page, double check the spelling</p>
            Create your own <Link className='text-cyan-500 hover:text-cyan-400 trasition-all duration-400' href="/apply">LinkTree</Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <div>
      <NavBar />
      <ShareButton />
      <LinkTree data={data} />
      <SocialTree socials={socials} />
    </div>
  )
}

export default Username;