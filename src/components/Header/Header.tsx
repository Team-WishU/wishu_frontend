import React from "react";
import logo from "../../assets/icons/logo.png";
import searchIcon from "../../assets/icons/search.png";
import "../../styles/Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-inner">
        {/* 왼쪽: 로고와 텍스트 */}
        <div className="logo-container">
          <img src={logo} alt="WishU Logo" />
          <span className="logo-text">WishU</span>
        </div>

        {/* 가운데: 검색창 */}
        <div className="search-container">
          <input type="text" placeholder="아이템 검색" />
          <img src={searchIcon} alt="Search Icon" />
        </div>

        {/* 오른쪽: 프로필 */}
        <div className="profile-container">
          <div className="profile-circle" />
          <span>예콩</span>
          <span>▾</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
