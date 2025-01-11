import z from "zod";

export const GetOtpBody = z.object({
    email: z.string().email(),
    username: z.string().trim().min(2).max(256),
    password: z.string().min(6),
    confirmPassword: z.string().min(6).max(100),
})
    .strict()
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                code: 'custom',
                message: "Passwords do not match",
                path: ['confirmPassword']
            })
        }
    });

export type GetOtpBodyType = z.TypeOf<typeof GetOtpBody>;

export const LoginBody = z.object({
    username: z.string().trim().min(2).max(256),
    password: z.string().min(6),
})
    .strict()

export type LoginBodyType = z.TypeOf<typeof LoginBody>;

export const RegisterBody = z.object({
    otp: z
        .string()
        .length(5, { message: "Your one-time password must be exactly 5 characters." }),
})
    .strict()

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;

export const ForgotPassword = z.object({
    email: z.string().email(),
})

export type ForgotPasswordType = z.TypeOf<typeof ForgotPassword>;

export const SetPassword = z.object({
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
})

export type SetPasswordType = z.TypeOf<typeof SetPassword>;