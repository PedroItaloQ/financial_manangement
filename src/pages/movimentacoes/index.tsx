import { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import CreateExpenseModal from "@/components/CreateExpenseModal";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import api from "@/utils/post";
import EditExpenseModal from "@/components/EditExpenseModal";
import SuccessModal from "@/components/SuccessModal";

interface Expense {
  id: string;
  description: string;
  amount: number;
  createdAt: string;
  category: { id: string; name: string };
  addedBy: { id: string; username: string };
}

const Movimentacoes = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  const [users, setUsers] = useState<{ _id: string; username: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // Modal de sucesso para criação

  // Filtros
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Modal de edição
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  const handleOpenEditModal = (expense: Expense) => {
    console.log("🚀 Abertura do modal com:", expense);
    setSelectedExpense(expense);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
    fetchUsers();
  }, [page, selectedCategory, selectedUser]);

  const fetchExpenses = async () => {
    try {
      const { data } = await api.get(`/expenses?page=${page}&limit=10`, {
        params: {
          categoryId: selectedCategory || undefined,
          userId: selectedUser || undefined,
        },
      });
      setExpenses(data.expenses);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Erro ao buscar movimentações:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/users");
      setUsers(data.map((user: { _id: string; username: string }) => ({ _id: user._id, username: user.username })));
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const handleCreateExpense = async (categoryId: string, amount: number, description: string) => {
    if (!categoryId || !amount || !description) {
      console.error("❌ Todos os campos são obrigatórios.");
      return;
    }
    try {
      await api.post("/expenses/add", { categoryId, amount, description });
      fetchExpenses();
      setShowSuccess(true); // Exibe modal de sucesso
    } catch (error) {
      console.error("❌ Erro ao adicionar movimentação:", error);
    }
  };

  const handleClearFilters = () => {
    setSelectedCategory("");
    setSelectedUser("");
    setPage(1);
  };

  const handleSaveExpense = async (id: string, description: string, amount: number, categoryId: string) => {
    console.log("🛠️ Tentando atualizar despesa...");
    console.log("📌 ID recebido:", id);
    console.log("📌 Descrição recebida:", description);
    console.log("📌 Valor recebido:", amount);
    console.log("📌 Categoria ID recebida:", categoryId);

    if (!id || !description.trim() || isNaN(amount) || !categoryId) {
      console.error("❌ Erro: Algum campo está vazio ou inválido.");
      console.log({ id, description, amount, categoryId });
      return;
    }

    try {
      console.log(`✅ Enviando atualização para a despesa ${id}:`, { description, amount, categoryId });
      await api.put(`/expenses/${id}`, { description, amount: Number(amount), categoryId });
      fetchExpenses();
      // Não fechamos o modal de edição automaticamente
    } catch (error) {
      console.error("❌ Erro ao atualizar movimentação:", error);
    }
  };

  return (
    <MainLayout>
      <div className="w-full px-6 mt-10">
        <h2 className="text-2xl font-bold text-gray-700">Minhas Movimentações</h2>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
          onClick={() => setIsModalOpen(true)}
        >
          Adicionar Movimentação
        </button>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Transações Recentes</h3>
            <div className="flex space-x-4">
              <select
                className="border text-gray-600 border-gray-300 p-2 rounded"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Todas as Categorias</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <select
                className="border text-gray-600 border-gray-300 p-2 rounded"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                <option value="">Todos os Usuários</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.username}
                  </option>
                ))}
              </select>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                onClick={handleClearFilters}
              >
                Limpar Filtros
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border-b border-gray-200">
              <thead className="bg-gray-100">
                <tr className="text-sm text-gray-700">
                  <th className="border-b border-gray-400 px-4 py-2 text-center">Data</th>
                  <th className="border-b border-gray-400 px-4 py-2 text-center">Descrição</th>
                  <th className="border-b border-gray-400 px-4 py-2 text-center">Categoria</th>
                  <th className="border-b border-gray-400 px-4 py-2 text-center">Usuário</th>
                  <th className="border-b border-gray-400 px-4 py-2 text-center">Valor</th>
                  <th className="border-b border-gray-400 px-4 py-2 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {expenses.length > 0 ? (
                  expenses.map((item) => (
                    <tr key={item.id} className="transition duration-150 ease-in-out">
                      <td className="border-b border-gray-300 text-gray-600 px-4 py-2 text-center text-sm">
                        {new Date(item.createdAt).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="border-b border-gray-300 text-gray-600 px-4 py-2 text-center text-sm">
                        {item.description}
                      </td>
                      <td className="border-b border-gray-300 text-gray-600 px-4 py-2 text-center text-sm">
                        {item.category?.name || "Sem Categoria"}
                      </td>
                      <td className="border-b border-gray-300 text-gray-600 px-4 py-2 text-center text-sm">
                        {item.addedBy?.username || "Desconhecido"}
                      </td>
                      <td className={`border-b border-gray-300 px-4 py-2 text-center text-sm ${item.amount < 0 ? "text-red-500" : "text-green-500"}`}>
                        R$ {item.amount.toFixed(2)}
                      </td>
                      <td className="border-b border-gray-300 px-4 py-2 text-center text-sm">
                        <ChevronRight
                          className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg hover:cursor-pointer transition duration-150"
                          onClick={() => handleOpenEditModal(item)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-500">
                      Nenhuma movimentação encontrada
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center items-center space-x-2 mt-4">
            <button
              className={`px-2 py-1 rounded flex items-center ${page === 1 ? "text-gray-600 cursor-not-allowed" : "text-gray-600 hover:bg-gray-200"}`}
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-gray-700 font-semibold">
              Página {page} de {totalPages}
            </span>
            <button
              className={`px-2 py-1 rounded flex items-center ${page === totalPages ? "text-gray-600 cursor-not-allowed" : "text-gray-600 hover:bg-gray-200"}`}
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <CreateExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateExpense={handleCreateExpense}
        categories={categories}
      />

      <EditExpenseModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        expense={selectedExpense}
        onSave={handleSaveExpense}
        categories={categories}
      />

      <SuccessModal
        isOpen={showSuccess}
        message="Movimentação criada com sucesso!"
        onClose={() => setShowSuccess(false)}
      />
    </MainLayout>
  );
};

export default Movimentacoes;
