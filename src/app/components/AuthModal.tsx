import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "./ui/dialog"
import { Button } from './ui/button';
import logo from '../public/assets/logo.png'
import Image from 'next/image';
import { signIn } from '../lib/auth';
import GoogleSubmit from './SubmitButtons';
const AuthModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Try for Free</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[360px]">
        <DialogHeader className="flex-row justify-center items-center gap-x-2">
          <Image src={logo} className="size-10" alt="Logo" />
          <h4 className="text-2xl font-semibold">
            Calendar <span className="text-primary">Scheduler</span>
          </h4>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-5">
          <form
            className="w-full"
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <GoogleSubmit />
          </form>
        </div>
      </DialogContent>
    </Dialog>

  )
}

export default AuthModal