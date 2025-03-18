import { useState } from "react";
import SuccessModal from "@/components/SuccessModal"; // ✅ Importação do modal de sucesso

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateExpense: (categoryId: string, amount: number, description: string) => void;
  categories: { _id: string; name: string }[];
}

const CreateExpenseModal = ({ isOpen, onClose, onCreateExpense, categories }: ExpenseModalProps) => {
  const [categoryId, setCategoryId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [showSuccess, setShowSuccess] = useState(false); // ✅ Estado do modal de sucesso

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!categoryId || !amount || !description) return;

    onCreateExpense(categoryId, parseFloat(amount), description);
    setCategoryId("");
    setAmount("");
    setDescription("");
    onClose();
    setShowSuccess(true); // ✅ Exibe o modal de sucesso
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-lg font-semibold text-gray-700">Adicionar Movimentação</h2>

          <label className="block mt-4 text-sm font-medium text-gray-700">Categoria</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full text-gray-600 border border-gray-300 p-2 rounded mt-1"
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>

          <label className="block mt-4 text-sm font-medium text-gray-700">Descrição</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full text-gray-600 border border-gray-300 p-2 rounded mt-1"
          />

          <label className="block mt-4 text-sm font-medium text-gray-700">Valor (R$)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full text-gray-600 border border-gray-300 p-2 rounded mt-1"
          />

          <div className="flex justify-end gap-2 mt-4">
            <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
              Cancelar
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleSubmit}>
              Adicionar
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Modal de sucesso */}
      <SuccessModal isOpen={showSuccess} message="Despesa adicionada com sucesso!" onClose={() => setShowSuccess(false)} />
    </>
  );
};

export default CreateExpenseModal;