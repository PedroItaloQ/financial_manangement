import Image from 'next/image';
import { useState } from 'react';
import image from "../../public/imageFinance.jpg";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Adicione aqui sua lógica de autenticação
    console.log({ email, password });
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Lado esquerdo - Formulário */}
      <div className="w-full md:w-1/3 flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-500 ">Login</h2>
        <form onSubmit={handleSubmit} className="w-3/4 max-w-md">
          <div className="mb-4">
            {/* <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label> */}
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              placeholder="Digite seu email"
              required
            />
          </div>
          <div className='flex justify-end href="#"'>
            <a className='text-blue-500 underline cursor-pointer text-sm'>esqueci a Senha</a>
          </div>

          <div className="mb-6">
            {/* <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label> */}
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              placeholder="Digite sua senha"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Entrar
          </button>
        </form>
      </div>

      {/* Lado direito - Imagem */}
      <div className="hidden md:block w-full md:w-2/3 relative">
        <Image
          src={image}
          alt="Imagem ilustrativa"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default Login;
