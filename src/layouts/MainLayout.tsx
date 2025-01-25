import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen text-foreground bg-gradient-to-tr from-[#B2C0FF] to-[#F6F6F6]">
      <Navbar />
      <div className="flex flex-grow h-full">
        <Sidebar />
        <div className="flex-grow p-6 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
