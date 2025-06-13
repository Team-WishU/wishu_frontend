import React, { useState } from "react";
import "../../../styles/Mypage/MyProducts.css";
import { useNavigate } from "react-router-dom";
import CategoryDetail from "./CategoryDetail";

interface WishlistCategory2 {
  name: string;
  count: number;
  images: string[];
}

const initialWishlistData2: WishlistCategory2[] = [
  {
    name: "상의",
    count: 10,
    images: ["/assets/images/productdetail/product2.png", "/assets/images/productdetail/product3.png"],
  },
  {
    name: "하의",
    count: 10,
    images: ["/assets/images/productdetail/product2.png", "/assets/images/productdetail/product3.png"],
  },
  {
    name: "신발",
    count: 10,
    images: ["/assets/images/productdetail/product2.png"],
  },
  {
    name: "액세서리",
    count: 10,
    images: ["/assets/images/productdetail/product2.png", "/assets/images/productdetail/product3.png"],
  },
  {
    name: "폰케이스",
    count: 10,
    images: ["/assets/images/productdetail/product2.png", "/assets/images/productdetail/product3.png", "/assets/images/productdetail/product4.png"],
  },
];

const MyProducts: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [wishlistData, setWishlistData] = useState(initialWishlistData2);
  const [selectedCategory, setSelectedCategory] = useState<WishlistCategory2 | null>(null);

  const handleDeleteImage = (imgIdx: number) => {
    if (!selectedCategory) return;
    const updated = wishlistData.map((item) =>
      item.name === selectedCategory.name
        ? { ...item, images: item.images.filter((_, i) => i !== imgIdx) }
        : item
    );
    setWishlistData(updated);
  };

  if (selectedCategory) {
    return (
      <CategoryDetail
        category={selectedCategory.name}
        images={selectedCategory.images}
        onBack={() => setSelectedCategory(null)}
        onDelete={handleDeleteImage}
      />
    );
  }

  return (
    <div className="product-container">
      <div className="product-header">
        <div className="product-title">{wishlistData.length}개의 위시템</div>
        <div className="product-actions">
          <button className="product-button" onClick={() => navigate("/ProductDetail/addproducts")}>+ 위시템 작성</button>
          <button className="product-button" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "완료" : "편집"}
          </button>
        </div>
      </div>

      <div className="product-grid">
        {wishlistData.map((item) => (
          <div key={item.name} className="product-card">
            <div className="product-image-wrapper">
              {item.images.slice(0, 3).map((src, idx) => (
                <div
                  key={idx}
                  className="product-image-box"
                  onClick={() => !isEditing && setSelectedCategory(item)}
                  style={{ cursor: isEditing ? "default" : "pointer" }}
                >
                  <img src={src} alt={`${item.name}-${idx}`} className="product-image" />
                </div>
              ))}
            </div>
            <div className="product-name">{item.name}</div>
            <div className="product-count">위시템 {item.count}개</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
