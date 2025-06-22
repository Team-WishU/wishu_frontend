import React, { useEffect, useState } from "react";//수정
import axios from "axios";
import "../../../styles/Mypage/MyWishlist.css";
import "../../../styles/Mypage/MyFriends.css";

const API_BASE = process.env.REACT_APP_API_URL;

interface UserSimple {
  _id: string;
  nickname: string;
  profileImage: string;
}

const getProfileImage = (profileImage?: string) => {
  if (!profileImage) return "/assets/images/Signup/default.png";
  if (profileImage.startsWith("http")) return profileImage;
  if (profileImage.startsWith("/uploads")) return `${API_BASE}${profileImage}`;
  if (profileImage.startsWith("/assets")) return profileImage;
  return `/assets/images/Signup/${profileImage}`;
};

interface MyFriendsProps {
  onGoSharedWishlist: (bucket: any) => void;
}

const MyFriends: React.FC<MyFriendsProps> = ({ onGoSharedWishlist }) => {
  const [tab, setTab] = useState<"friends" | "requests">("friends");
  const [friends, setFriends] = useState<UserSimple[]>([]);
  const [incoming, setIncoming] = useState<UserSimple[]>([]);
  const [outgoing, setOutgoing] = useState<UserSimple[]>([]);
  const [loading, setLoading] = useState(false);

  const myId = localStorage.getItem("userId") ?? "";

  const fetchFriends = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(`${API_BASE}/friends`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFriends(res.data);
    } catch (err) {
      setFriends([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(`${API_BASE}/friends/requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIncoming(res.data.incoming);
      setOutgoing(res.data.outgoing);
    } catch (err) {
      setIncoming([]);
      setOutgoing([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tab === "friends") fetchFriends();
    else fetchRequests();
  }, [tab]);

  const acceptRequest = async (userId: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `${API_BASE}/friends/accept`,
        { userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchRequests();
      fetchFriends();
    } catch (err: any) {
      alert(err.response?.data?.message || "요청 수락 실패");
    }
  };

  const removeFriend = async (userId: string) => {
    if (!window.confirm("정말 친구를 삭제하시겠습니까?\n공유된 위시리스트도 같이 삭제됩니다.")) return;
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${API_BASE}/friends/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchFriends();
    } catch (err: any) {
      alert(err.response?.data?.message || "삭제 실패");
    }
  };

  const handleShareClick = async (friend: UserSimple) => {
    if (!window.confirm(`${friend.nickname}님과 위시리스트를 공유하시겠습니까?`)) return;
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(
        `${API_BASE}/shared-buckets/wishlist?user1=${myId}&user2=${friend._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onGoSharedWishlist(res.data);
    } catch (err: any) {
      alert(err.response?.data?.message || "공유 버킷 생성 실패");
    }
  };

  return (
    <div className="wishlist-container-wishlist" style={{ minHeight: 520 }}>
      <div className="wishlist-header-wishlist">
        <div className="wishlist-title-wishlist" style={{ fontWeight: 700, fontSize: 24, color: "#8e4ffb" }}>
          친구관리
        </div>
        <div className="wishlist-actions-wishlist">
          <button
            className={`tab-button ${tab === "friends" ? "active" : ""}`}
            onClick={() => setTab("friends")}
          >
            친구목록
          </button>
          <button
            className={`tab-button ${tab === "requests" ? "active" : ""}`}
            onClick={() => setTab("requests")}
          >
            친구요청
          </button>
        </div>
      </div>
      <div style={{ width: "100%", marginTop: 16 }}>
        {loading && <div style={{ padding: "2rem", textAlign: "center" }}>로딩중...</div>}

        {tab === "friends" && !loading && (
          friends.length === 0 ? (
            <div style={{ padding: "2rem", textAlign: "center", color: "#bbb" }}>아직 친구가 없어요!</div>
          ) : (
            <div className="friend-list-custom">
              {friends.map((f) => (
                <div key={f._id} className="friend-card-custom">
                  <img
                    src={getProfileImage(f.profileImage)}
                    alt={f.nickname}
                    className="friend-avatar-custom"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/assets/images/Signup/default.png";
                    }}
                  />
                  <span className="friend-name-custom">{f.nickname}</span>
                  <button
                    className="friend-share-btn-custom"
                    onClick={() => handleShareClick(f)}
                    style={{ marginLeft: "auto", marginRight: "8px" }}
                  >
                    위시템 공유
                  </button>
                  <button
                    className="friend-remove-btn-custom"
                    onClick={() => removeFriend(f._id)}
                  >
                    친구 삭제
                  </button>
                </div>
              ))}
            </div>
          )
        )}

        {tab === "requests" && !loading && (
          <div className="friend-request-row">
            <div className="friend-request-col left">
              <div className="friend-section-title-custom">받은 요청</div>
              {incoming.length === 0 ? (
                <div style={{ color: "#bbb", margin: "18px 0" }}>없음</div>
              ) : (
                incoming.map((r) => (
                  <div key={r._id} className="friend-card-custom">
                    <img
                      src={getProfileImage(r.profileImage)}
                      alt={r.nickname}
                      className="friend-avatar-custom"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/assets/images/Signup/default.png";
                      }}
                    />
                    <span className="friend-name-custom">{r.nickname}</span>
                    <button className="friend-accept-btn-custom" onClick={() => acceptRequest(r._id)}>
                      수락
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="friend-request-col right">
              <div className="friend-section-title-custom">보낸 요청</div>
              {outgoing.length === 0 ? (
                <div style={{ color: "#bbb", margin: "18px 0" }}>없음</div>
              ) : (
                outgoing.map((r) => (
                  <div key={r._id} className="friend-card-custom friend-card-outgoing-custom">
                    <img
                      src={getProfileImage(r.profileImage)}
                      alt={r.nickname}
                      className="friend-avatar-custom"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/assets/images/Signup/default.png";
                      }}
                    />
                    <span className="friend-name-custom">{r.nickname}</span>
                    <span className="friend-pending-custom">요청 보냄</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFriends;
