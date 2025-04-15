import { useMutation } from '@tanstack/react-query';
import { fetchCompletion } from '../lib/openai';

export const useLLMCompletion = () => {
  return useMutation<string, Error, string>({
    mutationFn: (prompt: string) => fetchCompletion(prompt),
    // Optional: Add onSuccess, onError, onSettled callbacks here if needed
    // for global side effects like notifications.

    // Example onError:
    // onError: (error) => {
    //   console.error("Mutation failed:", error.message);
    //   // Potentially show a toast notification to the user
    // },
  });
}; 