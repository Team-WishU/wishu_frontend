import React, { useState } from "react";
import "../../../styles/Mypage/CategoryDetail.css";

interface Props {
  category: string;
  images: string[];
  onBack: () => void;
  onDelete: (imageIndex: number) => void;
}

const CategoryDetail: React.FC<Props> = ({ category, images, onBack, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="wishlist-container-category">
      <div className="wishlist-header-category">
        <div className="wishlist-title-category">6개의 위시템</div>
        <div className="wishlist-actions-category">
          <button
            className="create-button-category"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "완료" : "편집"}
          </button>
          <button
            className="back-button-category"
            onClick={onBack}
          >
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
            />
            {isEditing && (
              <img
                src="/assets/images/delete.png"
                alt="삭제 아이콘"
                className="delete-icon-category"
                onClick={() => {
                  const ok = window.confirm("이 이미지를 삭제할까요?");
                  if (ok) onDelete(idx);
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDetail;
