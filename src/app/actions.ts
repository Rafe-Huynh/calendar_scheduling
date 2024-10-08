"use server"

import prisma from "./lib/db"
import { requireUser } from "./lib/hooks"
import {parseWithZod} from '@conform-to/zod'
import {onboardingSchemaValidation } from "./lib/zodSchemas"
import { redirect } from "next/navigation"
export async function OnboardingAction(prevState:any, formData: FormData) {
    const user = await requireUser()
    const submission = await parseWithZod(formData, {
        schema: onboardingSchemaValidation({
            async isUsernameUnique() {
                const existingUsername = await prisma.user.findUnique({
                    where: {
                        username: formData.get('userName') as string
                    }
                })
                return !existingUsername
            },
        }),
        async: true,
    });
    if(submission.status !== 'success'){
        return submission.reply();
    }
    const data = await prisma.user.update({
        where: {
            id: user.user?.id,
        },
        data: {
            username: submission.value.userName,
            name: submission.value.fullName
        },

    })
    return redirect('/onboarding/grant-id')
}