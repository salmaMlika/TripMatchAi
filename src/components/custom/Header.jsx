import React from 'react'
import { Button } from '../ui/button'

function Header() {
  return (
    <div className='shadow-sm flex justify-between items-center px-5 py-2'>
      <img src='/logo.svg' className='h-12 w-auto' alt='Logo' />
      <div><Button>Sign in</Button></div>
    </div>
  )
}

export default Header
