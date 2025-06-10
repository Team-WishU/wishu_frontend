import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/UserMenu.css";

interface Props {
  userName: string;
  userEmail: string;
  onLogout: () => void;
}

const UserMenu: React.FC<Props> = ({ userName, userEmail, onLogout }) => {
  const navigate = useNavigate();

  const handleGoToMyPage = () => {
    navigate("/mypage");
  };

  const handleGoToProfileSetting = () => {
    navigate("/profile-setting");
  };

  return (
    <div className="dropdown-menu">
      <div className="dropdown-section">
        <div className="dropdown-name">{userName}</div>
        <div className="dropdown-email-line">
          <span className="dropdown-email-label">Email</span>
          <span className="dropdown-email">{userEmail}</span>
        </div>
        <div className="dropdown-link" onClick={handleGoToMyPage}>
          내 위시템 <img src="/assets/icons/Chevron_right.svg" />
        </div>
      </div>

      <hr />

      <div className="dropdown-section">
        <div className="dropdown-item" onClick={handleGoToProfileSetting}>
          <img
            src="/assets/icons/settings.svg"
            alt="설정"
            className="dropdown-icon-img"
          />
          프로필 설정
        </div>
        <div className="dropdown-item" onClick={onLogout}>
          <img
            src="/assets/icons/logout.svg"
            alt="로그아웃"
            className="dropdown-icon-img"
          />
          로그아웃
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
