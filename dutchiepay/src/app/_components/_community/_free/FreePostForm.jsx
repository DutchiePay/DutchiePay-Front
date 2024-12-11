import CommunityFilter from '@/app/_components/_community/_common/CommunityFilter';
import PostWritingAction from '@/app/_components/_community/_common/PostWritingAction';
import TextEditor from '@/app/_components/_community/_common/TextEditor';
import TitleInput from '@/app/_components/_community/_common/TitleInput';

export default function FreePostForm({
  register,
  setValue,
  watch,
  setEditorContent,
  thumbnail,
  images,
  setThumbnail,
  setImages,
}) {
  return (
    <>
      <CommunityFilter
        categories={['정보', '질문', '취미', '자유']}
        register={register}
        setValue={setValue}
        watch={watch}
      />
      <TitleInput register={register} />
      <TextEditor
        setEditorContent={setEditorContent}
        thumbnail={thumbnail}
        images={images}
        setThumbnail={setThumbnail}
        setImages={setImages}
      />
      <PostWritingAction menu={'mart'} />
    </>
  );
}
