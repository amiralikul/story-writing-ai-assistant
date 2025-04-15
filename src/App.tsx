import { ThemeProvider } from "@/components/theme-provider"
// import { ThemeToggle } from "@/components/theme-toggle" // Removed unused import
// import { BreachList } from "@/components/BreachList" // Removed unused import
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import StoryEditor from "./components/editor/StoryEditor"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
      retry: 2,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="system" storageKey="breach-viewer-theme">
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Story Writing AI Assistant</h1>
            <StoryEditor />
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
