'use client'
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { useFormState } from 'react-dom'
import { OnboardingAction } from '../actions'
import {useForm} from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'

import { SubmitButton } from '../components/SubmitButtons'
import { onboardingSchema } from '../lib/zodSchemas'
import { requireUser } from '../lib/hooks'
const OnboardingRoute = async () => {
    const [lastResult, action] = useFormState(OnboardingAction, undefined)
    const [form, fields] = useForm({
        lastResult,
        onValidate({formData}) {
            return parseWithZod(formData, {
                schema: onboardingSchema,
            })
        },
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',
    })
    const session = await requireUser()
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
            <form id = {form.id} onSubmit={form.onSubmit} action={action} noValidate>
            <CardContent className='gap-y-5'>
                <div className='grid gap-y-2'>
                    <Label>
                        Full name
                    </Label>
                    <Input 
                    name={fields.fullName.name}
                    defaultValue={session?.user?.name || ""}
                    key = {fields.fullName.key}
                    placeholder='John Doe'/>
                    <p className='text-red-500 text-sm'>{fields.fullName.errors}</p>
                </div>
                <div className='grid gap-y-2 mt-2'>
                    <Label>
                        Username
                    </Label>
                    <div className='flex rounded-md mt-2'>
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-muted-foreground text-sm">
                  CalMarshal.com/
                </span>
                <Input
                name = {fields.userName.name}
                key= {fields.userName.key}
                defaultValue={fields.userName.initialValue}
                placeholder='user 1'
                className='rounded-l-none'
                />
                    </div>
                    <p className='text-red-500 text-sm'>{fields.userName.errors}</p>
                </div>
            </CardContent>
            
            <CardFooter className='w-full'>
                    <SubmitButton text="submit" className='w-full' />
            </CardFooter>
            
            </form>
        </Card>
    </div>
  )
}

export default OnboardingRoute