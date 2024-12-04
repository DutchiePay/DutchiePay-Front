'use client';

import 'react-quill-new/dist/quill.snow.css';

import { useCallback, useEffect, useMemo, useState } from 'react';

import Image from 'next/image';
import UploadedImages from './UploadedImages';
import dynamic from 'next/dynamic';
import getImage from '@/app/_util/getImage';
import { useRef } from 'react';

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill-new');

    const Component = ({ forwardedRef, ...props }) => (
      <RQ ref={forwardedRef} {...props} />
    );

    Component.displayName = 'ReactQuill';
    return Component;
  },
  {
    ssr: false,
  }
);

ReactQuill.displayName = 'ReactQuillComponent';

export default function TextEditor({ setEditorContent }) {
  const [images, setImages] = useState([]);
  const [isThumbnail, setIsThumbnail] = useState(false);
  const quillRef = useRef(null);

  const handleImageAddition = useCallback(async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();

    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = await getImage(file);
        if (imageUrl) {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          quill.insertEmbed(range.index, 'image', imageUrl);
          setImages((prevImages) => [...prevImages, imageUrl]);
        }
      }
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ['image'],
          ['link'],
        ],
        handlers: { image: handleImageAddition },
      },
    }),
    [handleImageAddition]
  );

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'link',
    'image',
    'color',
    'background',
    'align',
  ];

  return (
    <>
      <ReactQuill
        forwardedRef={quillRef}
        onChange={setEditorContent}
        theme="snow"
        modules={modules}
        formats={formats}
      />
      <UploadedImages isThumbnail={isThumbnail} images={images} />
    </>
  );
}
