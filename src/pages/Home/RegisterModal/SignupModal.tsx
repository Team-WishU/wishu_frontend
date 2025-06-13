import { useEffect, useState } from "react";
import api from "../../../utils/axiosInstance";
import "../../../styles/ProductRegister/ModalBase.css";
import "../../../styles/ProductRegister/SignupModal.css";

const logo = process.env.PUBLIC_URL + "/assets/icons/logo.png";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  onNextToPassword: () => void;
  setEmail: (email: string) => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose, onSwitchToLogin, onNextToPassword, setEmail }) => {
  const [step, setStep] = useState(1);
  const [localEmail, setLocalEmail] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setLocalEmail("");
      setCode("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSendCode = async () => {
    if (!localEmail.includes("@") || !localEmail.includes(".")) {
      alert("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    try {
      await api.post("/email-verification/request", {
        email: localEmail,
      });
      alert("인증번호가 전송되었습니다.");
      setStep(2);
    } catch {
      alert("인증번호 전송 실패. 이메일을 확인해주세요.");
    }
  };

  const handleVerifyCode = async () => {
    if (!code.trim()) {
      alert("인증번호를 입력해주세요.");
      return;
    }

    try {
      await api.post("/email-verification/verify", {
        email: localEmail,
        code,
      });
      alert("이메일 인증이 완료되었습니다.");
      setEmail(localEmail);
      onNextToPassword();
    } catch {
      alert("인증번호가 올바르지 않습니다.");
    }
  };

  const isEmailValid = localEmail.includes("@") && localEmail.includes(".");
  const isCodeFilled = code.trim().length > 0;

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
            type="email"
            placeholder="example@example.com"
            className="input-signup"
            value={localEmail}
            onChange={(e) => setLocalEmail(e.target.value)}
          />

          {step === 2 && (
            <input
              type="text"
              placeholder="인증번호 6자리"
              className="input-signup code-input"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          )}

          <div className="button-group">
            {step === 1 ? (
              <button className={`signup-btn ${isEmailValid ? "enabled-btn" : ""}`} onClick={handleSendCode} disabled={!isEmailValid}>
                인증번호 전송
              </button>
            ) : (
              <>
                <button className="prev-btn" onClick={() => setStep(1)}>
                  이전
                </button>
                <button className={`signup-btn ${isCodeFilled ? "enabled-btn" : ""}`} onClick={handleVerifyCode} disabled={!isCodeFilled}>
                  다음
                </button>
              </>
            )}
          </div>

          <p className="login-msg">
            계정이 있으신가요?{" "}
            <span className="login-link" onClick={onSwitchToLogin}>
              로그인하기
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
