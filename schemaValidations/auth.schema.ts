import z from "zod";

export const RegisterBody = z.object({
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

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;