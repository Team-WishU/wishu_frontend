import React from "react";
import "../../../styles/ProductRegister/ModalBase.css";
import "../../../styles/ProductRegister/LoginModal.css";

const logo = process.env.PUBLIC_URL + "/assets/icons/logo.png";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSwitchToSignup,
  onLoginSuccess,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-content">
          <div className="modal-header-wrapper">
            <div className="modal-header">
              <div className="logo-wrapper">
                <img src={logo} alt="Wishu Logo" className="logo-img" />
              </div>
              <div className="modal-text">
                <h2>WELCOME!</h2>
                <p>위시랩에 로그인하고, 아이템을 구경해보세요</p>
              </div>
            </div>
          </div>

          <div className="modal-content">
            <input
              type="email"
              placeholder="이메일(아이디)를 입력해주세요."
              className="input-login"
            />
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              className="input-login"
            />
            <button
              className="login-btn"
              onClick={() => {
                onLoginSuccess(); // 로그인 성공 시 호출
              }}
            >
              로그인
            </button>
            <p className="signup-msg">
              계정이 없으세요?{" "}
              <span className="signup-link" onClick={onSwitchToSignup}>
                가입하기
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
