import React, { useState } from "react";
import Header from "../../../components/Header/Header";
import MyWishlist from "./MyWishlist";
import MyProducts from "./MyProducts";
import "../../../styles/Mypage/MyPage.css";

const MyPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"wishlist" | "products">("wishlist");

  return (
    <div className="mypage-container">
      <Header />

      <div className="mypage-header">
        <div className="mypage-profile">
          <img src="/assets/images/productdetail/user1.png" alt="프로필" className="mypage-avatar" />
          <div className="mypage-username">빨간사과</div>
        </div>

        <div className="mypage-tabs">
          <button
            className={`tab-button ${selectedTab === "wishlist" ? "active" : ""}`}
            onClick={() => setSelectedTab("wishlist")}
          >
            위시템
          </button>
          <button
            className={`tab-button ${selectedTab === "products" ? "active" : ""}`}
            onClick={() => setSelectedTab("products")}
          >
            내 피드
          </button>
        </div>
      </div>

      <div className="mypage-content">
        {selectedTab === "wishlist" ? <MyWishlist /> : <MyProducts />}
      </div>
    </div>
  );
};

export default MyPage;
