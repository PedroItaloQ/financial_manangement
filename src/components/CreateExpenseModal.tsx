import { useState } from "react";

interface ExpenseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateExpense: (categoryId: string, amount: number, description: string) => void;
    categories: { _id: string; name: string }[]; // ✅ Agora _id está correto!
}

const CreateExpenseModal = ({ isOpen, onClose, onCreateExpense, categories }: ExpenseModalProps) => {
    const [categoryId, setCategoryId] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!categoryId || !amount || !description) return;

        onCreateExpense(categoryId, parseFloat(amount), description);
        setCategoryId("");
        setAmount("");
        setDescription("");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-semibold text-gray-700">Adicionar Movimentação</h2>

                <label className="block mt-4 text-sm font-medium text-gray-700">Categoria</label>
                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded mt-1"
                >
                    <option value="">Selecione uma categoria</option>
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option> // ✅ Agora _id é o ID real!
                    ))}
                </select>

                <label className="block mt-4 text-sm font-medium text-gray-700">Descrição</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded mt-1"
                    placeholder="Ex: Compra de Material"
                />

                <label className="block mt-4 text-sm font-medium text-gray-700">Valor (R$)</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded mt-1"
                    placeholder="Ex: 150.00"
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
    );
};

export default CreateExpenseModal;
