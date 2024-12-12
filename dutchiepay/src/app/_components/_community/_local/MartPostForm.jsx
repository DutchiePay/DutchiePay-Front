import CommunityFilter from '@/app/_components/_community/_common/CommunityFilter';
import DateInput from '@/app/_components/_community/_local/DateInput';
import HeadCount from '@/app/_components/_community/_local/HeadCount';
import MettingPlaceInput from '@/app/_components/_community/_local/MeetingPlaceInput';
import PostWritingAction from '@/app/_components/_community/_common/PostWritingAction';
import TextEditor from '@/app/_components/_community/_common/TextEditor';
import TitleInput from '@/app/_components/_community/_common/TitleInput';

export default function MartPostForm({
  setIsModalOpen,
  register,
  setValue,
  watch,
  setEditorContent,
  thumbnail,
  images,
  setThumbnail,
  setImages,
  isUpdate,
}) {
  return (
    <>
      <CommunityFilter
        categories={['마트', '배달']}
        register={register}
        setValue={setValue}
        watch={watch}
      />
      <TitleInput register={register} />
      <DateInput register={register} setValue={setValue} />
      <MettingPlaceInput setIsModalOpen={setIsModalOpen} watch={watch} />
      {!isUpdate && (
        <HeadCount register={register} setValue={setValue} watch={watch} />
      )}
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
