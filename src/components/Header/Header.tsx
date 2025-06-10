import React, { useState, useRef, useEffect } from "react";
import UserMenu from "./UserMenu";
import LoginModal from "../../pages/Home/ProductRegister/LoginModal";
import SignupModal from "../../pages/Home/ProductRegister/SignupModal";
import SignupPasswordModal from "../../pages/Home/ProductRegister/SignupPasswordModal";
import SignupProfileModal from "../../pages/Home/ProductRegister/SignupProfileModal";
import SignupAvatarModal from "../../pages/Home/ProductRegister/SignupAvatarModal";
import "../../styles/Header.css";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "예콩",
    email: "hihi@gmailll.com",
  });
  const navigate = useNavigate();

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header-inner">
        {/* 왼쪽: 로고 */}
        <div className="logo-container" onClick={() => navigate("/")}>
          <img src="/assets/icons/logo.png" alt="WishU Logo" />
          <span className="logo-text">WishU</span>
        </div>
        {/* 가운데: 검색 */}
        <div className="search-container">
          <input type="text" placeholder="아이템 검색" />
          <img src="/assets/icons/search.svg" alt="Search Icon" />
        </div>

        {/* 오른쪽: 로그인 또는 사용자 */}
        <div className="profile-container-wrapper" ref={menuRef}>
          {!isLoggedIn ? (
            <button
              onClick={() => setLoginModalOpen(true)}
              className="loginbtn"
            >
              로그인
            </button>
          ) : (
            <div className="profile-container">
              <div className="user-trigger">
                <div className="profile-circle" />
                <span className="username">{userInfo.name}</span>
                <img
                  src="/assets/icons/Chevron_Down.svg"
                  alt="메뉴 열기"
                  className="chevron-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(!isMenuOpen);
                  }}
                />
              </div>
              {isMenuOpen && (
                <UserMenu
                  userName={userInfo.name}
                  userEmail={userInfo.email}
                  onLogout={() => {
                    setIsLoggedIn(false); // 로그아웃 처리
                    setIsMenuOpen(false); // 드롭다운 닫기
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* 모달 컴포넌트들 */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSwitchToSignup={() => {
          setLoginModalOpen(false);
          setSignupModalOpen(true);
        }}
        onLoginSuccess={() => {
          setLoginModalOpen(false);
          setIsLoggedIn(true); // 로그인 상태 전환
        }}
      />

      <SignupModal
        isOpen={signupModalOpen}
        onClose={() => setSignupModalOpen(false)}
        onSwitchToLogin={() => {
          setSignupModalOpen(false);
          setLoginModalOpen(true);
        }}
        onNextToPassword={() => {
          setSignupModalOpen(false);
          setPasswordOpen(true);
        }}
      />

      <SignupPasswordModal
        isOpen={passwordOpen}
        onClose={() => setPasswordOpen(false)}
        onNextToProfile={() => {
          setPasswordOpen(false);
          setProfileOpen(true);
        }}
        onSwitchToLogin={() => {
          setPasswordOpen(false);
          setLoginModalOpen(true);
        }}
      />

      <SignupProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        onSubmit={() => {
          setProfileOpen(false);
          setAvatarOpen(true);
        }}
        onSwitchToLogin={() => {
          setProfileOpen(false);
          setLoginModalOpen(true);
        }}
      />

      <SignupAvatarModal
        isOpen={avatarOpen}
        onClose={() => setAvatarOpen(false)}
        onSubmit={() => {
          setAvatarOpen(false);
          setIsLoggedIn(true); // 회원가입 완료 후 로그인 상태로
          alert("회원가입 완료!");
        }}
        onSwitchToLogin={() => {
          setAvatarOpen(false);
          setLoginModalOpen(true);
        }}
      />
    </header>
  );
};

export default Header;
