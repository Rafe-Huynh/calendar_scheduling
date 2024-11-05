
import Calendar from '@/app/components/bookForm/Calendar'
import RenderCalendar from '@/app/components/bookForm/RenderCalendar'
import TimeTable from '@/app/components/bookForm/TimeTable'
import { Card, CardContent } from '@/app/components/ui/card'
import prisma from '@/app/lib/db'
import { requireUser } from '@/app/lib/hooks'
import { Separator } from '@radix-ui/react-select'
import { CalendarX2, Clock, VideoIcon } from 'lucide-react'
import { notFound } from 'next/navigation'
import React from 'react'
async function getData(eventUrl: string, userName: string) {
    const data = await prisma.eventType.findFirst({
        where: {
            url: eventUrl,
            user: {
                username: userName,
            },
            active: true,

        },
        select: {
            id:true,
            description:true,
            title:true,
            duration:true,
            videoCallSoftware:true,
            user:{
                select:{
                    image: true,
                    name:true,
                    Availability:{
                        select:{
                            day:true,
                            isActive:true
                        }
                    }
                }
            }
        }
    })
    if(!data){
        return notFound()
    }
    return data
}
const Booking = async ({params, searchParams} : {params:{usename:string; eventUrl: string}, searchParams:{date?: string}}) => {
    
    const data = await getData(params.eventUrl, params.usename)
    const selectedDate = searchParams.date? new Date(searchParams.date) : new Date()
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        day: 'numeric',
        month: 'long',
    }).format(selectedDate)
  return (
    <div className='min-h-screen w-screen flex items-center justify-center'>
        <Card className="max-w-[1000px] w-sull mx-auto">
            <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr]">
                <div>
                    <img src={data.user.image as string} alt="profile image" className='size-10 rounded-full'/>
                    <p className='text-sm font-medium'>{data.user.name}</p>
                    <h1 className='text-xl font-semibold mt-2 '>{data.title}</h1>
                    <p className='text-sm font-medium text-muted-foreground'>
                        {data.description}
                    </p>
                    <div className='mt-5 flex flex-col gap-y-3'>
                        <p className='flex items-center'>
                            <CalendarX2 className='size-4 mr-2 text-primary text-sm font-medium' />
                            <span className='text-sm font-medium text-muted-foreground'>
                                {formattedDate}
                            </span>
                        </p>
                        <p className='flex items-center'>
                            <Clock className='size-4 mr-2 text-primary text-sm font-medium' />
                            {data.duration}
                        </p>
                        <p className='flex items-center'>
                            <VideoIcon className='size-4 mr-2 text-primary text-sm font-medium' />
                            {data.videoCallSoftware}
                        </p>
                    </div>
                </div>
                <Separator  className='hidden md:block h-full w-[1px]'/>
                <RenderCalendar availability = {data.user?.Availability as any}/>
                <Separator  className='hidden md:block h-full w-[1px]'/>
                <TimeTable selectedDate={selectedDate} userName={params.usename}/>
            </CardContent>

        </Card>
    </div>
  )
}

export default Booking