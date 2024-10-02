// pages/index.tsx
import MainLayout from '../layouts/MainLayout';

const Home = () => {
  return (
    <MainLayout>
      <main className='bg-white rounded-[40px] border border-gray-300 shadow-lg p-2'>
        <h2 className="text-2xl font-bold text-gray-400">Bem-vindo à sua página inicial, NOME!</h2>
      </main>
    </MainLayout>
  );
};

export default Home;
