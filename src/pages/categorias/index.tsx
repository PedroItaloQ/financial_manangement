import { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import CategoryModal from "@/components/CreateCategoryModal";
import SuccessModal from "@/components/SuccessModal"; // ✅ Importação do modal de sucesso
import api from "@/utils/post";

interface Category {
    id: string;
    name: string;
    createdAt: string;
    createdBy: {
        username: string;
        email: string;
    };
}

const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false); // ✅ Estado para controlar o modal de sucesso

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const { data } = await api.get("/categories");
            setCategories(Array.isArray(data) ? data : []);
        } catch (error: any) {
            if (error.response?.status === 401) {
                console.error("⚠️ Não autorizado! O cookie de autenticação não está sendo enviado.");
            } else {
                console.error("Erro ao buscar categorias:", error);
            }
            setCategories([]);
        }
    };

    const handleCreateCategory = async (name: string) => {
        try {
            await api.post("/categories/create", { name });
            fetchCategories();
            setShowSuccess(true); // ✅ Exibe o modal de sucesso
        } catch (error) {
            console.error("Erro ao criar categoria:", error);
        }
    };

    return (
        <MainLayout>
            <div className="w-full px-6 mt-20">
                <div className="flex items-center mb-4 relative">
                    <h2 className="text-gray-700 font-semibold flex-grow text-center">
                        Categorias
                    </h2>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 absolute right-0"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Criar Categoria
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr className="text-sm text-gray-700">
                                <th className="border-b border-r border-gray-400 px-4 py-2 text-center">Nome</th>
                                <th className="border-b border-r border-gray-400 px-4 py-2 text-center">Criado Por</th>
                                <th className="border-b border-gray-400 px-4 py-2 text-center">Data de Criação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length > 0 ? (
                                categories.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                                        <td className="border border-gray-300 text-gray-600 px-4 py-2 text-center text-sm">
                                            {item.name}
                                        </td>
                                        <td className="border border-gray-300 text-gray-600 px-4 py-2 text-center text-sm">
                                            {item.createdBy?.username || "Desconhecido"}
                                        </td>
                                        <td className="border border-gray-300 text-gray-600 px-4 py-2 text-center text-sm">
                                            {new Date(item.createdAt).toLocaleDateString("pt-BR")}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="text-center py-4 text-gray-500">
                                        Nenhuma categoria encontrada
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal para criar categoria */}
            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreateCategory={handleCreateCategory}
            />

            <SuccessModal 
                isOpen={showSuccess} 
                message="Categoria criada com sucesso!" 
                onClose={() => setShowSuccess(false)}
            />
        </MainLayout>
    );
};

export default Categories;
