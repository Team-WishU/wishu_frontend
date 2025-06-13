import React, { useState } from "react";
import "../../../styles/ProductRegister/ModalBase.css";
import "../../../styles/ProductRegister/SignupProfileModal.css";

const logo = process.env.PUBLIC_URL + "/assets/icons/logo.png";

interface SignupProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (realName: string, birth: string, gender: string) => void;
  onSwitchToLogin: () => void;
}

const SignupProfileModal: React.FC<SignupProfileModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onSwitchToLogin,
}) => {
  const [realName, setRealName] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");

  if (!isOpen) return null;

  const handleNext = () => {
    if (!realName || !birth || !gender) {
      alert("모든 정보를 입력해주세요.");
      return;
    }

    if (!/^\d{6}$/.test(birth)) {
      alert("생년월일은 YYMMDD 형식의 6자리 숫자여야 합니다.");
      return;
    }

    if (!['male', 'female'].includes(gender)) {
      alert("성별은 남성(male) 또는 여성(female)만 가능합니다.");
      return;
    }

    onSubmit(realName, birth, gender);
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
                <h2>기본 정보 입력</h2>
                <p>이름, 생년월일, 성별을 입력해주세요</p>
              </div>
            </div>
          </div>

          <div className="profile-form-group">
            <label className="label-title">이름</label>
            <input
              type="text"
              placeholder="이름을 입력해주세요."
              value={realName}
              onChange={(e) => setRealName(e.target.value)}
              className="input-profile"
            />

            <label className="label-title">생년월일</label>
            <input
              type="text"
              placeholder="ex) 030226"
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
              className={`Binput-profile ${birth ? "filled" : ""}`}
              maxLength={6}
            />

            <label className="label-title">성별</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className={`Sinput-profile ${gender ? "filled" : ""}`}
            >
              <option value="" disabled hidden>
                성별
              </option>
              <option value="female">여성</option>
              <option value="male">남성</option>
            </select>
          </div>

          <button className="password-submit-btn" onClick={handleNext}>
            다음으로
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupProfileModal;