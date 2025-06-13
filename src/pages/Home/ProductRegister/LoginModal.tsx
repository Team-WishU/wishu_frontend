import React, { useState } from "react";
import "../../../styles/ProductRegister/ModalBase.css";
import "../../../styles/ProductRegister/LoginModal.css";
import axios from "axios";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email,
        password,
      });

      const { accessToken, user } = res.data;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      alert("로그인 성공!");
      onLoginSuccess();
      onClose();
    } catch (err) {
      alert("로그인 실패! 이메일 또는 비밀번호를 확인해주세요.");
    }
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              className="input-login"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login-btn" onClick={handleLogin}>
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
