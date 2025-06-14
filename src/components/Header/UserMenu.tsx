import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "../../styles/UserMenu.css";

const UserMenu: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, withdraw } = useUser();
  const handleLogout = () => {
    logout();
    alert("로그아웃이 완료되었어요. 다음에 또 만나요!");
    navigate("/");
  };
  const handleWithdraw = async () => {
    if (!window.confirm("정말로 회원 탈퇴하시겠어요? 모든 데이터가 삭제돼요."))
      return;

    try {
      await withdraw(); // 모든 작업 수행
      alert("회원 탈퇴가 완료되었어요. 그동안 이용해 주셔서 감사합니다.");
      navigate("/");
    } catch (err) {}
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
        <div
          className="dropdown-item"
          onClick={() => navigate("/profile-setting")}
        >
          <img
            src="/assets/icons/settings.svg"
            alt="설정"
            className="dropdown-icon-img"
          />
          프로필 설정
        </div>
        <div className="dropdown-item" onClick={handleLogout}>
          <img
            src="/assets/icons/logout.svg"
            alt="로그아웃"
            className="dropdown-icon-img"
          />
          로그아웃
        </div>
        <div className="dropdown-item" onClick={handleWithdraw}>
          <img
            src="/assets/icons/out.svg"
            alt="회원탈퇴"
            className="dropdown-icon-img"
          />
          회원탈퇴
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
