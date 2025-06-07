import React from "react";
import "../../styles/UserMenu.css";

interface Props {
  userName: string;
  userEmail: string;
}

const UserMenu: React.FC<Props> = ({ userName, userEmail }) => {
  return (
    <div className="dropdown-menu">
      <div className="dropdown-section">
        <div className="dropdown-name">{userName}</div>
        <div className="dropdown-email-line">
          <span className="dropdown-email-label">Email</span>
          <span className="dropdown-email">{userEmail}</span>
        </div>
        <div className="dropdown-link">내 위시템 &gt;</div>
      </div>

      <hr />

      <div className="dropdown-section">
        <div className="dropdown-item">
          <img src="/assets/icons/settings.svg" alt="설정" className="dropdown-icon-img" />
          프로필 설정
        </div>
        <div className="dropdown-item">
          <img src="/assets/icons/logout.svg" alt="로그아웃" className="dropdown-icon-img" />
          로그아웃
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
