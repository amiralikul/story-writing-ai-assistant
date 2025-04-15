import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect, useRef } from 'react'
import { useLLMCompletion } from '../../hooks/useLLMCompletion'
// import { Editor } from '@tiptap/core' // Removed problematic import
import { Node } from '@tiptap/pm/model' // Keep this import

const StoryEditor = () => {
  const { mutate: getCompletion, isPending, error, reset } = useLLMCompletion();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start writing your story here... Press Enter to get AI continuation.',
      }),
    ],
    content: '',
    editorProps: {
        handleKeyDown: (view, event) => {
            if (event.key === 'Enter' && !isPending && editor) {
                event.preventDefault();

                const text = editor.getText().trim();
                console.log("Enter pressed, getting completion for:", text);

                if (text) {
                    getCompletion(text, {
                        onSuccess: (completion: string) => {
                            if (editor && completion) {
                                console.log("Completion success:", completion);
                                editor.chain().focus().insertContent('\n' + completion + '\n').run();
                                reset();
                            }
                        },
                        onError: (error: Error) => {
                          console.error("Completion error:", error.message);
                        }
                    });
                } else {
                    console.log("Enter pressed with empty content, not fetching.");
                }
                return true;
            }
            return false;
        },
    }
  });

  return (
    <div>
      <EditorContent editor={editor} />
      <div className="mt-2 text-sm text-muted-foreground min-h-[1.25rem]">
        {isPending && <p>Generating continuation...</p>}
        {error && <p className="text-red-600">Error: {error.message}</p>}
      </div>
    </div>
  )
}

export default StoryEditor 