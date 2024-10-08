'use client'
import { cn } from '@/lib/utils'
import { CalendarCheck, HomeIcon, LucideProps, Settings, Users2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ForwardRefExoticComponent } from 'react'
interface dashboardProps {
    id:number
    name: string
    href: string
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}
export const dashboardLink: dashboardProps[]= [
    {
        id:0,
        name: 'Event Types',
        href: '/dasgboard',
        icon: HomeIcon,
    },
    {
        id: 1,
        name: "Meetings",
        href: "/dashboard/meetings",
        icon: Users2,
      },
    {
        id: 2,
        name: "Availablity",
        href: "/dashboard/availability",
        icon: CalendarCheck,
      },
      {
        id: 3,
        name: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
]
const DashboardLinks = () => {
    const pathname = usePathname()
  return (
    <>
    {dashboardLink.map((item) => (
        <Link className={cn(pathname === item.href ? "text-primary bg-primary/10": "text-muted-foreground hover:text-foreground", "flex items-center gap-3 rounded-lg px-3 py-2  transition-all  hover:text-primary" )}key={item.id} href={item.href} >
                <item.icon className='size-4'/>
                {item.name}
        </Link>
    ))}
    </>
  )
}

export default DashboardLinks