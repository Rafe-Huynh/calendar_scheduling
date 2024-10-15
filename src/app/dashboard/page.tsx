import React from 'react'
import { auth } from '../lib/auth'
import { notFound, redirect } from 'next/navigation'
import { requireUser } from '../lib/hooks'
import prisma from '../lib/db'
import EmptyState from '../components/EmptyState'
async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where:{
      id: userId
    },
    select: {
      username: true,
      EventType:{
        select: {
          id:true,
          active:true,
          title: true,
          url: true,
          duration: true,
        }
      }
    }
  })
  if(!data){
    return notFound()
  }
  return data
}
const Dashboard = async () => {
    const session = await requireUser()
    const data = getData(session.user?.id as string)

  return (
    <>
    {
      (await data).EventType.length === 0 ? (
        <EmptyState title='No Events' buttonText="Add event" href={"/"}/>
      ): (
        <>we have data</>
      )
    }
    </>
  )
}

export default Dashboard