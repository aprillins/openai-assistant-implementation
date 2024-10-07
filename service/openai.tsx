import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    maxRetries: 3,
    timeout: 60 * 1000,
})

export default openai