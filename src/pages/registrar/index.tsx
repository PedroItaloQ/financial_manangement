import Image from 'next/image';
import { useState } from 'react';
import Modal from "@/components/ModalValidation";
import logoWP from "../../../public/logoWP.svg";
import { CreateUser } from "@/utils/user/CreateUser";

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [modalMessage, setModalMessage] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { firstName, lastName, email, password, confirmPassword } = formData;

        // Validação da senha e confirmação
        if (password !== confirmPassword) {
            setModalMessage('As senhas não coincidem.');
            return;
        }

        try {
            // Criando o username concatenando firstName e lastName
            const username = `${firstName} ${lastName}`.trim();

            // Dados a serem enviados
            const user = { username, email, password };

            const response = await CreateUser(user);
            if (response.status === 201) {
                setModalMessage('Usuário registrado com sucesso!');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
            }
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            setModalMessage('Ocorreu um erro ao registrar o usuário. Tente novamente.');
        }
    };

    return (
        <div className="flex h-screen bg-gradient-to-tr from-[#B2C0FF] to-[#F6F6F6] items-center justify-center">
            <div className="w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-md p-8">
                <div className="flex justify-center mb-6">
                    <Image alt="logoWP" height={150} width={150} src={logoWP} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex gap-2">
                        <div className="mb-4">
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-gray-900"
                                placeholder="Nome"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-gray-900"
                                placeholder="Sobrenome"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-gray-900"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-gray-900"
                            placeholder="Senha"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-gray-900"
                            placeholder="Confirmar senha"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="button-primary bg-blue-700 text-white p-2 rounded-lg w-full"
                    >
                        Registrar
                    </button>
                </form>
            </div>

            {/* Exibir o modal se houver uma mensagem */}
            {modalMessage && (
                <Modal
                    message={modalMessage}
                    onClose={() => setModalMessage(null)} // Fecha o modal ao clicar em "Fechar"
                />
            )}
        </div>
    );
};

export default Register;
