import React from 'react';
import peg from '@/app/assets/peg4.png'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className='w-1/2 border-r-[1.5px] border-[#6D6D6D] my-4 hidden md:flex justify-center items-center'>
      <div className='mt-16 mx-36'><Image src={peg} alt='pegasus' className='object-contain'/></div>
    </div>
  );
}

export default Hero;
