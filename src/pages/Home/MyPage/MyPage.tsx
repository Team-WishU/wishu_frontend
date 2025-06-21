import React, { useState, useEffect } from "react";
import Header from "../../../components/Header/Header";
import MyWishlist from "./MyWishlist";
import MyProducts from "./MyProducts";
import { useUser } from "../../../context/UserContext"; // ✅ 추가
import "../../../styles/Mypage/MyPage.css";

const MyPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"wishlist" | "products">("wishlist");
  const { user } = useUser(); // ✅ 유저 정보 가져오기

  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, []);

  const avatarSrc = user?.avatar?.includes("/assets") ? user.avatar : `/assets/images/Signup/${user?.avatar || "default.png"}`;

  return (
    <div className="mypage-container">
      <Header />

      <div className="mypage-header">
        <div className="mypage-profile">
          <img
            src={avatarSrc}
            alt="프로필"
            className="mypage-avatar"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/assets/images/Signup/default.png";
            }}
          />
          <div className="mypage-username">{user?.name || "사용자"}</div>
        </div>

        <div className="mypage-tabs">
          <button className={`tab-button ${selectedTab === "wishlist" ? "active" : ""}`} onClick={() => setSelectedTab("wishlist")}>
            위시템
          </button>
          <button className={`tab-button ${selectedTab === "products" ? "active" : ""}`} onClick={() => setSelectedTab("products")}>
            내 피드
          </button>
        </div>
      </div>

      <div className="mypage-content">{selectedTab === "wishlist" ? <MyWishlist /> : <MyProducts />}</div>
    </div>
  );
};

export default MyPage;
