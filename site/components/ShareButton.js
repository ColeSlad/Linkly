import React from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';

const ShareButton = () => {

  const router = useRouter();

  const copyLink = () => {
    navigator.clipboard.writeText(window.Location.hostname + router.query.username);
    toast.success('Copied to clipboard!', {
      position: 'bottom-right',
      theme: 'dark'
    })
  }

  return (
    <div className='absolute cursor-pointer top-20 left-6 bg-cyan-950 bg-opacity-0 p-2 rounded-xl hover:bg-opacity-30 hover:border-cyan-900 hover:scale-105 transition-all duration-400 border border-cyan-950' onClick={copyLink}>
      <img src="/svg/copy.svg" className='w-6' alt="share"/>
    </div>
  )
}

export default ShareButton