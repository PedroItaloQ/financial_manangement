import Link from 'next/link';
import { LayoutDashboard, ChartBarStacked, Settings, LogOut, Activity } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="relative w-[100px] bg-background h-full text-foreground flex flex-col items-center py-4">
      <ul className="space-y-4">
        <li className='text-gray-400'>
          Menu
        </li>
        <li>
          <Link
            href="/movimentacoes"
            className="flex justify-center p-2 rounded hover:bg-foreground hover:text-background"
          >
            <Activity size={17} className="stroke-black" />
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard"
            className="flex justify-center p-2 rounded hover:bg-foreground hover:text-background"
          >
            <LayoutDashboard size={17} className="stroke-black" />
          </Link>
        </li>
        <li>
          <Link
            href="/categorias"
            className="flex justify-center p-2 rounded hover:bg-foreground hover:text-background"
          >
            <ChartBarStacked size={17} className="stroke-black" />
          </Link>
        </li>
        <li>
          <Link
            href="/configuracoes"
            className="flex justify-center p-2 rounded hover:bg-foreground hover:text-background"
          >
            <Settings size={20} className="stroke-black" />
          </Link>
        </li>
        <li>
        <Link
            href="logout"
            className="flex justify-center mt-80 p-2 rounded hover:bg-foreground hover:text-background"
          >
            <LogOut size={17} className="stroke-black" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
