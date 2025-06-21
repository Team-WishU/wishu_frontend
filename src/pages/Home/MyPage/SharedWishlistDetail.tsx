import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../styles/Mypage/SharedWishlistDetail.css";

const API_BASE = process.env.REACT_APP_API_URL;

interface UserSimple {
  _id: string;
  nickname: string;
  profileImage: string;
}

interface Product {
  _id: string;
  imageUrl: string;
  title: string;
  brand: string;
  price: number;
  uploadedBy: UserSimple;
}

interface SharedBucket {
  _id?: string;
  bucketId?: string;
  title?: string;
  collaborators: UserSimple[];
  items: Product[];
}

interface Comment {
  userId: string;
  nickname: string;
  profileImage: string;
  text: string;
  createdAt: string;
}

interface SharedWishlistDetailProps {
  bucket: SharedBucket;
  onBack: () => void;
}

// 프사 경로 핸들러
const getProfileImage = (url?: string) => {
  if (!url) return "/assets/images/default.png";
  if (url.startsWith("http")) return url;
  if (url.startsWith("/uploads")) return `${API_BASE}${url}`;
  if (url.startsWith("/assets")) return url;
  return `/assets/images/Signup/${url}`;
};

const SharedWishlistDetail: React.FC<SharedWishlistDetailProps> = ({
  bucket,
  onBack,
}) => {
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);

  const myId = localStorage.getItem("userId") ?? "";
  const token = localStorage.getItem("accessToken");
  const bucketId = bucket._id || bucket.bucketId;

  // 댓글 불러오기
  const fetchComments = async () => {
    if (!bucketId) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `${API_BASE}/shared-buckets/${bucketId}/comments`
      );
      setComments(res.data);
    } catch {
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line
  }, [bucketId]);

  // 댓글 등록
  const handleSend = async () => {
    if (!comment.trim() || !bucketId) return;
    try {
      await axios.post(
        `${API_BASE}/shared-buckets/${bucketId}/comment`,
        { text: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComment("");
      fetchComments();
    } catch {
      alert("댓글 등록 실패");
    }
  };

  // 상대방 닉네임만 추출
  const getOtherNicknames = () =>
    (bucket.collaborators || [])
      .filter((u) => u._id !== myId)
      .map((u) => u.nickname)
      .join(", ");

  return (
    <div className="shared-wishlist-detail-container">
      {/* 좌측: 타이틀/아이템 */}
      <div className="shared-wishlist-left">
        <div className="shared-wishlist-title-row">
          <span className="shared-wishlist-title">
            {getOtherNicknames()}
            <span style={{ color: "#222", fontWeight: 500 }}> 님과의 위시템</span>
          </span>
          <button className="shared-wishlist-edit-btn" onClick={onBack}>
            돌아가기
          </button>
        </div>
        <div className="shared-wishlist-items-grid">
          {bucket.items.map((item) => (
            <div key={item._id} className="shared-wishlist-item-card">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="shared-wishlist-item-image"
              />
              <div className="shared-wishlist-item-owner">
                <img
                  src={getProfileImage(item.uploadedBy.profileImage)}
                  alt={item.uploadedBy.nickname}
                  className="shared-wishlist-item-avatar"
                  onError={e =>
                    ((e.target as HTMLImageElement).src = "/assets/images/default.png")
                  }
                />
                <span className="shared-wishlist-item-nickname">{item.uploadedBy.nickname}</span>
              </div>
              <div style={{ marginTop: 6, fontWeight: 700 }}>{item.title}</div>
              <div style={{ fontSize: 15 }}>{item.brand}</div>
              <div style={{ color: "#8e4ffb" }}>{item.price?.toLocaleString()}원</div>
            </div>
          ))}
        </div>
      </div>
      {/* 우측: 댓글 */}
      <div className="shared-comment-container">
        <div className="shared-comment-title">공유 댓글</div>
        <div className="shared-comment-list">
          {loading ? (
            <div style={{ color: "#aaa", padding: 16 }}>로딩중...</div>
          ) : (
            comments.map((c, idx) => (
              <div key={c.createdAt + c.text + idx} className="shared-comment-item">
                <img
                  src={getProfileImage(c.profileImage)}
                  alt={c.nickname}
                  className="shared-comment-avatar"
                  onError={e =>
                    ((e.target as HTMLImageElement).src = "/assets/images/default.png")
                  }
                />
                <b className="shared-comment-username">{c.nickname}</b>
                <span className="shared-comment-text">{c.text}</span>
              </div>
            ))
          )}
        </div>
        <div className="shared-comment-input-row">
          <input
            className="shared-comment-input"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            placeholder="대화를 시작하세요."
          />
          <button
            className="shared-comment-send-btn"
            onClick={handleSend}
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharedWishlistDetail;
