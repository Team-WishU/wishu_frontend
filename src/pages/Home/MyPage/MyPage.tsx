import React, { useState, useEffect } from "react";
import Header from "../../../components/Header/Header";
import MyWishlist from "./MyWishlist";
import MyProducts from "./MyProducts";
import MySharedWishlist from "./MySharedWishlist";
import MyFriends from "./MyFriends";
import { useUser } from "../../../context/UserContext";
import "../../../styles/Mypage/MyPage.css";

const MyPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"wishlist" | "products" | "shared" | "friends">("wishlist");
  const [selectedBucket, setSelectedBucket] = useState<any>(null); // 공유 버킷 상태 추가
  const { user } = useUser();

  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, []);

  const avatarSrc = user?.avatar?.includes("/assets")
    ? user.avatar
    : `/assets/images/Signup/${user?.avatar || "default.png"}`;

  // 친구 탭에서 공유 버튼 클릭 시 호출
  const handleGoSharedWishlist = (bucket: any) => {
    setSelectedBucket(bucket);
    setSelectedTab("shared");
  };

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
          <button
            className={`tab-button ${selectedTab === "shared" ? "active" : ""}`}
            onClick={() => {
              setSelectedTab("shared");
              setSelectedBucket(null); // 공유위시 직접 클릭시 상세로 안감!
            }}
          >
            공유위시
          </button>
          <button
            className={`tab-button ${selectedTab === "friends" ? "active" : ""}`}
            onClick={() => setSelectedTab("friends")}
          >
            친구목록
          </button>
        </div>
      </div>

      <div className="mypage-content">
        {selectedTab === "wishlist" && <MyWishlist />}
        {selectedTab === "products" && <MyProducts />}
        {selectedTab === "shared" && (
          <MySharedWishlist selectedBucketFromFriend={selectedBucket} />
        )}
        {selectedTab === "friends" && (
          <MyFriends onGoSharedWishlist={handleGoSharedWishlist} />
        )}
      </div>
    </div>
  );
};

export default MyPage;