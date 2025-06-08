import { useEffect, useState } from "react";
import "../../../styles/ProductRegister/ModalBase.css";
import "../../../styles/ProductRegister/SignupModal.css";

const logo = process.env.PUBLIC_URL + "/assets/icons/logo.png";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  onNextToPassword: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({
  isOpen,
  onClose,
  onSwitchToLogin,
  onNextToPassword,
}) => {
  const [step, setStep] = useState(1); // 1단계: 이메일, 2단계: 인증번호

  // 모달이 열릴 때마다 step 초기화
  useEffect(() => {
    if (isOpen) setStep(1);
  }, [isOpen]);
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
            type="email"
            placeholder="example@example.com"
            className="input-signup"
          />

          {step === 2 && (
            <input
              type="text"
              placeholder="인증번호 6자리"
              className="input-signup code-input"
            />
          )}

          <div className="button-group">
            {step === 1 ? (
              <button className="signup-btn" onClick={() => setStep(2)}>
                다음
              </button>
            ) : (
              <>
                <button className="prev-btn" onClick={() => setStep(1)}>
                  이전
                </button>
                <button className="signup-btn" onClick={onNextToPassword}>
                  다음
                </button>
              </>
            )}
          </div>

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

export default SignupModal;
