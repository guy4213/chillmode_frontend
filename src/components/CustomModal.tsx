import React, { useEffect } from 'react';

interface CustomModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  timeout: number;
}

const CustomModal: React.FC<CustomModalProps> = ({ message, onConfirm, onCancel, timeout }) => {
  useEffect(() => {
    const timer = setTimeout(onCancel, timeout);
    return () => clearTimeout(timer);
  }, [timeout, onCancel]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
};

export default CustomModal;