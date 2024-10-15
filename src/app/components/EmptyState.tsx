import { Ban, PlusCircle } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

interface emptyProps{
    title:string
    buttonText: string
    href: string
}

const EmptyState = ({title, buttonText, href}: emptyProps) => {
  return (
    <div className='flex flex-col flex-1 h-full items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50'>
        <div className='flex items-center justify-center size-20 rounded-full bg-primary/10'>
        <Ban className='size-10 text-primary'/>
        </div>
        <h2 className='mt-6 text-xl font-semibold'>
            {title}
        </h2>
        <Button asChild>
            <Link href={href}>
            <PlusCircle className='size-4 '/>
                {buttonText}
            </Link>
        </Button>
    </div>
  )
}

export default EmptyState