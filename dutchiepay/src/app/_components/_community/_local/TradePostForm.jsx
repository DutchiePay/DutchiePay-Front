import CommunityFilter from '@/app/_components/_community/_common/CommunityFilter';
import MettingPlaceInput from '@/app/_components/_community/_local/MeetingPlaceInput';
import PostWritingAction from '@/app/_components/_community/_common/PostWritingAction';
import PriceInput from './PriceInput.';
import TextEditor from '@/app/_components/_community/_common/TextEditor';
import TitleInput from '@/app/_components/_community/_common/TitleInput';

export default function TradePostForm({
  setIsModalOpen,
  register,
  setValue,
  watch,
  editorContent,
  setEditorContent,
  thumbnail,
  images,
  setThumbnail,
  setImages,
}) {
  return (
    <>
      <CommunityFilter
        categories={['거래', '나눔']}
        register={register}
        setValue={setValue}
        watch={watch}
      />
      <TitleInput register={register} />
      <MettingPlaceInput setIsModalOpen={setIsModalOpen} watch={watch} />
      <PriceInput register={register} setValue={setValue} watch={watch} />
      <TextEditor
        editorContent={editorContent}
        setEditorContent={setEditorContent}
        thumbnail={thumbnail}
        images={images}
        setThumbnail={setThumbnail}
        setImages={setImages}
      />
      <PostWritingAction menu={'used'} />
    </>
  );
}
