import '@/styles/globals.css';

import Sidebar from '@/app/_components/_layout/Sidebar';

export default function Layout({ children }) {
  return (
    <>
      <Sidebar />
      <section className="layout__main">{children}</section>
    </>
  );
}
