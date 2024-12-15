import React from 'react'
import Hero from './components/Hero'
import Form from './components/Form'

const Login = () => {
  return (
    <div className='flex bg-[#070707] h-screen font-ProductSans overflow-y-hidden'>
        <Hero/>
        <Form/>
    </div>
  )
}

export default Login