import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { useUser } from '../../../context/UserContext';
import '../../../styles/Mypage/SharedWishlistDetail.css';

const API_BASE = process.env.REACT_APP_API_URL || '';

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

const getProfileImage = (url?: string) => {
  if (!url) return '/assets/images/default.png';
  if (url.startsWith('http')) return url;
  if (url.startsWith('/uploads')) return `${API_BASE}${url}`;
  if (url.startsWith('/assets')) return url;
  return `/assets/images/Signup/${url}`;
};

const SharedWishlistDetail: React.FC<SharedWishlistDetailProps> = ({
  bucket,
  onBack,
}) => {
  const { user, isLoggedIn } = useUser();
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState<string | null>(null);

  const bucketId = bucket._id || bucket.bucketId;

  const socketRef = useRef<any>(null);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!bucketId || !user._id || !user.nickname) return;

    const socket = io(API_BASE, {
      transports: ['websocket'],
      withCredentials: true,
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('소켓 연결 성공!');
    });

    socket.emit('joinRoom', { bucketId });

    setLoading(true);
    fetch(`${API_BASE}/shared-buckets/${bucketId}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));

    socket.on('newMessage', (msg: Comment) => {
      setComments((prev) => [...prev, msg]);
    });

    socket.on('showTyping', ({ nickname }) => {
      if (nickname !== user.nickname) {
        setIsTyping(nickname);
        if (typingTimeout.current) clearTimeout(typingTimeout.current);
        typingTimeout.current = setTimeout(() => setIsTyping(null), 2000);
      }
    });

    return () => {
      socket.disconnect();
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
    };
  }, [bucketId, user._id, user.nickname]);

  // ✅ userId만 서버로!
  const handleSend = () => {
    if (
      !comment.trim() ||
      !bucketId ||
      !socketRef.current ||
      !user._id
    )
      return;
    socketRef.current.emit('sendMessage', {
      bucketId,
      userId: user._id,
      text: comment,
    });
    setComment('');
  };

  // 입력중 감지 → 서버로 typing 이벤트 전송
  const handleTyping = () => {
    if (
      socketRef.current &&
      bucketId &&
      user.nickname
    ) {
      socketRef.current.emit('typing', {
        bucketId,
        user: { nickname: user.nickname },
      });
    }
  };

  // 내 닉네임 제외
  const getOtherNicknames = () =>
    (bucket.collaborators || [])
      .filter((u) => u._id !== user._id)
      .map((u) => u.nickname)
      .join(', ');

  // 🔥 댓글(채팅) 유저 정보 안전하게 collaborators에서 찾아서 표시!
  const getCommentUser = (userId: string) =>
    bucket.collaborators?.find((u) => u._id === userId);
{console.log('🔥 상태확인:', { isLoggedIn, user })}

  return (
    <div className="shared-wishlist-detail-container">
      <div className="shared-wishlist-left">
        <div className="shared-wishlist-title-row">
          <span className="shared-wishlist-title">
            {getOtherNicknames()}
            <span style={{ color: '#222', fontWeight: 500 }}> 님과의 위시템</span>
          </span>
          <button className="shared-wishlist-edit-btn" onClick={onBack}>
            돌아가기
          </button>
        </div>
        <div className="shared-wishlist-items-grid">
          {(bucket.items || []).length === 0 && (
            <div style={{ color: '#aaa', padding: 30, textAlign: 'center' }}>
              아직 상품이 없습니다.
            </div>
          )}
          {(bucket.items || []).map((item) => {
            const owner =
              bucket.collaborators.find((u) => u._id === item.uploadedBy?._id) ||
              item.uploadedBy;
            return (
              <div key={item._id} className="shared-wishlist-item-card">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="shared-wishlist-item-image"
                />
                <div className="shared-wishlist-item-owner">
                  <img
                    src={getProfileImage(owner?.profileImage)}
                    alt={owner?.nickname}
                    className="shared-wishlist-item-avatar"
                    onError={(e) =>
                      ((e.target as HTMLImageElement).src = '/assets/images/default.png')
                    }
                  />
                  <span className="shared-wishlist-item-nickname">
                    {owner?.nickname}
                  </span>
                </div>
                <div style={{ marginTop: 6, fontWeight: 700 }}>{item.title}</div>
                <div style={{ fontSize: 15 }}>{item.brand}</div>
                <div style={{ color: '#8e4ffb' }}>
                  {item.price?.toLocaleString()}원
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="shared-comment-container">
        <div className="shared-comment-title">공유 채팅</div>
        <div className="shared-comment-list">
          {loading ? (
            <div style={{ color: '#aaa', padding: 16 }}>로딩중...</div>
          ) : (
            <>
              {(comments || []).map((c, idx) => {
                const cu = getCommentUser(c.userId) || c; // 만약 서버가 nickname/proifleImage도 보내주면 fallback
                return (
                  <div key={c.createdAt + c.text + idx} className="shared-comment-item">
                    <img
                      src={getProfileImage(cu.profileImage)}
                      alt={cu.nickname}
                      className="shared-comment-avatar"
                      onError={(e) =>
                        ((e.target as HTMLImageElement).src = '/assets/images/default.png')
                      }
                    />
                    <b className="shared-comment-username">{cu.nickname}</b>
                    <span className="shared-comment-text">{c.text}</span>
                  </div>
                );
              })}
              {isTyping && (
                <div style={{ color: '#aaa', padding: '5px 12px' }}>
                  {isTyping}님이 채팅을 입력중...
                </div>
              )}
            </>
          )}
        </div>
        
        <div className="shared-comment-input-row">
          <input
            className="shared-comment-input"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              handleTyping();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder={isLoggedIn ? "대화를 시작하세요." : "로그인 후 채팅 가능"}
            
            disabled={!isLoggedIn || !user._id || !user.nickname}
          />
          <button
            className="shared-comment-send-btn"
            onClick={handleSend}
            disabled={!isLoggedIn || !user._id || !user.nickname || !comment.trim()}
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharedWishlistDetail;
