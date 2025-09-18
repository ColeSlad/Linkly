import Link from 'next/link'
import React from 'react'

const LinkTreeCard = ({title, url, image}) => {
  return (
    <>
      <span className='w-full'>
        <Link className='flex flex-row items-center p-3 rounded-full  text-white bg-cyan-500 hover:bg-[#09c2e3] mb-3 mx-2 hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-400' target="_blank" href={url.includes('https://') ? url : `https://${url}`}>
          <img className='bg-white rounded-full p-0.5 w-11 mr-5' src={image}/>
          <h4 className='md:text-lg'>{title}</h4>
        </Link>
      </span>
    </>
  )
}

export default LinkTreeCard