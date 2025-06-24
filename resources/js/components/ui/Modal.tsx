import { ReactNode } from 'react';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ show, onClose, children }: ModalProps) => {
  if (!show) return null;

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    // if user click out of the modal
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div onClick={handleClickOutside} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded shadow-lg p-6 max-h-[80vh] w-full lg:max-w-[90vh] sm:max-w-sm relative overflow-y-auto">
            <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">✕</button>
            {children}
        </div>
    </div>
  );
};
