import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "../../styles/UserMenu.css";

const UserMenu: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const handleLogout = () => {
    logout();
    alert("로그아웃이 완료되었어요. 다음에 또 만나요!");
    navigate("/");
  };
  return (
    <div className="dropdown-menu">
      <div className="dropdown-section">
        <div className="dropdown-name">{user.name}</div>
        <div className="dropdown-email-line">
          <span className="dropdown-email-label">Email</span>
          <span className="dropdown-email">{user.email}</span>
        </div>
        <div className="dropdown-link" onClick={() => navigate("/mypage")}>
          내 위시템 <img src="/assets/icons/Chevron_right.svg" />
        </div>
      </div>

      <hr />

      <div className="dropdown-section">
        <div className="dropdown-item" onClick={() => navigate("/profile-setting")}>
          <img src="/assets/icons/settings.svg" alt="설정" className="dropdown-icon-img" />
          프로필 설정
        </div>
        <div className="dropdown-item" onClick={handleLogout}>
          <img src="/assets/icons/logout.svg" alt="로그아웃" className="dropdown-icon-img" />
          로그아웃
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
