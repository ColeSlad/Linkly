import Link from 'next/link';
import React from 'react'

const SocialTree = ({socials}) => {
  const {
    facebook,
    twitter,
    instagram,
    youtube,
    linkedin,
    github
  } = socials;
  return (
    <>
      <div className="social flex flex-row justify-center">
        <Link className='bg-cyan-950 bg-opacity-30 rounded-full p-2 hover:bg-cyan-600 hover:bg-opacity-25 transition-all duration-600 hover:scale-110 border border-gray-400 mx-1 my-4 select-none' target="_blank" href={`https://facebook.com/${facebook}`}>
          <img src="/svg/logos/facebook.svg" className='w-6'/>
        </Link>
        <Link className='bg-cyan-950 bg-opacity-30 rounded-full p-2 hover:bg-cyan-600 hover:bg-opacity-25 transition-all duration-600 hover:scale-110 border border-gray-400 mx-1 my-4 select-none' target="_blank" href={`https://instagram.com/${instagram}`}>
          <img src="/svg/logos/instagram.svg" className='w-6'/>
        </Link>
        <Link className='bg-cyan-950 bg-opacity-30 rounded-full p-2 hover:bg-cyan-600 hover:bg-opacity-25 transition-all duration-600 hover:scale-110 border border-gray-400 mx-1 my-4 select-none' target="_blank" href={`https://twitter.com/${twitter}`}>
          <img src="/svg/logos/twitter.svg" className='w-6'/>
        </Link>
        <Link className='bg-cyan-950 bg-opacity-30 rounded-full p-2 hover:bg-cyan-600 hover:bg-opacity-25 transition-all duration-600 hover:scale-110 border border-gray-400 mx-1 my-4 select-none' target="_blank" href={`https://youtube.com/${youtube}`}>
          <img src="/svg/logos/youtube.svg" className='w-6'/>
        </Link>
        <Link className='bg-cyan-950 bg-opacity-30 rounded-full p-2 hover:bg-cyan-600 hover:bg-opacity-25 transition-all duration-600 hover:scale-110 border border-gray-400 mx-1 my-4 select-none' target="_blank" href={`https://github.com/${github}`}>
          <img src="/svg/logos/github.svg" className='w-6'/>
        </Link>
        <Link className='bg-cyan-950 bg-opacity-30 rounded-full p-2 hover:bg-cyan-600 hover:bg-opacity-25 transition-all duration-600 hover:scale-110 border border-gray-400 mx-1 my-4 select-none' target="_blank" href={`https://linkedin.com/${linkedin}`}>
          <img src="/svg/logos/linkedin.svg" className='w-6'/>
        </Link>
      </div>
    </>
  )
}

export default SocialTree;