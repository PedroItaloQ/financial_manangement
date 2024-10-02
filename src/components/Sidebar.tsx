import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="relative w-[100px] bg-gray-50 h-full">
      <h2 className="text-xl font-bold mb-4">Menu</h2>
      <ul>
        <li><Link href="/dashboard" className="block py-2 hover:bg-gray-300 text-gray-400">Dashboard</Link></li>
        <li><Link href="#" className="block py-2 hover:bg-gray-300 text-gray-400">Transações</Link></li>
        <li><Link href="#" className="block py-2 hover:bg-gray-300 text-gray-400">Relatórios</Link></li>
        <li><Link href="#" className="block py-2 hover:bg-gray-300 text-gray-400">Configurações</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;