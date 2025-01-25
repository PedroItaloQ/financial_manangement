import React from 'react';

interface ModalProps {
    message: string;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                <p className="text-gray-800 text-center">{message}</p>
                <button
                    onClick={onClose}
                    className="mt-4 w-full bg-blue-700 text-white p-2 rounded-lg"
                >
                    Fechar
                </button>
            </div>
        </div>
    );
};

export default Modal;
