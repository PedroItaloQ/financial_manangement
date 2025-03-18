import Image from 'next/image';
import MainLayout from '../layouts/MainLayout';
import graphic from "../../public/grafico 2.svg"

const Home = () => {
  return (
    <MainLayout>
      <h2 className="flex text-2xl font-bold text-gray-700">
        Bem-vindo à sua página inicial, 
        <span className="text-blue-600 ml-2">Pedro Italo!</span>
      </h2>

      <p className='mt-4 text-gray-500'>
        Aqui você pode gerenciar suas finanças, ver dashboard e muito mais!
      </p>

      <Image className='mt-10' alt='graphic' height={200} width={500} src={graphic} />
    </MainLayout>
  );
};

export default Home;
