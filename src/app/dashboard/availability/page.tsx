import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card'
import { requireUser } from '@/app/lib/hooks'
import { Item } from '@radix-ui/react-dropdown-menu'
import { notFound } from 'next/navigation'
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/app/components/ui/select"
import { Switch } from '@radix-ui/react-switch'
import { SelectGroup } from '@radix-ui/react-select'
import { times } from '@/app/lib/times'
import { SubmitButton } from '@/app/components/SubmitButtons'
async function getData(userId: string) {
    const data = await prisma.Availability.findMany({
        where:{
            userId: userId
        }
    })
    if(!data){
        return notFound()
    }
    return data
}
const Availablity = async () => {
    const session = await requireUser()
    const data = await getData(session.user?.id as string)
  return (
    <Card>
        <CardHeader>
            <CardTitle>
                <CardDescription>

                </CardDescription>
            </CardTitle>
        </CardHeader>
        <form>
            <CardContent className='flex flex-col gap-y-4'>
                {data.map((item) => (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4' key={item.id}>
                        <div className='flex items-center gap-x-3'>
                            <Switch defaultChecked={item.isActive}/>
                            <p>{item.day}</p>
                        </div>
                        <Select defaultValue={item.fromTime}>
                            <SelectTrigger className='w-full'>
                                <SelectValue placeholder="From time"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {times.map((time) => (
                                        <SelectItem value={time.time} key={time.id}>
                                            {time.time}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select defaultValue={item.tillTime}>
                            <SelectTrigger className='w-full'>
                                <SelectValue placeholder="To time"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {times.map((time) => (
                                        <SelectItem value={time.time} key={time.id}>
                                            {time.time}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                ))}
            </CardContent>
            <CardFooter>
                <SubmitButton text="Save Changes"/>
            </CardFooter>
        </form>
    </Card>
  )
}

export default Availablity