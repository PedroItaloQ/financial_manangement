import { useEffect } from "react";
import { CheckCircle } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const SuccessModal = ({ isOpen, message, onClose }: SuccessModalProps) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // ⏳ Fecha automaticamente após 3 segundos

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 flex flex-col items-center">
        <CheckCircle className="text-green-500 w-12 h-12 mb-2" />
        <h2 className="text-lg font-semibold text-gray-700">{message}</h2>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600 transition"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
