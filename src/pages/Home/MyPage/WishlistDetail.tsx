import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/Mypage/CategoryDetail.css";

interface Props {
  category: string;
  images: string[];
  onBack: () => void;
  onDelete: (index: number) => void;
}

const WishlistDetail: React.FC<Props> = ({ category, images, onBack, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="wishlist-container-category">
      <div className="wishlist-header-category">
        <div className="wishlist-title-category">{images.length}개의 위시템</div>
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

      <div className="wishlist-grid-category">
        {images.map((src, idx) => (
          <div key={idx} className="wishlist-image-box-category">
            <img
              src={src}
              alt={`${category}-${idx}`}
              className="wishlist-image-category"
              onClick={() => {
                if (!isEditing) {
                  navigate(`/products/여기에-id값`); // ← id값이 있다면 넘기기
                }
              }}
              style={{ cursor: isEditing ? "default" : "pointer" }}
            />
            {isEditing && (
              <img
                src="/assets/images/delete.png"
                alt="삭제"
                className="delete-icon-category"
                onClick={() => {
                  if (window.confirm("삭제하시겠습니까?")) onDelete(idx);
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistDetail;
