import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader } from '@/app/components/ui/card'
import { CalendarCheck2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import success from '../../public/assets/success.gif'
import Image from 'next/image'
const OnboardingRouteTwo = () => {
  return (
    <div className='min-h-screen w-screen  flex items-center justify-center'>
        <Card>
            <CardHeader>
                You have successfully created your account!
            </CardHeader>
            <Image src={success} alt="success" className='w-full'/>
            <CardContent>
                <Button asChild className='w-full'>
                    <Link href="/api/auth">
                    <CalendarCheck2 /> 
                        Connect Calendar
                    </Link>
                </Button>
            </CardContent>
        </Card>
    </div>
  )
}

export default OnboardingRouteTwo