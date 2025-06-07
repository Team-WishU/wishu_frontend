// src/pages/Home/ProductRegister/LoginModal.tsx
import React from "react";
import "../../../styles/ProductRegister/LoginModal.css";
import logo from "../../../assets/icons/logo.png";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay">
      <div className="login-modal">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-header-with-logo">
          <div className="logo-circle">
            <img src={logo} alt="Wishu Logo" className="logo-image" />
          </div>
          <div className="text-block">
            <h2>WELCOME!</h2>
            <p>위시랩에 로그인하고, 아이템을 구경해보세요</p>
          </div>
        </div>
        <input
          type="email"
          placeholder="이메일(아이디)를 입력해주세요."
          className="modal-input"
        />
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          className="modal-input"
        />
        <button className="login-button">로그인</button>
        <p className="signup-text">
          계정이 없으세요? <span className="signup-link">가입하기</span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
