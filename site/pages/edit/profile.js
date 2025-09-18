import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/userContext';
import UserHeader from '../../components/UserHeader';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import NavBar from '@/components/Navbar';

const profile = () => {

  const router = useRouter();

  const { userData, setUserData } = useContext(UserContext);

  const [socials, setSocials] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    youtube: '',
    linkedin: '',
    github: ''
  })

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('https://cdn.iconscout.com/icon/free/png-512/free-avatar-372-456324.png?f=avif&w=512');

  const [selectedImage, setSelectedImage] = useState(null);

  function setAvatarToImageFile(file) {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      setAvatar(event.target.result)
    });
    reader.readAsDataURL(file);
  }

  const handleSocials = (e) => {
    setSocials({
      ...socials,
      [e.target.id]: e.target.value
    })
  }

  useEffect(() => {
    if(userData) {
      setName(userData.name);
      setBio(userData.bio);
      setAvatar(userData.avatar);
    }
  }, [userData]);

  const saveProfile = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/save/profile`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        tokenMail: localStorage.getItem('LinkTreeToken'),
        name: name,
        bio: bio,
        avatar: avatar
      })
    }).then((res) => res.json())
    .then((data) => {
      if(data.status === 'error') {
        return toast.error(data.message, {
          position: 'bottom-right',
          theme: 'dark'
        })
      }
      toast.success('Successfully saved profile', {
        position: 'bottom-right',
        theme: 'dark'
      })
    })
  }
  const saveSocials = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/save/socials`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        tokenMail: localStorage.getItem('LinkTreeToken'),
        socials: socials
      })
    }).then((res) => res.json())
    .then((data) => {
      if(data.status === 'error') {
        return toast.error(data.message, {
          position: 'bottom-right',
          theme: 'dark'
        })
      }
      toast.success('Successfully saved socials', {
        position: 'bottom-right',
        theme: 'dark'
      })
    })
  }

  useEffect(() => {
    if(!localStorage.getItem('LinkTreeToken')) return router.push('/login');
    fetch('http://localhost:8000/load/socials', {
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
        return toast.error(data.error, {
          position: 'bottom-right',
          theme: 'dark'
        })
      }
      setSocials(data.socials);
    })
  }, [])
  

  return (
    <>
      <NavBar />
      <div>
        <UserHeader />
        <main>
          <section>
            <div>
              <h4 className='text-white font-bold text-center mb-5'>Edit Profile</h4>
              <div>
                <form onSubmit={saveProfile} className='flex flex-col justify-center items-center'>
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-2 py-3 rounded-md text-white">
                    <img className="w-6 mr-2" src="/svg/user.svg" alt=""/>
                    <input value={name} onChange={(e) => setName(e.target.value)} name="display-name" type="text" placeholder="Set Name..." className='bg-transparent focus:outline-none w-full'/>
                  </span>
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-2 py-3 rounded-md text-white">
                    <img className="w-6 mr-2" src="/svg/bio.svg" alt=""/>
                    <input value={bio} onChange={(e) => setBio(e.target.value)} name="bio" type="text" placeholder="Set Bio..." className='bg-transparent focus:outline-none w-full'/>
                  </span>
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-2 py-3 rounded-md text-white">
                    <img className="w-6 mr-2" src="/svg/user.svg" alt=""/>
                    <input value={avatar} onChange={(e) => setAvatar(e.target.value)} name="pfp" type="text" placeholder="Set Profile Picture..." className='bg-transparent focus:outline-none w-full'/>
                    <img className='w-10 rounded-full' src={avatar} alt=""/>
                  </span>
                  <label className='border border-1 inline-block py-2 px-6 cursor-pointer rounded-lg text-white'>
                    <p className=''>Choose a file</p>
                    <input className='hidden' type="file" accept="image/*" onChange={(e) => {
                      setSelectedImage(URL.createObjectURL(e.target.files[0]));
                      setAvatarToImageFile(e.target.files[0])
                    }}/>
                    
                  </label>
                  <span className='text-white mt-2'>
                    {selectedImage && (
                      <div>
                        <button onClick={() => setSelectedImage(null)}>Remove</button>
                      </div>
                    )}
                  </span>
                  <input className="text-white mt-2 bg-cyan-500 w-11/12 sm:w-40 px-4 py-2 rounded-md border-2 border-cyan-800 cursor-pointer hover:bg-cyan-600 hover:scale-105 transition-all duration-500" type="submit" value="Save profile" />
                </form>
              </div>
            </div>
            <div className='mt-20 mb-10'>
              <h4 className='text-white font-bold text-center mb-5'>Edit Socials</h4>
              <div>
                <form onSubmit={saveSocials} className='flex flex-col justify-center items-center'>
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-2 py-3 rounded-md text-white">
                    <img className="w-6 mr-2" src="/svg/logos/facebook.svg" alt=""/>
                    <input id="facebook" value={socials.facebook} onChange={handleSocials} name="display-name" type="text" placeholder="Set Facebook Username" className='bg-transparent focus:outline-none w-full'/>
                  </span>
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-2 py-3 rounded-md text-white">
                    <img className="w-6 mr-2" src="/svg/logos/instagram.svg" alt=""/>
                    <input id="instagram" value={socials.instagram} onChange={handleSocials} name="bio" type="text" placeholder="Set Instagram Username" className='bg-transparent focus:outline-none w-full'/>
                  </span>
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-2 py-3 rounded-md text-white">
                    <img className="w-6 mr-2" src="/svg/logos/twitter.svg" alt=""/>
                    <input id="twitter" value={socials.twitter} onChange={handleSocials} name="pfp" type="text" placeholder="Set Twitter Username" className='bg-transparent focus:outline-none w-full'/>
                  </span>
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-2 py-3 rounded-md text-white">
                    <img className="w-6 mr-2" src="/svg/logos/youtube.svg" alt=""/>
                    <input id="youtube" value={socials.youtube} onChange={handleSocials} name="pfp" type="text" placeholder="Set Youtube Username" className='bg-transparent focus:outline-none w-full'/>
                  </span>
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-2 py-3 rounded-md text-white">
                    <img className="w-6 mr-2" src="/svg/logos/github.svg" alt=""/>
                    <input id="github" value={socials.github} onChange={handleSocials} name="pfp" type="text" placeholder="Set Github Username" className='bg-transparent focus:outline-none w-full'/>
                  </span>
                  <span className="flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-2 py-3 rounded-md text-white">
                    <img className="w-6 mr-2" src="/svg/logos/linkedin.svg" alt=""/>
                    <input id="linkedin" value={socials.linkedin} onChange={handleSocials} name="pfp" type="text" placeholder="Set LinkedIn Username" className='bg-transparent focus:outline-none w-full'/>
                  </span>
                  <input className="text-white mt-2 bg-cyan-500 w-11/12 sm:w-40 px-4 py-2 rounded-md border-2 border-cyan-800 cursor-pointer hover:bg-cyan-600 hover:scale-105 transition-all duration-500" type="submit" value="Save socials" />
                </form>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

export default profile