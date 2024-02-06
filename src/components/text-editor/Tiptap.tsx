'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import MenuBar from '@/components/text-editor/ToolBar';

export default function Tiptap({
  description,
  onChange,
}: {
  description: string;
  onChange: (richText: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit.configure({})],
    content: description,
    editorProps: {
      attributes: {
        class:
          'block min-h-[150px] w-full border-[1px] border-[#C6C6C6] hover:border-slate-800 focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      console.log(editor.getHTML());
    },
  });

  return (
    <div className='textEditor'>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
