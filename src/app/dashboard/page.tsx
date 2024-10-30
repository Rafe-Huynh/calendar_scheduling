import React from 'react'
import { auth } from '../lib/auth'
import { notFound, redirect } from 'next/navigation'
import { requireUser } from '../lib/hooks'
import prisma from '../lib/db'
import EmptyState from '../components/EmptyState'
import { Button } from '../components/ui/button'
import Link from 'next/link'
import { ExternalLink, Link2, Pen, Settings, Trash, User2 } from 'lucide-react'
import { Switch } from '@radix-ui/react-switch'
import { ButtonGroup } from '../components/ui/buttonGroup'
import { DropdownMenuTrigger,DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from '../components/ui/dropdown-menu'
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
    const data = await getData(session.user?.id as string)

  return (
    <>
    {
      data.EventType.length === 0 ? (
        <EmptyState title='No Events' buttonText="Add event" href="/dashboard/new"/>
      ): (
        <div>

        
        <div className='flex items-center justify-between px-2 '>
              <div className='hidden sm:grid gap-y-1'>
                <h1 className='text-2cl md:text-4xl font-semibold'>
                  Event Type
                </h1>
                <p className='text-muted-foreground'>
                  Create and mange your event
                </p>
              </div>
              <Button asChild>
                <Link href="/dashboard/new">
                Create new Event
                </Link>
              </Button>
        </div>
        <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {
             data.EventType.map((item) =>(
              <div key={item.id} className='overflow-hidden shadow rounded-lg border relative'>
                <div className='absolute top-2 right-2'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Settings size={4}/>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuLabel>
                        Event
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator/>
                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                          <Link href={`/${data.username}/${item.url}`}>
                          <ExternalLink className="mr-2"size={4}/>
                          Preview
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link2 className="mr-2"size={4}/>
                          Copy
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pen className="mr-2"size={4}/>
                          Edit
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator/>
                      <DropdownMenuItem>
                          <Trash className="mr-2"size={4}/>
                          Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  </div>
                <Link href="/" className='flex items-center'>
                <div className='flex-shrink-0'>
                  <User2 size={6}/>
                </div>
                <div className='ml-5 w-0 flex-1'>
                  <dl>
                    <dt className='text-sm font-medium text-muted-foreground'>
                      {item.duration} minutes Meeting
                    </dt>
                    <dd className='text-lg font-medium'>
                      {item.title}
                    </dd>
                  </dl>
                </div>
                </Link>
                <div className='bg-muted px-5 py-3 justify-between items-center flex'>
                  <Switch />
                  <Button>
                    Edit Event
                  </Button>
                  </div>
                </div>
            ) )

          }
        </div>
        </div>
      )
    }
    </>
  )
}

export default Dashboard