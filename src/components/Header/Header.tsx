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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [realName, setRealName] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    avatar: "",
  });

  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const avatarBasePath = "/assets/images/Signup/";

  // 로그인 상태 유지
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      const parsed = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setUserInfo({
        name: parsed.nickname || parsed.name || "",
        email: parsed.email,
        avatar: parsed.profileImage
          ? `${avatarBasePath}${parsed.profileImage}`
          : "",
      });
    }
  }, []);

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
        <div className="logo-container" onClick={() => navigate("/")}> 
          <img src="/assets/icons/logo.png" alt="WishU Logo" />
          <span className="logo-text">WishU</span>
        </div>
        <div className="search-container">
          <input type="text" placeholder="아이템 검색" />
          <img src="/assets/icons/search.svg" alt="Search Icon" />
        </div>

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
                <div className="profile-circle">
                  {userInfo.avatar ? (
                    <img
                      src={userInfo.avatar}
                      alt="avatar"
                      className="avatar-img"
                      style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                    />
                  ) : null}
                </div>
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
                    setIsLoggedIn(false);
                    setIsMenuOpen(false);
                    setUserInfo({ name: "", email: "", avatar: "" });
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSwitchToSignup={() => {
          setLoginModalOpen(false);
          setSignupModalOpen(true);
        }}
        onLoginSuccess={() => {
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUserInfo({
              name: parsed.nickname || parsed.name || "",
              email: parsed.email,
              avatar: parsed.profileImage
                ? `${avatarBasePath}${parsed.profileImage}`
                : "",
            });
          }
          setLoginModalOpen(false);
          setIsLoggedIn(true);
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
        setEmail={setEmail}
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
        setPassword={setPassword}
      />

      <SignupProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        onSubmit={(name, birthValue, genderValue) => {
          setRealName(name);
          setBirth(birthValue);
          setGender(genderValue);
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
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUserInfo({
              name: parsed.nickname || parsed.name || "",
              email: parsed.email,
              avatar: parsed.profileImage
                ? `${avatarBasePath}${parsed.profileImage}`
                : "",
            });
          }
          setAvatarOpen(false);
          setIsLoggedIn(true);
          alert("회원가입 완료!");
        }}
        onSwitchToLogin={() => {
          setAvatarOpen(false);
          setLoginModalOpen(true);
        }}
        email={email}
        password={password}
        realName={realName}
        birth={birth}
        gender={gender}
      />
    </header>
  );
};

export default Header;
