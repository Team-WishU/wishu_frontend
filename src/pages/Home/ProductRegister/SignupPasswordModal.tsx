import React, { useState } from "react";
import "../../../styles/ProductRegister/ModalBase.css";
import "../../../styles/ProductRegister/SignupPasswordModal.css";

const logo = process.env.PUBLIC_URL + "/assets/icons/logo.png";

interface SignupPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNextToProfile: () => void;
  onSwitchToLogin: () => void;
}

const SignupPasswordModal: React.FC<SignupPasswordModalProps> = ({
  isOpen,
  onClose,
  onNextToProfile,
  onSwitchToLogin,
}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isMatch = password && confirmPassword && password === confirmPassword;
  const isMismatch =
    password && confirmPassword && password !== confirmPassword;

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
                <h2>위시유에 가입하기</h2>
                <p>우리의 위시 아이템을 편리하게 담아두세요!</p>
              </div>
            </div>
          </div>

          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            className="input-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호를 확인해주세요."
            className="input-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {isMismatch && (
            <p className="password-hint mismatch">비밀번호 불일치</p>
          )}
          {isMatch && <p className="password-hint match">비밀번호 일치</p>}

          <button className="password-submit-btn" onClick={onNextToProfile}>
            다음으로
          </button>

          <p className="login-msg">
            계정이 있으세요?{" "}
            <span className="login-link" onClick={onSwitchToLogin}>
              로그인하기
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPasswordModal;
