import React from "react";
import "../../../styles/Mypage/MyProducts.css";
import { useNavigate } from "react-router-dom";

interface WishlistCategory2 {
  name: string;
  count: number;
  images: string[]; // 최대 3장
}

const wishlistData2: WishlistCategory2[] = [
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

const MyProducts: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="wishlist-container-products">
      <div className="wishlist-header-products">
        <div className="wishlist-title-products">
          {wishlistData2.length}개의 위시템
        </div>
        <div className="wishlist-actions-products">
          <button
            className="create-button-products"
            onClick={() => navigate("/ProductDetail/addproducts")}
          >
            + 위시템 작성
          </button>
          <button className="create-button-products">편집</button>
        </div>
      </div>

      <div className="wishlist-grid-products">
        {wishlistData2.map((item) => (
          <div key={item.name} className="wishlist-card-products">
            <div className="wishlist-image-wrapper-products">
              {item.images.slice(0, 3).map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={item.name}
                  className="wishlist-image-multi-products"
                />
              ))}
            </div>
            <div className="wishlist-name-products">{item.name}</div>
            <div className="wishlist-count-products">위시템 {item.count}개</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
