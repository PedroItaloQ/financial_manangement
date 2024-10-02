import Link from 'next/link';
import Image from 'next/image';
import coinLogo from "../../public/coinLogo.png";

const Navbar = () => {
  return (
    <nav className="bg-gray-50 p-4 text-gray-700"> {/* Mudança de cor para destacar */}
      <ul className="flex space-x-4">
      <Image src={coinLogo} height={40} width={40} alt='moeda' />
        <li><Link href="/home" className="hover:underline">Home</Link></li>
        <li><Link href="/dashboard" className="hover:underline">Dashboard</Link></li>
        <li><Link href="#" className="hover:underline">Sobre</Link></li>
        <li><Link href="#" className="hover:underline">Contato</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
