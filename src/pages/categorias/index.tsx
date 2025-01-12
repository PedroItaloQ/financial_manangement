import MainLayout from "@/layouts/MainLayout";

const Categories = () => {
    const historico = [
        { id: 1, data: "2024-12-20", descricao: "Alteração no título do projeto" },
        { id: 2, data: "2024-12-21", descricao: "Adicionado campo de responsável" },
        { id: 3, data: "2024-12-22", descricao: "Removido botão de salvar" },
        { id: 4, data: "2024-12-23", descricao: "Ajustado layout do formulário" },
    ];

    return (
        <MainLayout>
            <div className="w-full px-6 mt-20">
                <div className="flex items-center mb-4 relative">
                    <h2 className="text-gray-700 font-semibold flex-grow text-center">
                        Categorias
                    </h2>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 absolute right-0">
                        Criar Categoria
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr className="text-sm text-gray-700">
                                <th className="border-b border-r border-gray-400 px-4 py-2 text-center rounded-tl-lg">Data</th>
                                <th className="border-b border-gray-400 px-4 py-2 text-center rounded-tr-lg">Titulo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historico.map((item) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-gray-50 transition duration-150 ease-in-out"
                                >
                                    <td className="border border-gray-300 text-gray-600 px-4 py-2 text-center text-sm">
                                        {item.data}
                                    </td>
                                    <td className="border border-gray-300 text-gray-600 px-4 py-2 text-center text-sm">
                                        {item.descricao}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    );
};

export default Categories;
