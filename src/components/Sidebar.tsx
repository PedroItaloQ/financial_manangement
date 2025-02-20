import Link from 'next/link';
import { useState } from 'react';
import { LayoutDashboard, ChartBarStacked, Settings, LogOut, Activity } from 'lucide-react';

const Sidebar = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="relative w-[100px] bg-background h-full text-foreground flex flex-col items-center py-4">
      <ul className="space-y-4 relative">
        <li className='text-gray-400'>
          Menu
        </li>

        {/* ÍCONES DO MENU */}
        {[
          { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { href: '/movimentacoes', icon: Activity, label: 'Movimentações' },
          { href: '/categorias', icon: ChartBarStacked, label: 'Categorias' },
          { href: '/configuracoes', icon: Settings, label: 'Configurações' },
        ].map(({ href, icon: Icon, label }) => (
          <li
            key={href}
            className="relative group"
            onMouseEnter={() => setHoveredItem(label)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Link
              href={href}
              className="flex justify-center p-2 rounded hover:bg-foreground hover:text-background"
            >
              <Icon size={17} className="stroke-black" />
            </Link>

            {/* Tooltip */}
            {hoveredItem === label && (
              <span className="absolute left-[60px] top-1/2 -translate-y-1/2 bg-gray-700 text-white text-sm px-2 py-1 rounded-md shadow-md">
                {label}
              </span>
            )}
          </li>
        ))}

        {/* ÍCONE DE LOGOUT */}
        <li
          className="relative group mt-80"
          onMouseEnter={() => setHoveredItem('Logout')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <Link
            href="/logout"
            className="flex justify-center p-2 rounded hover:bg-foreground hover:text-background"
          >
            <LogOut size={17} className="stroke-black" />
          </Link>

          {/* Tooltip */}
          {hoveredItem === 'Logout' && (
            <span className="absolute left-[60px] top-1/2 -translate-y-1/2 bg-gray-700 text-white text-sm px-2 py-1 rounded-md shadow-md">
              Logout
            </span>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
