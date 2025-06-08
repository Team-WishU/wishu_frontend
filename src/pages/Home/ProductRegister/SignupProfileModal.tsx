import React, { useState } from "react";
import "../../../styles/ProductRegister/ModalBase.css";
import "../../../styles/ProductRegister/SignupProfileModal.css";

const logo = process.env.PUBLIC_URL + "/assets/icons/logo.png";

interface SignupProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onSwitchToLogin: () => void;
}

const SignupProfileModal: React.FC<SignupProfileModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onSwitchToLogin,
}) => {
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");

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
                <p>회원정보를 입력해주세요.</p>
              </div>
            </div>
          </div>

          <div className="profile-form-group">
            <label className="label-title">이름</label>
            <input
              type="text"
              placeholder="이름을 입력해주세요."
              className="input-profile"
            />
            <div className="nickname-check">닉네임 중복 없음</div>

            <label className="label-title">생년월일</label>
            <input
              type="text"
              placeholder="ex) 030226"
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
              className={`Binput-profile ${birth ? "filled" : ""}`}
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
              <option value="etc">선택안함</option>
            </select>
          </div>

          <button className="password-submit-btn" onClick={onSubmit}>
            다음으로
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupProfileModal;
