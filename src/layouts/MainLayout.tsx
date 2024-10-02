// layouts/MainLayout.tsx
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow h-full">
        <Sidebar />
        <main className="flex-grow p-4 ">
            {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
