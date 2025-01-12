import Image from 'next/image';
import { useState } from 'react';
import image from "../../public/imageFinance 1.svg";
import logoWP from "../../public/logoWP.svg";

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
      <div className="w-full flex flex-col justify-center items-center">
      <Image alt='logoWP' height={150} width={150} src={logoWP}/>
        <form onSubmit={handleSubmit} className="w-3/4 max-w-md">
          <div className="mt-5 mb-4">
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
    </div>
  );
};

export default Login;
