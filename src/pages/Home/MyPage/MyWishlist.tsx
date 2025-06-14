import React, { useState } from "react";
import "../../../styles/Mypage/MyWishlist.css";
import CategoryDetail from "./CategoryDetail"; // 추가
import WishlistDetail from "./WishlistDetail";
interface WishlistCategory {
  name: string;
  count: number;
  images: string[];
}

const initialWishlistData: WishlistCategory[] = [
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

const MyWishlist: React.FC = () => {
  const [wishlistData, setWishlistData] = useState<WishlistCategory[]>(initialWishlistData);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<WishlistCategory | null>(null);

  const handleDelete = (categoryName: string) => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (confirmDelete) {
      setWishlistData((prev) => prev.filter((item) => item.name !== categoryName));
    }
  };

  if (selectedCategory) {
    return (
      <WishlistDetail
        category={selectedCategory.name}
        images={selectedCategory.images}
        onBack={() => setSelectedCategory(null)}
        onDelete={() => {
          setWishlistData((prev) => prev.filter((item) => item.name !== selectedCategory.name));
          setSelectedCategory(null);
        }}
      />
    );
  }

  return (
    <div className="wishlist-container-wishlist">
      <div className="wishlist-header-wishlist">
        <div className="wishlist-title-wishlist">{wishlistData.length}개의 위시템</div>
        <div className="wishlist-actions-wishlist">
          <button className="create-button-wishlist" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "완료" : "편집"}
          </button>
        </div>
      </div>

      <div className="wishlist-grid-wishlist">
        {wishlistData.map((item) => (
          <div key={item.name} className="wishlist-card-wishlist">
            <div className="wishlist-image-wrapper-wishlist">
              {item.images.map((src, idx) => (
                <div
                  key={idx}
                  className="wishlist-image-box-wishlist"
                  onClick={() => !isEditing && setSelectedCategory(item)}
                  style={{ cursor: isEditing ? "default" : "pointer" }}
                >
                  <img src={src} alt={`${item.name}-${idx}`} className="wishlist-image-multi-wishlist" />
                  {isEditing && idx === item.images.length - 1 && (
                    <img
                      src="/assets/images/delete.png"
                      alt="삭제 아이콘"
                      className="delete-icon-wishlist"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.name);
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="wishlist-name-wishlist">{item.name}</div>
            <div className="wishlist-count-wishlist">위시템 {item.count}개</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWishlist;
