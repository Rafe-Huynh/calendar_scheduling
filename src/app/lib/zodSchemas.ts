import { conformZodMessage } from '@conform-to/zod'

import {z} from 'zod'

export const onboardingSchema = z.object({
    fullName: z.string().min(3).max(150),
    userName: z.string().min(3).max(150).regex(/^[a-zA-Z0-9-]+$/, {message: 'Username can only contain letters, number and -'}),

})
export function onboardingSchemaValidation(option?: {
    isUsernameUnique: () => Promise<boolean>
}){
    return z.object({
        userName: z.string().min(3).max(150).regex(/^[a-zA-Z0-9-]+$/, {message: 'Username can only contain letters, number and -'})
        .pipe(
            // Note: The callback cannot be async here
            // As we run zod validation synchronously on the client
            z.string().superRefine((_, ctx) => {
              // This makes Conform to fallback to server validation
              // by indicating that the validation is not defined
              if (typeof option?.isUsernameUnique !== "function") {
                ctx.addIssue({
                  code: "custom",
                  message: conformZodMessage.VALIDATION_UNDEFINED,
                  fatal: true,
                });
                return;
              }
    
              // If it reaches here, then it must be validating on the server
              // Return the result as a promise so Zod knows it's async instead
              return option.isUsernameUnique().then((isUnique) => {
                if (!isUnique) {
                  ctx.addIssue({
                    code: "custom",
                    message: "Username is already used",
                  });
                }
              });
            })
          ),
        fullName: z.string().min(3).max(150),
    })
}
export const settingsSchema = z.object({
  fullName: z.string().min(3).max(150),

  profileImage: z.string()
})

export const eventTypeSchema = z.object({
  title: z.string().min(3).max(150),
  duration: z.number().min(15).max(60),
  url: z.string().min(3).max(150),
  description: z.string().min(3).max(1000),
  videoCallSoftware: z.string().min(3),
})

