import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header/Header";
import "../../../styles/ProductDetailPage.css";

// 더미 데이터
const dummyProducts = [
  {
    id: "1",
    title: "ZARA",
    description: "자라 6센치 스포츠 발레리나 플랫폼슈즈",
    price: "69,900원",
    category: "#신발",
    tags: ["#캐주얼", "#페미닌"],
    imageUrl: "/assets/images/productdetail/product1.png",
    siteUrl: "https://www.zara.com/kr/ko/woman-shoes-platforms-l5024.html",
    writer: {
      name: "빨간사과",
      avatar: "/assets/images/productdetail/user1.png",
    },
    comments: [
      {
        user: "민",
        text: "우와 역덕게 한건가요",
        avatar: "/assets/images/productdetail/user1.png",
      },
    ],
  },
  // 필요하면 더 추가 가능
];

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = dummyProducts.find((item) => item.id === id);

  if (!product) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <Header />
      <div className="product-detail-container">
        <div className="product-detail-inner">
          {/* 이미지 영역 */}
          <div className="product-image-section">
            <div className="category-hash">{product.category}</div>
            <img
              src={product.imageUrl}
              alt="product"
              className="product-image"
            />
            <div className="product-writer">
              <img
                src={product.writer.avatar}
                alt="user"
                className="writer-avatar"
              />
              <span className="writer-name">{product.writer.name}</span>
            </div>
          </div>

          {/* 정보 영역 */}
          <div className="product-info-section">
            <h1 className="product-title">{product.title}</h1>
            <hr className="divider" />
            <p className="product-desc">{product.description}</p>
            <p className="product-price">{product.price}</p>
            <hr className="divider" />

            <div className="product-tags">
              {product.tags.map((tag, idx) => (
                <span key={idx}>{tag}</span>
              ))}
            </div>

            <div className="product-buttons">
              <button
                className="black-button"
                onClick={() => {
                  const confirmAdd = window.confirm("상품을 담으시겠습니까?");
                  if (confirmAdd) alert("상품이 담겼습니다!");
                }}
              >
                상품 담기
              </button>
              <button
                className="black-button"
                onClick={() => window.open(product.siteUrl, "_blank")}
              >
                사이트 방문
              </button>
            </div>

            <div className="comment-section">
              <p className="comment-title">어떠셨나요?</p>

              <div className="comment-input-wrapper">
                <input
                  type="text"
                  placeholder="댓글을 추가하고 대화를 시작하세요."
                  className="comment-input"
                />
                <img
                  src="/assets/images/productdetail/enter.png"
                  alt="입력"
                  className="comment-send-icon"
                />
              </div>

              <p className="comment-count">댓글 {product.comments.length}개</p>

              {product.comments.map((comment, idx) => (
                <div className="comment-item" key={idx}>
                  <img
                    src={comment.avatar}
                    alt="user"
                    className="comment-avatar"
                  />
                  <p className="comment-text">
                    <strong>{comment.user}</strong> {comment.text}
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
