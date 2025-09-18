import React from 'react'
import LinkTreeCard from './LinkTreeCard';
import { AnimatePresence, motion } from 'framer-motion';


const LinkTree = ({data}) => {
  const {name, avatar, bio, links} = data;
  return (
    <>
      <section className=''>
        <img className='w-20 absolute rounded-full left-1/2 -translate-x-1/2 mt-4' src={avatar} alt=""/>
        <h2 className='text-center text-lg font-bold pt-24 text-white'>{name ? name: 'No name'}</h2>
        <p className='text-center pb-2 text-white'>{bio ? bio: 'No Bio'}</p>
        <div className='flex flex-col justify-center max-w-7xl m-auto md:my-5 w-full md:w-2/5'>
          <AnimatePresence>
            {links.map((link, index) => (
              <motion.div 
                key={index}
                interval={{ opacity:0, y:40 }}
                animate={{ opacity:1, y:0, transition: {delay: index * 0.1 + 0.5} }}
              >
                <LinkTreeCard title={link.title} url={link.url} image={link.icon}/>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}

export default LinkTree