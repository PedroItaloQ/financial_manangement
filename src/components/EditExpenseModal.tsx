import { useEffect, useState } from "react";
import SuccessModal from "@/components/SuccessModal";

interface EditExpenseModalProps {
    isOpen: boolean;
    onClose: () => void;
    expense: {
        id?: string;
        _id?: string;
        description: string;
        amount: number;
        category: { id?: string; _id?: string; name: string };
        addedBy: { id: string; username: string };
    } | null;
    onSave: (id: string, description: string, amount: number, categoryId: string) => Promise<void>; // ✅ Agora `onSave` retorna uma Promise
    categories: { _id: string; name: string }[];
}

const EditExpenseModal = ({ isOpen, onClose, expense, onSave, categories }: EditExpenseModalProps) => {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState<string>("0");
    const [categoryId, setCategoryId] = useState("");
    const [expenseId, setExpenseId] = useState<string>("");
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (expense) {
            console.log("🛠️ Modal carregado com despesa:", expense);
            setExpenseId(expense.id || expense._id || "");
            setDescription(expense.description || "");
            setAmount(expense.amount.toString());
            setCategoryId(expense.category?.id || expense.category?._id || "");
        }
    }, [expense]);

    if (!isOpen || !expense) return null;

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "-" || value === "" || /^-?\d*\.?\d*$/.test(value)) {
            setAmount(value);
        }
    };

    const handleSubmit = async () => {
        if (!expenseId || !description.trim() || !categoryId || isNaN(Number(amount))) {
            console.error("❌ Todos os campos são obrigatórios.");
            return;
        }

        try {
            await onSave(expenseId, description, Number(amount), categoryId);
            setShowSuccess(true);
        } catch (error) {
            console.error("Erro ao atualizar movimentação:", error);
        }
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Editar Movimentação</h2>

                        {/* Descrição */}
                        <label className="block text-sm font-medium text-gray-700">Descrição</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded mt-1 text-gray-700"
                        />

                        {/* Valor */}
                        <label className="block mt-4 text-sm font-medium text-gray-700">Valor (R$)</label>
                        <input
                            type="text"
                            value={amount}
                            onChange={handleAmountChange}
                            className="w-full border border-gray-300 p-2 rounded mt-1 text-gray-700"
                        />

                        {/* Categoria */}
                        <label className="block mt-4 text-sm font-medium text-gray-700">Categoria</label>
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded mt-1 text-gray-700"
                        >
                            <option value="" disabled>Selecione uma categoria</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>

                        {/* Botões */}
                        <div className="flex justify-end gap-2 mt-4">
                            <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
                                Cancelar
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={handleSubmit}
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <SuccessModal 
                isOpen={showSuccess} 
                message="Despesa editada com sucesso!" 
                onClose={() => setShowSuccess(false)} 
            />
        </>
    );
};

export default EditExpenseModal;
