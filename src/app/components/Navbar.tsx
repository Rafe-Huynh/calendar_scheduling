import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import logo from '../public/assets/logo.png'
import AuthModal from './AuthModal'
const Navbar = () => {
    return (
      <div className="relative flex flex-col w-full py-5 mx-auto md:flex-row md:items-center md:justify-between">
        <div className="flex flex-row items-center justify-between text-sm lg:justify-start">
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} className="size-10" alt="Logo" />
  
            <h4 className="text-3xl font-semibold">
              Calendar <span className="text-primary">Scheduler</span>
            </h4>
          </Link>
          {/* <div className="md:hidden">
            <ThemeToggle />
          </div> */}
        </div>
  
        <nav className="hidden md:flex md:justify-end md:space-x-4">
          {/* <ThemeToggle /> */}
  
          <AuthModal />
        </nav>
      </div>
    );
  }

export default Navbar