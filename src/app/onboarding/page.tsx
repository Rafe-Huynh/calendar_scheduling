import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'

const OnboardingRoute = () => {
  return (
    <div className='min-h-screen w-screen flex items-center justify-center'>
        <Card>
            <CardHeader>
                <CardTitle>
                    Welcome to Calendar Schedular
                </CardTitle>
                <CardDescription>
                    Input the following information to set up your profile
                </CardDescription>
            </CardHeader>
            <CardContent className='gap-y-5'>
                <div className='grid gap-y-2'>
                    <Label>
                        Full name
                    </Label>
                    <Input placeholder='John Doe'/>
                </div>
                <div className='grid gap-y-2'>
                    <Label>
                        Username
                    </Label>
                    <div className='flex rounded-md'>
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-muted-foreground text-sm">
                  CalMarshal.com/
                </span>
                <Input 
                placeholder='user 1'
                className='rounded-l-none'
                />
                    </div>
                </div>
            </CardContent>
            <CardFooter className='w-full'>
                <Button>
                    
                </Button>
            </CardFooter>
        </Card>
    </div>
  )
}

export default OnboardingRoute