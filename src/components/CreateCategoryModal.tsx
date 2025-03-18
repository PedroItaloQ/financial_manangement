import { useState } from "react";
import SuccessModal from "@/components/SuccessModal"; // ✅ Importação do modal de sucesso

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCategory: (name: string) => void;
}

const CategoryModal = ({ isOpen, onClose, onCreateCategory }: CategoryModalProps) => {
  const [categoryName, setCategoryName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false); // ✅ Estado do modal de sucesso

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (categoryName.trim() === "") return;

    onCreateCategory(categoryName);
    setCategoryName("");
    onClose();
    setShowSuccess(true); // ✅ Exibe o modal de sucesso
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-lg font-semibold text-gray-700">Criar Nova Categoria</h2>
          <input
            type="text"
            className="w-full text-gray-600 border border-gray-300 p-2 rounded mt-4"
            placeholder="Nome da categoria"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <div className="flex justify-end gap-2 mt-4">
            <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
              Cancelar
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleSubmit}>
              Criar
            </button>
          </div>
        </div>
      </div>

      <SuccessModal isOpen={showSuccess} message="Categoria criada com sucesso!" onClose={() => setShowSuccess(false)} />
    </>
  );
};

export default CategoryModal;