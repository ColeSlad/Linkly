import { toast } from 'react-toastify';
import UserHeader from '../../components/UserHeader'
import React, { useState, useEffect, useContext } from 'react'
import NavBar from '@/components/Navbar';
import { API_URL } from '../../lib/api';

const links = () => {
  const [links, setLinks] = useState([{url: '', title: '', icon: ''}]);
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('');

  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...links];
    const linkToUpdate = { ...updatedLinks[index], [field]: value };
    updatedLinks[index] = linkToUpdate;
    setLinks(updatedLinks);
  }

  const handleAddLink = () => {
    setLinks([...links, {url: '', title: '', icon: '/svg/link.svg'}])
  }

  const handleRemoveLink = (index) => {
    const updatedLinks = [...links];
    updatedLinks.splice(index, 1);
    setLinks(updatedLinks);
  }

  const saveLinks = (e) => {
    e.preventDefault();
    const linksArray = Object.values(links);
    const titlesArray = Object.values(title);
    const iconsArray = Object.values(icon);
    const linksData = linksArray.map((link, index) => ({
      link, 
      title: titlesArray[index],
      icon: iconsArray[index]
    }))

    fetch(`${API_URL}/save/links`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        tokenMail: localStorage.getItem('LinkTreeToken'),
        links: linksData
      })
    }).then((res) => res.json())
    .then((data) => {
      if(data.status === 'error') {
        localStorage.removeItem('LinkTreeToken');
        return window.location.href = '/login';
      }
      toast.success('Links saved successfully', {
      position: 'bottom-right',
      theme: 'dark'
      })
    }).catch((err) => {
      toast.error(err.message, {
        position: 'bottom-right',
        theme: 'dark'
      })
    })
  }

  function readFile(index, file) { 
    let fileReader = new FileReader(); 
    if(file) {
      fileReader.readAsDataURL(file); 
      fileReader.onload = function() {
        handleLinkChange(index, 'icon', fileReader.result);
      }; 
    }

  }

  useEffect(() => {
    if(!localStorage.getItem('LinkTreeToken')) return router.push('/login');
    fetch(`${API_URL}/load/links`, {
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
        localStorage.removeItem('LinkTreeToken');
        return window.location.href = '/login';
      }
      setLinks(data.links);
    })
  }, [])

  return (
    <>
      <NavBar />
      <div>
        <UserHeader />
        <main>
          <section>
            <h1 className='text-center font-bold text-xl text-white'>Add or Customize your Links</h1>
            <div>
              <form onSubmit={saveLinks}>
                {links.map((link, index) => (
                  <div className='flex flex-row justify-evenly my-3 mx-5 pt-2 pb-2 rounded-lg' key={index}>
                    <label className='text-white'>
                      Link URL:
                      <input className='outline-none border-2 border-white rounded-md px-2 py-1 ml-2 bg-cyan-950 bg-opacity-25' type="text" value={link.url} onChange={(e) => handleLinkChange(index, 'url', e.target.value)}/>
                    </label>
                    <label className='text-white'>
                      Title:
                      <input className='outline-none border-2 border-white rounded-md px-2 py-1 ml-2 bg-cyan-950 bg-opacity-25' type="text" value={link.title} onChange={(e) => handleLinkChange(index, 'title', e.target.value)}/>
                    </label>
                    <div className='flex gap-2'>
                      <label className='border border-1 inline-block py-2 px-6 cursor-pointer rounded-lg text-white'>
                        <p className=''>Choose a file</p>
                        <input className='hidden' type="file" accept="image/*" onChange={(e) => {
                          readFile(index, e.target.files[0]);
                        }}/>
                      </label>
                      {link.icon && 
                        <div className='flex h-min'>
                          <img src={link.icon} className='w-10 mr-2 bg-white rounded-full p-0.5'/>
                          <button type="button" onClick={(e) => handleLinkChange(index, 'icon', '')}>
                            <img src="/svg/trash.svg" className='w-8'/>
                          </button>
                        </div>
                      }
                    </div>
                    <button className='bg-cyan-500 text-white px-3 py-1 ml-3 rounded-md flex items-center' type="button" onClick={() => handleRemoveLink(index)}>
                      <img src="/svg/trash.svg" className='w-5'/>
                      <p className='ml-1'>Remove Link</p>
                    </button>
                  </div>
                ))}
                <div className='buttons flex flex-row gap-5 my-1 mx-5'>
                  <button className='bg-cyan-500 text-white px-4 py-2 rounded-md w-full' type="button" onClick={handleAddLink}>
                    Add link
                  </button>
                  <button className='bg-cyan-500 text-white px-4 py-2 rounded-md w-full' type="submit">
                    Save Links
                  </button>
                </div>
              </form>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

export default links