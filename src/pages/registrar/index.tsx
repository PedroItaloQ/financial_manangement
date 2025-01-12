import Image from 'next/image';
import { useState } from 'react';
import image from "../../../public/imageFinance 1.svg";
import logoWP from "../../../public/logoWP.svg";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ email, password });
    };

    return (
        <div className="flex h-screen bg-white">

            <div className="w-full md:w-1/3 flex flex-col justify-center items-center">
                <Image alt='logoWP' height={150} width={150} src={logoWP} />
                <form onSubmit={handleSubmit} className="w-3/4 max-w-md">
                    <div className='flex gap-x-4'>
                        <div className="mt-5">
                            <input
                                type="firstName"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                placeholder="Nome"
                                required
                            />
                        </div>
                        <div className="mt-5">

                            <input
                                type="lastName"
                                id="lastName"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                placeholder="Sobrenome"
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-5 mb-4">

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

                    <div className="mb-4">
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
                            placeholder="Confirmar senha"
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

export default Register;
