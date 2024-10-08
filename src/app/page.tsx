import React from 'react'
import Navbar from './components/Navbar'
import { auth } from './lib/auth'

import { redirect } from 'next/navigation'

const page = async () => {
  const session = await auth()
  if (session?.user){
    return redirect("/dashboard")
  }
  return (
    <div className='mx-auto max-w-7xl px-4 sm:px'>
      <Navbar />
    </div>
  )
}

export default page