import React from 'react'
import { auth } from '../lib/auth'
import { redirect } from 'next/navigation'
import { requireUser } from '../lib/hooks'

const Dashboard = async () => {
    const session = await requireUser()
  return (
    <div>page</div>
  )
}

export default Dashboard