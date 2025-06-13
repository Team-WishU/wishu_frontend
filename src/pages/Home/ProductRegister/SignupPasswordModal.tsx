import React, { useState, useEffect } from "react";
import "../../../styles/ProductRegister/ModalBase.css";
import "../../../styles/ProductRegister/SignupPasswordModal.css";

const logo = process.env.PUBLIC_URL + "/assets/icons/logo.png";

interface SignupPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNextToProfile: () => void;
  onSwitchToLogin: () => void;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const SignupPasswordModal: React.FC<SignupPasswordModalProps> = ({
  isOpen,
  onClose,
  onNextToProfile,
  onSwitchToLogin,
  setPassword,
}) => {
  const [localPassword, setLocalPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isMatch =
    localPassword && confirmPassword && localPassword === confirmPassword;
  const isMismatch =
    localPassword && confirmPassword && localPassword !== confirmPassword;

  useEffect(() => {
    if (!isOpen) {
      setLocalPassword("");
      setConfirmPassword("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (!localPassword || !confirmPassword) {
      alert("비밀번호를 모두 입력해주세요.");
      return;
    }

    if (localPassword.length < 6) {
      alert("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    if (isMismatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    setPassword(localPassword);
    onNextToProfile();
  };

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
                <h2>비밀번호 설정</h2>
                <p>안전하게 계정을 보호하세요</p>
              </div>
            </div>
          </div>

          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            className="input-password"
            value={localPassword}
            onChange={(e) => setLocalPassword(e.target.value)}
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

          <button className="password-submit-btn" onClick={handleNext}>
            다음으로
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPasswordModal;
