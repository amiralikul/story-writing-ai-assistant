# Development Tasks (Tiptap Architecture)

- [x] **1. Project Setup & Dependencies:**
    - [x] Ensure Vite, React, TS setup.
    - [x] Install/configure Shadcn UI (`npx shadcn-ui@latest init` if not done).
    - [x] Install Tanstack Query: `pnpm add @tanstack/react-query`.
    - [x] Install Tiptap core packages: `pnpm add @tiptap/react @tiptap/pm @tiptap/starter-kit`.
    - [x] Install the Tiptap Placeholder extension: `pnpm add @tiptap/extension-placeholder`.
    - [x] Install necessary Shadcn components (e.g., `button`, `input`, `dialog` for API key).

- [x] **2. Basic Tiptap Editor:**
    - [x] Create `src/components/editor/StoryEditor.tsx`.
    - [x] Import `useEditor`, `EditorContent` from `@tiptap/react`.
    - [x] Import `StarterKit` from `@tiptap/starter-kit`.
    - [x] Import `Placeholder` from `@tiptap/extension-placeholder`.
    - [x] Initialize a basic Tiptap editor using `useEditor` with `StarterKit` and `Placeholder` extensions.
    - [x] Render the `<EditorContent editor={editor} />` component.
    - [x] Add basic styling to `.ProseMirror` in global CSS (border, padding, min-height).

- [x] **3. API Key Setup (Fixed Key):**
    - [x] Create `.env.local` file in the project root (add to `.gitignore`).
    - [x] Add `VITE_OPENAI_API_KEY=your_actual_key` to `.env.local`.
    - [x] Ensure API key is accessible via `import.meta.env.VITE_OPENAI_API_KEY`.

- [x] **4. LLM API Client (`src/lib/openai.ts`):**
    - [x] Implement `fetchCompletion(prompt: string, apiKey: string)` function to call GPT-4o-mini.
    - [x] Include basic error handling for the API call.

- [x] **5. LLM Integration Hook (`src/hooks/useLLMCompletion.ts`):**
    - [x] Create hook using Tanstack Query's `useMutation`.
    - [x] Wrap the `fetchCompletion` function.
    - [x] Expose loading, error, data states, and the mutation trigger function.

- [ ] **6. Connecting Tiptap & LLM (Enter Key Trigger):**
    - [ ] In `StoryEditor.tsx`, get the editor instance from `useEditor`.
    - [ ] Add a Tiptap Keybinding for the `Enter` key within `useEditor`.
    - [ ] In the `Enter` keybinding:
        - [ ] Prevent default `Enter` behavior (adding a new paragraph).
        - [ ] Get the current editor content using `editor.getText()` or `editor.getJSON()`.
        - [ ] Call the mutation from `useLLMCompletion` with the current content and API key.
        - [ ] Handle the returned completion (see Task 7).

- [ ] **7. AI Completion Insertion:**
    - [ ] When the LLM mutation successfully returns a completion:
        - [ ] Insert a newline character (`\n`) into the editor.
        - [ ] Insert the AI-generated `completion` text after the newline.
        - [ ] Use `editor.commands.insertContent()` for insertion.
        - [ ] Ensure the cursor is positioned at the end of the newly inserted text.
    - [ ] Adjust `Placeholder` extension configuration if it's only needed for the initial empty state, not for suggestion display.

- [ ] **8. Styling & Refinements:**
    - [ ] Style `.ProseMirror` editor area.
    - [ ] Style the suggestion placeholder text (e.g., `.ProseMirror p.is-editor-empty:first-child::before`).
    - [ ] Implement visual feedback for loading states (e.g., spinner).
    - [ ] Implement visual feedback for error states (e.g., toast notification).
    - [ ] Ensure overall UI consistency.

- [ ] **9. Testing & Deployment:**
    - [ ] Manually test core functionality: typing, suggestion fetching, suggestion acceptance, API key handling, error states.
    - [ ] Run `pnpm build`.
    - [ ] Deploy to Vercel or chosen platform. 