const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL_NAME = 'gpt-4o-mini';

export async function fetchCompletion(prompt: string): Promise<string> {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    console.log("apiKey", apiKey);

    if (!apiKey) {
        console.error("OpenAI API key not found. Make sure VITE_OPENAI_API_KEY is set in your .env.local file.");
        throw new Error("API key not configured.");
    }

    try {
        const response = await fetch(OPENAI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: MODEL_NAME,
                messages: [
                    {
                        role: 'system',
                        content: 'You are a story writing assistant. Complete the user\'s story. Provide only the continuation text, without any introductory phrases. Provide ONLY ONE sentence at a time.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 50, // Limit response length, adjust as needed
                temperature: 0.7, // Adjust creativity
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("OpenAI API Error:", errorData);
            throw new Error(`API request failed with status ${response.status}: ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();

        // Extract the completion text - check the actual structure of the response
        const completion = data.choices?.[0]?.message?.content?.trim();

        if (!completion) {
            console.error("No completion found in API response:", data);
            throw new Error("Failed to get completion from API.");
        }

        return completion;

    } catch (error) {
        console.error("Error fetching completion:", error);
        // Rethrow or handle as appropriate for the application
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("An unknown error occurred while fetching completion.");
    }
} 