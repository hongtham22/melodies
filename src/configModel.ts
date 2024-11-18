import z from 'zod'

const configSchema = z.object({
    NEXT_PUBLIC_API_AI: z.string().url()
})

const configServerModel = configSchema.safeParse({
    NEXT_PUBLIC_API_AI: process.env.NEXT_PUBLIC_API_AI
})

if (!configServerModel.success) {
    console.error(configServerModel.error.issues)
    throw new Error('Các giá trị khai báo trong file .env không hợp lệ')
}

const envConfigModel = configServerModel.data
export default envConfigModel