"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import SubmitButtons, { SubmitButton } from "./SubmitButtons";
import { useFormState } from "react-dom";
import { SettingsAction } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { settingsSchema } from "../lib/zodSchemas";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { UploadDropzone } from "../lib/uploadthing";
import { toast } from "sonner";
interface User {
  fullname: string;
  email: string;
  profileImage: string;
}
const SettingsForm = ({ email, fullname, profileImage }: User) => {
  const [lastResult, action] = useFormState(SettingsAction, undefined);
  const [currentImage, setCurrentImage] = useState(profileImage);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: settingsSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  const handleDeleteImage = () => {
    setCurrentImage("");
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Setting</CardTitle>
        <CardDescription>Update your profile</CardDescription>
      </CardHeader>
      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <CardContent className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <Label>Full Name</Label>
            <Input
              name={fields.fullName.name}
              key={fields.fullName.key}
              placeholder="John Doe"
              defaultValue={fullname}
            />
            <p className="text-red-500 text-sm">{fields.fullName.errors}</p>
          </div>
          <div className="flex flex-col gap-y-5">
            <Label>Email</Label>
            <Input
              placeholder="JohnDoe@gmail.com"
              defaultValue={email}
              disabled
            />
          </div>
          <div className="gap-y-2">
            <Label>Profile Image</Label>
            <input type="hidden" name={fields.profileImage.name} key={fields.profileImage.key} value={currentImage}/>
            {currentImage ? (
              <div className="relative size-16">
                <img
                  src={currentImage}
                  alt="Profile Image"
                  className="size-16 rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -top-3 -right-3"
                  type="button"
                  onClick={handleDeleteImage}
                >
                  <X className="size-4" />
                </Button>
              </div>
            ) : (
              <UploadDropzone onClientUploadComplete={(res) => {
                setCurrentImage(res[0].url)
                toast.success("Profile Image has been uploaded")
              }}
              onUploadError={(error) => {
                console.log("something went wrong", error)
                toast.error(error.message)
              }}
              endpoint="imageUploader"/>
            )}
            <p>
                {fields.profileImage.errors}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Save Changes" />
        </CardFooter>
      </form>
    </Card>
  );
};

export default SettingsForm;
