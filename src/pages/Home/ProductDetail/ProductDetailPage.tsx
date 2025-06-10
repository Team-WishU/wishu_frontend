import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header/Header";
import "../../../styles/ProductDetailPage.css";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <Header />
      <div className="product-detail-container">
        <div className="product-detail-inner">
          <div className="product-image-section">
            <div className="category-hash">#신발</div>
            <img
              src="https://via.placeholder.com/400x400.png?text=Product+Image"
              alt="product"
              className="product-image"
            />
            <div className="product-writer">
              <img
                src="https://via.placeholder.com/24"
                alt="user"
                className="writer-avatar"
              />
              <span className="writer-name">빨간사과</span>
            </div>
          </div>

          <div className="product-info-section">
            <h1 className="product-title">ZARA</h1>
            <p className="product-desc">
              자라 6센치 스포츠 발레리나 플랫폼슈즈
            </p>
            <p className="product-price">69,900원</p>
            <div className="product-tags">
              <span>#캐주얼</span>
              <span>#페미닌</span>
            </div>

            <div className="product-buttons">
              <button className="black-button">상품 담기</button>
              <button className="black-button">사이트 방문</button>
            </div>

            <div className="comment-section">
              <p className="comment-title">어떠셨나요?</p>
              <input
                type="text"
                placeholder="댓글을 추가하고 대화를 시작하세요."
                className="comment-input"
              />
              <p className="comment-count">댓글 4개</p>
              <p className="comment-item">민 우와 역덕게 한건가요</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
