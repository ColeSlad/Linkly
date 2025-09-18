import React from 'react'

const LinkBox = ({title, number, svg, bgcolor}) => {
  return (
    <div className="flex items-center p-8 mx-3 shadow border border-cyan-800 rounded-lg bg-[#010a1a]">
      <div className={`${bgcolor}` + " inline-flex flex-shrink-0 items-center justify-center h-16 w-16 rounded-full mr-6"}>
        <img src={`/svg/${svg}.svg`} className="w-6"/>
      </div>
      <div className="text-white">
        <span className="inline-block text-2xl font-bold text-white">{number}</span>
        <span className="block text-gray-500">{title}</span>
      </div>
    </div>
  )
}

export default LinkBox