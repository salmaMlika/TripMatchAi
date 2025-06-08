import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'


function Hero() {
  return (
<div className='flex flex-col items-center mx-auto gap-9 max-w-4xl px-4 mt-16'>
        <h1 className='font-extrabold text-[50px] text-center mt-16'> Craft Unforgettable Itineraries with
<span className='text-[#f56551]'>AI Trip Planner</span></h1>
<p className='text-xl text-gray-500 text-center '>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.

</p>
<Link to={'/create-trip'}>
<Button> Get started.It's Free </Button>
</Link>
    </div>
    
  )
}

export default Hero
