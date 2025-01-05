import Sidebar from '@/app/_components/_layout/Sidebar';

export default function Layout({ children }) {
  return (
    <>
      <Sidebar />
      <section className="ml-[250px] border-l grow">{children}</section>
    </>
  );
}
