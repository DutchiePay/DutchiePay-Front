'use client';

import 'react-quill-new/dist/quill.snow.css';

import QuillEditor from './QuillEditor';
import UploadedImages from './UploadedImages';
import { useRef } from 'react';

export default function TextEditor({
  editorContent,
  setEditorContent,
  setThumbnail,
  thumbnail,
  images,
  setImages,
}) {
  const quillRef = useRef(null);

  return (
    <>
      <div className="flex items-center gap-[12px] mt-[24px] mb-[8px]">
        <label className="font-bold text-lg" htmlFor="content">
          내용
        </label>
        <small className="text-sm text-gray--500">
          최대 3,000글자까지 입력 가능합니다.
        </small>
      </div>
      <QuillEditor
        quillRef={quillRef}
        editorContent={editorContent}
        setEditorContent={setEditorContent}
        images={images}
        setImages={setImages}
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
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
