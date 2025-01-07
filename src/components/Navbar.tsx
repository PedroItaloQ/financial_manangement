import Link from 'next/link';
import Image from 'next/image';
import coinLogo from "../../public/logoWP.svg";

const Navbar = () => {
  return (
    <nav className="bg-background p-4 text-foreground flex items-center justify-between">
      <div>
        <Image src={coinLogo} height={100} width={100} alt="moeda" />
      </div>
      
      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
        PI
      </div>
    </nav>
  );
};

export default Navbar;
