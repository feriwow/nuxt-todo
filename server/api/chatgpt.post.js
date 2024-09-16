import OpenAI from "openai";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Configure OpenAI API
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        // Make request to OpenAI API for a task recommendation
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content:
                        "Suggest a simple task to do, one sentence at a time. Go straight to the topic without saying 'Sure', 'Alright' etc.",
                },
            ],
            max_tokens: 30,
            temperature: 1.5,
            response_format: {
                type: "text",
            },
        });

        const task = response.choices[0].message.content.trim();
        
        const newTask = await prisma.todo.create({
            data: {
                title: task,
            },
        });

        return { task: newTask };
    } catch (error) {
        console.error(error);
        throw createError({
            statusCode: 500,
            statusMessage: "Error generating task",
        });
    }
});
