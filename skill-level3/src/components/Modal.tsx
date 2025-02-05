import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-base-100 bg-opacity-50">
      <div className="bg-base-100 p-6 rounded-lg shadow-lg text-center">
        <div className=" mb-4">{message}</div>
        <button onClick={onClose} className="btn btn-primary">
          Fermer
        </button>
      </div>
    </div>
  );
};

export default Modal;
