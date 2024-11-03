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

import { SelectGroup } from '@radix-ui/react-select'
import { times } from '@/app/lib/times'
import { SubmitButton } from '@/app/components/SubmitButtons'
import prisma from '@/app/lib/db'
import { updateAvailability } from '@/app/actions'
import { Switch } from '@/app/components/ui/switch'
async function getData(userId: string) {
    const data = await prisma.availability.findMany({
      where: {
        userId: userId,
      },
    });
  
    if (!data) {
      return notFound();
    }
  
    return data;
  }
  
  const AvailabilityPage = async () => {
    const session = await requireUser();
    const data = await getData(session.user?.id as string);
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Availability</CardTitle>
          <CardDescription>
            In this section you can manage your availability.
          </CardDescription>
        </CardHeader>
        <form action={updateAvailability}>
          <CardContent className="flex flex-col gap-y-4">
            {data.map((item) => (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4"
                key={item.id}
              >
                <input type="hidden" name={`id-${item.id}`} value={item.id} />
                <div className="flex items-center gap-x-3">
                  <Switch
                    name={`isActive-${item.id}`}
                    defaultChecked={item.isActive}
                  />
                  <p>{item.day}</p>
                </div>
                <Select name={`fromTime-${item.id}`} defaultValue={item.fromTime}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="From Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {times.map((time) => (
                        <SelectItem key={time.id} value={time.time}>
                          {time.time}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select name={`tillTime-${item.id}`} defaultValue={item.tillTime}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="To Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {times.map((time) => (
                        <SelectItem key={time.id} value={time.time}>
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
            <SubmitButton text="Save Changes" />
          </CardFooter>
        </form>
      </Card>
    );
  };
  
  export default AvailabilityPage;