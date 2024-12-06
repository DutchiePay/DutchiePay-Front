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

    setImages(() => {
      // 최초 이미지 업로드 또는 썸네일을 삭제한 경우
      if (!thumbnail || !imageList.includes(thumbnail)) {
        setThumbnail(imageList[0]);
      }
      return imageList;
    });
  };

  const getImageCount = () => {
    const editor = quillRef.current?.getEditor();
    const editorContainer = editor?.root;
    const images = editorContainer?.querySelectorAll('img');
    return images ? images.length : 0;
  };

  const handleImageAddition = useCallback(async () => {
    const imageCount = getImageCount();

    if (imageCount >= 10) {
      alert('이미지는 최대 10장까지 업로드할 수 있습니다.');
      return;
    }

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

  const handlePaste = useCallback((e) => {
    console.log('실행');
    const quill = quillRef.current.getEditor();
    const imageCount = getImageCount();
    console.log(imageCount);

    // 이미지 개수가 10개 이상이면 붙여넣기를 막음
    if (imageCount >= 10) {
      alert('이미지는 최대 10장까지 업로드할 수 있습니다.');
      e.preventDefault();
      return;
    }

    // 기본 붙여넣기 처리
    const clipboardData = e.clipboardData || window.clipboardData;
    const items = clipboardData.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf('image') !== -1) {
          const blob = item.getAsFile();
          const reader = new FileReader();
          reader.onload = () => {
            const imageUrl = reader.result;
            const range = quill.getSelection();
            quill.insertEmbed(range.index, 'image', imageUrl);
          };
          reader.readAsDataURL(blob);
          e.preventDefault();
        }
      }
    }
  }, []);

  const modules = useMemo(
    () => ({
      clipboard: {
        matchVisual: false,
      },
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
      ImageResize: {
        modules: ['Resize', 'DisplaySize', 'Toolbar'],
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
        onPaste={handlePaste}
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
