import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Modal from "@/components/ModalValidation";
import logoWP from "../../public/logoWP.svg";
import { PostLogin } from "@/utils/auth/PostLogin";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalMessage(null);

    try {
      const credentials = { email, password };
      const response = await PostLogin(credentials);

      console.log("Login bem-sucedido:", response.data);

      localStorage.setItem("username", response.data.user.username);

      router.push('/dashboard');
    } catch (error: any) {
      console.error("Erro ao fazer login:", error.response?.data || error.message);
      setModalMessage(error.response?.data?.message || "Erro ao fazer login.");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md bg-white border border-white rounded-lg shadow-md p-20">
        <div className="flex justify-center mb-6">
          <Image alt="logoWP" height={150} width={150} src={logoWP} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-10 mb-4">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-3 block w-96 max-w-full border border-gray-300 rounded-md text-gray-600"
              placeholder="Digite seu email"
              required
            />
          </div>
          <div className="flex justify-end">
            <a className="text-blue-500 underline cursor-pointer text-sm">Esqueci a Senha</a>
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-3 block w-96 max-w-full border border-gray-300 rounded-md text-gray-600"
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

      {modalMessage && (
        <Modal
          message={modalMessage}
          onClose={() => setModalMessage(null)}
        />
      )}
    </div>
  );
};

export default Login;
