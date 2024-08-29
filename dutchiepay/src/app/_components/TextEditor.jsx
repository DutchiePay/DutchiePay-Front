'use client';

import '@/styles/commerce.css';
import '@/styles/globals.css';
import 'react-quill/dist/quill.snow.css';

import { useMemo, useState } from 'react';

import Image from 'next/image';
import ReactQuill from 'react-quill';

export default function TextEditor() {
  const [editorContent, setEditorContent] = useState('');

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ['clean'],
          ['image'],
        ],
      },
    }),
    []
  );

  const formats = ['header', 'bold', 'italic', 'underline', 'list', 'bullet', 'link', 'image', 'color', 'background'];

  return (
    <ReactQuill className="quill-editor" onChange={setEditorContent} theme="snow" modules={modules} formats={formats} />
  );
}
