import '@/styles/globals.css';

import Sidebar from '@/app/_components/_layout/Sidebar';

export default function Layout({ children }) {
  return (
    <>
      <Sidebar />
      <div className="layout__main">{children}</div>
    </>
  );
}
