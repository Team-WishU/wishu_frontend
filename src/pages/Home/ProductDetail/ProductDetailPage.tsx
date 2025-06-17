import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../../components/Header/Header";
import "../../../styles/ProductDetailPage.css";

const API_BASE = process.env.REACT_APP_API_URL;

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [currentUserNickname, setCurrentUserNickname] = useState<string | null>(
    localStorage.getItem("nickname")
  );

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

  useEffect(() => {
    const fetchNickname = async () => {
      if (!localStorage.getItem("nickname")) {
        try {
          const token = localStorage.getItem("accessToken");
          const res = await axios.get(`${API_BASE}/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          localStorage.setItem("nickname", res.data.nickname);
          setCurrentUserNickname(res.data.nickname);
        } catch (err) {
          console.error("닉네임 불러오기 실패", err);
        }
      }
    };

    fetchNickname();
    fetchProduct();
  }, [id]);

  const handleAddComment = async () => {
    if (!commentText.trim()) return alert("댓글을 입력해주세요");

    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.post(
        `${API_BASE}/products/${id}/comments`,
        { text: commentText },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProduct(res.data);
      setCommentText("");
    } catch (err) {
      console.error("댓글 등록 실패", err);
      alert("댓글 등록에 실패했습니다.");
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (!product) return <div>상품을 찾을 수 없습니다.</div>;

  const avatarSrc = product.uploadedBy?.profileImage?.includes("/assets")
    ? product.uploadedBy.profileImage
    : `/assets/images/Signup/${
        product.uploadedBy?.profileImage || "default.png"
      }`;

  const isMyPost = product.uploadedBy?.nickname === currentUserNickname;

  return (
    <div>
      <Header />
      <div className="product-detail-container">
        <div className="product-detail-inner">
          {/* 이미지 영역 */}
          <div className="product-image-section">
            <div className="category-hash">#{product.category}</div>
            <img
              src={product.imageUrl}
              alt="product"
              className="product-image"
            />
            <div className="product-writer">
              <img
                src={avatarSrc}
                alt="작성자"
                className="writer-avatar"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/assets/images/Signup/default.png";
                }}
              />
              <span className="writer-name">
                {product.uploadedBy?.nickname}
              </span>
            </div>
          </div>

          {/* 정보 영역 */}
          <div className="product-info-section">
            {isMyPost && (
              <div className="edit-button-wrapper">
                <button
                  className="black-button"
                  onClick={() => navigate(`/products/${product._id}/edit`)}
                >
                  수정
                </button>
              </div>
            )}

            <h1 className="product-brand">{product.brand}</h1>
            <hr className="divider" />
            <h1 className="product-title">{product.title}</h1>
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
                onClick={async () => {
                  const confirm = window.confirm("상품을 담으시겠습니까?");
                  if (!confirm) return;

                  try {
                    const token = localStorage.getItem("accessToken");
                    await axios.post(
                      `${API_BASE}/products/${id}/save`,
                      {},
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );
                    alert("상품이 담겼습니다!");
                  } catch (err) {
                    console.error("찜하기 실패:", err);
                    alert("상품 담기에 실패했습니다. 다시 시도해주세요.");
                  }
                }}
              >
                상품 담기
              </button>
              {product.productUrl && (
                <button
                  className="black-button"
                  onClick={() => window.open(product.productUrl, "_blank")}
                >
                  사이트 방문
                </button>
              )}
            </div>

            {/* 댓글 영역 */}
            <div className="comment-section">
              <p className="comment-title">어떠셨나요?</p>

              <div className="comment-input-wrapper">
                <input
                  type="text"
                  placeholder="댓글을 추가하고 대화를 시작하세요."
                  className="comment-input"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddComment();
                  }}
                />
                <img
                  src="/assets/images/productdetail/enter.png"
                  alt="입력"
                  className="comment-send-icon"
                  onClick={handleAddComment}
                  style={{ cursor: "pointer" }}
                />
              </div>

              <p className="comment-count">
                댓글 {product.comments?.length || 0}개
              </p>

              <div className="comment-list-scroll">
                {product.comments?.map((comment: any, idx: number) => {
                  const profileSrc = comment.profileImage?.includes("/assets")
                    ? comment.profileImage
                    : `/assets/images/Signup/${
                        comment.profileImage || "default.png"
                      }`;
                  return (
                    <div className="comment-item" key={idx}>
                      <img
                        src={profileSrc}
                        alt="user"
                        className="comment-avatar"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/assets/images/Signup/default.png";
                        }}
                      />
                      <p className="comment-text">
                        <strong>{comment.nickname}</strong> {comment.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
