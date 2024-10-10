'use client'
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { Button } from './ui/button'
import Image from 'next/image'
import google from '../public/assets/google.svg'
import { Loader2 } from "lucide-react";
import { cn } from '@/lib/utils'
interface iAppProps{
  text:string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
  className?: string
}
export function SubmitButton({text, variant, className}: iAppProps) {
  const {pending} = useFormStatus()
  return (
    <>
    {pending ? (
      <Button disabled variant="outline" className={cn("w-fit", className)}>
        <Loader2 className='size-4 mr-2 animate-spin'/>
        Please wait
      </Button>
    ): (
      <Button type="submit" variant={variant} className={cn("w-fit", className)}>
        {text}
      </Button>
    )}
    </>
  )
}
const GoogleSubmit = () => {
  const {pending} = useFormStatus()

  return (
    <>
    {
      pending ? (
        <Button disabled variant="outline" className="w-full">
            <Loader2 className="size-4 mr-2 animate-spin />" /> Please wait
        </Button>
      ): (
        <Button>
          <Image src={google} alt="logo" className="size-4 mr-2" />
          Sign in with Google
        </Button>
      )
    }
    </>
  )
}

export default GoogleSubmit