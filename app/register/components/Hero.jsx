import Image from 'next/image'
import React from 'react'
import peg from '@/app/assets/p44.webp'

const Hero = () => {
  return (
    <div className='w-1/2 border-r-[1.5px] border-[#6D6D6D] my-4 hidden md:flex justify-center items-center'>
      <div className='mt-10 fixed top-1/3'><Image src={peg} alt='pegasus' className='w-full h-full '/></div>
    </div>
  )
}

export default Hero