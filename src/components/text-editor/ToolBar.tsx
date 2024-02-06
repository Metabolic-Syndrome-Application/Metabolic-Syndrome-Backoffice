'use clinet';
import { type Editor } from '@tiptap/react';
import {
  Bold,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Redo,
  Strikethrough,
  TextQuote,
  Undo,
} from 'lucide-react';
import React from 'react';

type Props = {
  editor: Editor | null;
};

export default function MenuBar({ editor }: Props) {
  if (!editor) {
    return null;
  }
  return (
    <div className='ProseMirror menuBar'>
      {/* w-full space-x-2 rounded-lg border-[1px] border-[#C6C6C6] bg-transparent
      px-2 py-2 */}
      <div className='flex w-full items-center justify-between px-2 md:px-4'>
        <div className='flex flex-wrap items-center gap-2'>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is_active' : ''}
          >
            <Bold className='h-4 w-4 md:h-5 md:w-5' />
          </button>

          <button
            type='button'
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is_active' : ''}
          >
            <Italic className='h-4 w-4 md:h-5 md:w-5' />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is_active' : ''}
          >
            <Strikethrough className='h-4 w-4 md:h-5 md:w-5' />
          </button>
          <button
            type='button'
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive('heading', { level: 2 }) ? 'is_active' : ''
            }
          >
            <Heading2 className='h-4 w-4 md:h-5 md:w-5' />
          </button>
          <button
            type='button'
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive('heading', { level: 3 }) ? 'is_active' : ''
            }
          >
            <Heading3 className='h-4 w-4 md:h-5 md:w-5' />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is_active' : ''}
          >
            <List className='h-4 w-4 md:h-5 md:w-5' />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is_active' : ''}
          >
            <ListOrdered className='h-4 w-4 md:h-5 md:w-5' />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is_active' : ''}
          >
            <TextQuote className='h-4 w-4 md:h-5 md:w-5' />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            horizontal rule
          </button>
        </div>
        <div className='flex items-center gap-1 md:gap-2'>
          <button
            type='button'
            onClick={() => editor.chain().focus().undo().run()}
          >
            <Undo className='h-4 w-4 md:h-5 md:w-5' />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().redo().run()}
          >
            <Redo className='h-4 w-4 md:h-5 md:w-5' />
          </button>
        </div>
      </div>
    </div>
  );
}
