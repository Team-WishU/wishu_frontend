import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../../components/Header/Header";
import "../../../styles/ProductDetailPage.css";

const API_BASE = process.env.REACT_APP_API_URL;

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_BASE}/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("상품 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (!product) return <div>상품을 찾을 수 없습니다.</div>;

  return (
    <div>
      <Header />
      <div className="product-detail-container">
        <div className="product-detail-inner">
          {/* 이미지 영역 */}
          <div className="product-image-section">
            <div className="category-hash">#{product.category}</div>
            <img src={product.imageUrl} alt="product" className="product-image" />
            <div className="product-writer">
              <img src={product.uploadedBy?.profileImage} alt="작성자" className="writer-avatar" />
              <span className="writer-name">{product.uploadedBy?.nickname}</span>
            </div>
          </div>

          {/* 정보 영역 */}
          <div className="product-info-section">
            <h1 className="product-title">{product.title}</h1>
            <hr className="divider" />
            <p className="product-desc">{product.description || ""}</p>
            <p className="product-price">{product.price.toLocaleString()}원</p>
            <hr className="divider" />

            <div className="product-tags">
              {product.tags?.map((tag: string, idx: number) => (
                <span key={idx}>#{tag}</span>
              ))}
            </div>

            <div className="product-buttons">
              <button
                className="black-button"
                onClick={() => {
                  if (window.confirm("상품을 담으시겠습니까?")) {
                    alert("상품이 담겼습니다!");
                  }
                }}
              >
                상품 담기
              </button>
              <button className="black-button" onClick={() => window.open(product.productUrl, "_blank")}>
                사이트 방문
              </button>
            </div>

            <div className="comment-section">
              <p className="comment-title">어떠셨나요?</p>

              <div className="comment-input-wrapper">
                <input type="text" placeholder="댓글을 추가하고 대화를 시작하세요." className="comment-input" />
                <img src="/assets/images/productdetail/enter.png" alt="입력" className="comment-send-icon" />
              </div>

              <p className="comment-count">댓글 {product.comments?.length || 0}개</p>

              {product.comments?.map((comment: any, idx: number) => (
                <div className="comment-item" key={idx}>
                  <img src={comment.profileImage} alt="user" className="comment-avatar" />
                  <p className="comment-text">
                    <strong>{comment.nickname}</strong> {comment.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
