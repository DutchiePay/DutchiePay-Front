import ProtectedRoute from '@/app/_components/ProtectedRoute';
import Sidebar from '@/app/_components/_layout/Sidebar';

export default function Layout({ children }) {
  return (
    <ProtectedRoute>
      <Sidebar />
      <section className="ml-[250px] border-l grow">{children}</section>
    </ProtectedRoute>
  );
}
