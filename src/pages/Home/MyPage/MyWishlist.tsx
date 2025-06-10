import React from "react";
import "../../../styles/Mypage/MyWishlist.css";

interface WishlistCategory {
  name: string;
  count: number;
  images: string[];
}

const wishlistData: WishlistCategory[] = [
  {
    name: "상의",
    count: 10,
    images: [
      "/assets/images/productdetail/product2.png",
      "/assets/images/productdetail/product3.png",
    ],
  },
  {
    name: "하의",
    count: 10,
    images: [
      "/assets/images/productdetail/product2.png",
      "/assets/images/productdetail/product3.png",
    ],
  },
  {
    name: "신발",
    count: 10,
    images: ["/assets/images/productdetail/product2.png"],
  },
  {
    name: "액세서리",
    count: 10,
    images: [
      "/assets/images/productdetail/product2.png",
      "/assets/images/productdetail/product3.png",
    ],
  },
  {
    name: "폰케이스",
    count: 10,
    images: [
      "/assets/images/productdetail/product2.png",
      "/assets/images/productdetail/product3.png",
      "/assets/images/productdetail/product4.png",
    ],
  },
];

const MyWishlist: React.FC = () => {
  return (
    <div className="wishlist-wrapper">
      <div className="wishlist-header">
        <div className="wishlist-title">{wishlistData.length}개의 위시템</div>
        <div className="wishlist-actions">
          <button className="create-button">편집</button>
        </div>
      </div>

      <div className="wishlist-grid">
        {wishlistData.map((item) => (
          <div key={item.name} className="wishlist-card">
            <div className="wishlist-image-wrapper">
              {item.images.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`${item.name}-${idx}`}
                  className="wishlist-image-multi"
                />
              ))}
            </div>
            <div className="wishlist-name">{item.name}</div>
            <div className="wishlist-count">위시템 {item.count}개</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWishlist;