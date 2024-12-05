'use client';

import 'react-quill-new/dist/quill.snow.css';

import { useCallback, useMemo, useState } from 'react';

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
  const [thumbnail, setThumbnail] = useState('');
  const quillRef = useRef(null);

  const handleContentChange = (value) => {
    setEditorContent(value);

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = value;
    const imageList = Array.from(tempDiv.querySelectorAll('img')).map(
      (img) => img.src
    );

    setImages((prevImages) => {
      if (prevImages.length === 0 && imageList.length > 0) {
        // 최초 업로드일 경우에만 썸네일로 등록함
        setThumbnail(imageList[0]);
      }
      return imageList;
    });
  };

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
        onChange={handleContentChange}
        theme="snow"
        modules={modules}
        formats={formats}
      />
      <UploadedImages
        quillRef={quillRef}
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
        images={images}
        setImages={setImages}
      />
    </>
  );
}
