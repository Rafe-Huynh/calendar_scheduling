"use client"
import { createEvent } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { Button } from "@/app/components/ui/button";
import { ButtonGroup } from "@/app/components/ui/buttonGroup";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { eventTypeSchema } from "@/app/lib/zodSchemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Label } from "@radix-ui/react-label";
import { SelectLabel } from "@radix-ui/react-select";
import Link from "next/link";
import React, { useState } from "react";
import { useFormState } from "react-dom";
type VideoCallProvider = "Zoom Meeting" | "Google Meet" | "Microsoft Team"

const NewEvent = () => {
    const [active, setActive] = useState<VideoCallProvider>("Google Meet")
    const [lastResult, action] = useFormState(createEvent, undefined)
    const [form, fields] = useForm({lastResult, 
        onValidate({formData}){
            return parseWithZod(formData,{
                schema: eventTypeSchema
            })
        },
    shouldRevalidate: "onBlur",
    shouldValidate: "onInput"
    })
  return (
    <div className="w-full h-full flex flex-1 items-center">
      <Card>
        <CardHeader>
          <CardTitle>Add New Event</CardTitle>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <CardContent className="grid gap-y-5">
            <div className="flex flex-col gap-y-2">
              <Label>Title</Label>
              <Input placeholder="30 Minute meeting" name={fields.title.name} key={fields.title.key} defaultValue={fields.title.initialValue}/>
              <p className="text-red-500 text-sm">
                {fields.title.errors}
              </p>
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>URL Link</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                  CalScheduler.com/
                </span>
                <Input className="rounded-l-none" placeholder="" name={fields.url.name} key={fields.url.key} defaultValue={fields.url.initialValue}/>
                <p className="text-red-500 text-sm">
                {fields.url.errors}
              </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
                <Label>
                    Description
                </Label>
                <Textarea placeholder="message..." name={fields.description.name} key={fields.description.key} defaultValue={fields.description.initialValue}/>
                <p className="text-red-500 text-sm">
                {fields.description.errors}
              </p>
            </div>
            <div className="flex flex-col gap-y-2">
                <Label>
                    Duration
                </Label>
                <Select name={fields.duration.name} key={fields.duration.key} defaultValue={fields.duration.initialValue}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select duration"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>
                                Duration
                            </SelectLabel>
                            <SelectItem value={"15"}>
                                15 Mins
                            </SelectItem>
                            <SelectItem value={"30"}>
                                30 Mins
                            </SelectItem>
                            <SelectItem value={"45"}>
                                45 Mins
                            </SelectItem>
                            <SelectItem value={"60"}>
                                60 Mins
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                    <p className="text-red-500 text-sm">
                {fields.duration.errors}
              </p>
                </Select>
            </div>
            <div className="grid gap-y-2">
                <Label>
                    Video Call Provider
                </Label>
                <Input type="hidden" name={fields.videoCallSoftware.name} key={fields.videoCallSoftware.key} defaultValue={fields.videoCallSoftware.initialValue}/>
                <ButtonGroup>
                    <Button onClick={() => setActive("Zoom Meeting")} className="w-full" variant={active === "Zoom Meeting" ? "secondary" : "outline"}>
                        Zoom
                    </Button>
                    <Button onClick={() => setActive("Google Meet")}className="w-full" variant={active === "Google Meet" ? "secondary" : "outline"}>
                        Google Meet
                    </Button>
                    <Button onClick={() => setActive("Microsoft Team")} className="w-full" variant={active === "Microsoft Team" ? "secondary" : "outline"}>
                        Microsoft Team
                    </Button>
                </ButtonGroup>
            </div>
          </CardContent>
          <CardFooter className="w-full flex justify-between">
            <Button variant="destructive" asChild>
                <Link href="/dashboard">
                Cancel
                </Link>
            </Button>
            <SubmitButton text="Submit"/>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default NewEvent;
