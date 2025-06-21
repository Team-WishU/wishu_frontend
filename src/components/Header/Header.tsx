import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import LoginModal from "../../pages/Home/RegisterModal/LoginModal";
import SignupModal from "../../pages/Home/RegisterModal/SignupModal";
import SignupPasswordModal from "../../pages/Home/RegisterModal/SignupPasswordModal";
import SignupProfileModal from "../../pages/Home/RegisterModal/SignupProfileModal";
import SignupAvatarModal from "../../pages/Home/RegisterModal/SignupAvatarModal";
import { useUser } from "../../context/UserContext";
import api from "../../utils/axiosInstance";
import "../../styles/Header.css";

const Header: React.FC = () => {
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

  const [searchKeyword, setSearchKeyword] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, isLoggedIn, login, logout } = useUser();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !menuRef.current?.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest(".suggestions")
      ) {
        setIsMenuOpen(false);
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
      } catch (err: any) {
        if (err.response?.status === 404) {
          alert("계정이 존재하지 않아 자동 로그아웃됩니다.");
          logout();
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          window.dispatchEvent(new Event("userUpdated"));
        }
      }
    };

    if (isLoggedIn) verifyUser();
  }, [isLoggedIn, logout]);

  const defaultAvatar = "/assets/images/Signup/default.png";
  const avatarSrc = user.avatar?.includes("/assets")
    ? user.avatar
    : `/assets/images/Signup/${user.avatar || "default.png"}`;

  const handleSearch = () => {
    if (!searchKeyword.trim()) return;
    navigate(`/search?keyword=${encodeURIComponent(searchKeyword)}`);
    setShowSuggestions(false);
  };

  const fetchSuggestions = async (input: string) => {
    try {
      if (!input.trim()) {
        setSuggestions([]);
        return;
      }

      const res = await api.get(`/products/autocomplete?input=${input}`);
      setSuggestions(res.data); // ex: ["[브랜드] zara", "[태그] 힙합"]
      setShowSuggestions(true);
    } catch (err) {
      console.error("자동완성 에러:", err);
    }
  };

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo-container" onClick={() => navigate("/")}>
          <img src="/assets/icons/logo.png" alt="WishU Logo" />
          <span className="logo-text">WishU</span>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="아이템 검색"
            value={searchKeyword}
            onChange={(e) => {
              const value = e.target.value;
              setSearchKeyword(value);
              fetchSuggestions(value);
            }}
            onFocus={() => {
              if (suggestions.length > 0) setShowSuggestions(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <img
            src="/assets/icons/search.svg"
            alt="Search Icon"
            onClick={handleSearch}
            style={{ cursor: "pointer" }}
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((item, idx) => {
                const keywordOnly = item.replace(/^\[[^\]]+\]\s*/, ""); // [브랜드] 제거
                return (
                  <li
                    key={idx}
                    onClick={() => {
                      setSearchKeyword(keywordOnly);
                      setShowSuggestions(false);
                      navigate(
                        `/search?keyword=${encodeURIComponent(keywordOnly)}`
                      );
                    }}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          )}
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
                {/* 프로필사진 + 닉네임 둘 다 클릭 시 마이페이지 이동 */}
                <div
                  className="profile-circle"
                  onClick={() => navigate("/mypage")}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={avatarSrc}
                    alt="avatar"
                    className="avatar-img"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = defaultAvatar;
                    }}
                  />
                </div>
                <span
                  className="username"
                  onClick={() => navigate("/mypage")}
                  style={{ cursor: "pointer" }}
                >
                  {user.name}
                </span>
                {/* 드롭다운은 > 아이콘만 누를 때만 열림 */}
                <img
                  src="/assets/icons/Chevron_Down.svg"
                  alt="메뉴 열기"
                  className="chevron-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(!isMenuOpen);
                  }}
                  style={{ cursor: "pointer" }}
                />
              </div>
              {isMenuOpen && <UserMenu />}
            </div>
          )}
        </div>
      </div>

      {/* 모달들 */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSwitchToSignup={() => {
          setLoginModalOpen(false);
          setSignupModalOpen(true);
        }}
        onLoginSuccess={() => {
          setLoginModalOpen(false);
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
          alert("회원가입 완료!");
          setAvatarOpen(false);
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
