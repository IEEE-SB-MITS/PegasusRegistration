import React from 'react';
import peg from '@/app/assets/p44.webp'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className='w-1/2 border-r-[1.5px] border-[#6D6D6D] my-4 hidden md:flex justify-center items-center'>
      <div><Image src={peg} alt='pegasus' className='object-contain'/></div>
    </div>
  );
}

export default Hero;
