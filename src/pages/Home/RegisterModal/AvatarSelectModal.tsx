// src/pages/Home/ProductRegister/AvatarSelectModal.tsx
import React from "react";
import "../../../styles/ProductRegister/AvatarSelectModal.css";

interface AvatarSelectModalProps {
  isOpen: boolean;
  avatars: string[];
  onClose: () => void;
  onSelect: (src: string) => void;
}

const AvatarSelectModal: React.FC<AvatarSelectModalProps> = ({
  isOpen,
  avatars,
  onClose,
  onSelect,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay avatar-select-overlay">
      <div className="avatar-select-modal">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <h3>프로필 사진을 선택하세요</h3>
        <div className="avatar-grid">
          {avatars.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`avatar-${idx}`}
              className="avatar-option"
              onClick={() => onSelect(img)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvatarSelectModal;
