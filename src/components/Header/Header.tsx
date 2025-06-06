import React, { useState, useRef, useEffect } from "react";
import UserMenu from "./UserMenu";
import "../../styles/Header.css";

const Header: React.FC = () => {
  const isLoggedIn = true;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        <div className="logo-container">
          <img src="/assets/icons/logo.png" alt="WishU Logo" />
          <span className="logo-text">WishU</span>
        </div>

        {/* 가운데: 검색 */}
        <div className="search-container">
          <input type="text" placeholder="아이템 검색" />
          <img src="/assets/icons/search.svg" alt="Search Icon" />
        </div>

        <div className="profile-container-wrapper" ref={menuRef}>
          <div className="profile-container">
            <div className="user-trigger">
              <div className="profile-circle" />
              <span className="username">예콩</span>
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
            {isMenuOpen && <UserMenu userName="예콩" userEmail="hihi@gmailll.com" />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
