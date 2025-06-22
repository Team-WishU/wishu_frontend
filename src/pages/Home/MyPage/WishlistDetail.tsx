import React, { useState } from "react";//수정
import { useNavigate } from "react-router-dom";
import Masonry from "react-masonry-css";
import { Product } from "./MyProducts";
import "../../../styles/Mypage/CategoryDetail.css";

interface Props {
  category: string;
  products: Product[];
  onBack: () => void;
  onDelete: (productId: string) => void;
}

const WishlistDetail: React.FC<Props> = ({ category, products, onBack, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    768: 2,
    480: 1,
  };

  return (
    <div className="wishlist-container-category">
      <div className="wishlist-header-category">
        <div className="wishlist-title-category">{products.length}개의 위시템</div>
        <div className="wishlist-actions-category">
          <button className="create-button-category" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "완료" : "편집"}
          </button>
          <button className="back-button-category" onClick={onBack}>
            돌아가기
          </button>
        </div>
      </div>

      <div className="category-hashtag">#{category}</div>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="wishlist-masonry-grid"
        columnClassName="wishlist-masonry-grid-column"
      >
        {products.map((product) => (
          <div key={product._id} className="wishlist-masonry-item">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="wishlist-image-category"
              onClick={() => {
                if (!isEditing) navigate(`/products/${product._id}`);
              }}
              style={{ cursor: isEditing ? "default" : "pointer" }}
            />
            {isEditing && (
              <img
                src="/assets/images/delete.png"
                alt="삭제"
                className="delete-icon-category"
                onClick={() => {
                  const confirm = window.confirm("이 위시템을 삭제할까요?");
                  if (confirm) onDelete(product._id);
                }}
              />
            )}
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default WishlistDetail;
