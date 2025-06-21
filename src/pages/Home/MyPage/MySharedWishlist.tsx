import React, { useEffect, useState } from "react";
import axios from "axios";
import SharedWishlistDetail from "./SharedWishlistDetail";

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
  _id?: string;        // ← _id 또는 bucketId로 둘 다 커버
  bucketId?: string;
  userIds: string[];
  collaborators: UserSimple[];
  items: Product[];
}

interface MySharedWishlistProps {
  selectedBucketFromFriend?: SharedBucket; // 친구 탭에서 전달된 버킷
}

const MySharedWishlist: React.FC<MySharedWishlistProps> = ({ selectedBucketFromFriend }) => {
  const [selectedBucket, setSelectedBucket] = useState<SharedBucket | null>(null);
  const [buckets, setBuckets] = useState<SharedBucket[]>([]);
  const [loading, setLoading] = useState(false);

  const myId = localStorage.getItem("userId") ?? "";

  // 전달받은 selectedBucketFromFriend가 있으면 상세로 진입
  useEffect(() => {
    fetchBuckets();
  }, []);

  useEffect(() => {
    if (selectedBucketFromFriend && (selectedBucketFromFriend._id || selectedBucketFromFriend.bucketId)) {
      setSelectedBucket(selectedBucketFromFriend);
    }
  }, [selectedBucketFromFriend]);

  const fetchBuckets = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(`${API_BASE}/shared-buckets/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBuckets(res.data.buckets || []);
    } catch (err) {
      setBuckets([]);
    } finally {
      setLoading(false);
    }
  };

  const getOtherNicknames = (bucket: SharedBucket) =>
    (bucket.collaborators || [])
      .filter((u) => u._id !== myId)
      .map((u) => u.nickname)
      .join(", ");

  if (selectedBucket && (selectedBucket._id || selectedBucket.bucketId)) {
    return (
      <SharedWishlistDetail
        bucket={selectedBucket}
        onBack={() => setSelectedBucket(null)}
      />
    );
  }

  return (
    <div className="wishlist-container-wishlist">
      <div className="wishlist-header-wishlist">
        <div className="wishlist-title-wishlist">{buckets.length}개의 공유 버킷</div>
        <div className="wishlist-actions-wishlist">
          <button className="create-button-wishlist" onClick={fetchBuckets}>
            + 버킷 새로고침
          </button>
        </div>
      </div>
      <div className="wishlist-grid-wishlist">
        {loading ? (
          <div style={{ padding: 20, textAlign: "center" }}>로딩중...</div>
        ) : (
          buckets.map((bucket) => (
            <div
              key={bucket._id || bucket.bucketId}
              className="wishlist-card-wishlist"
              onClick={() => setSelectedBucket(bucket)}
              style={{ cursor: "pointer" }}
            >
              <div className="wishlist-image-wrapper-wishlist">
                <div className="wishlist-image-box-wishlist">
                  <img
                    src={bucket.items?.[0]?.imageUrl || "/assets/images/sample.png"}
                    alt={getOtherNicknames(bucket) + "의 상품"}
                    className="wishlist-image-multi-wishlist"
                  />
                </div>
              </div>
              <div className="wishlist-name-wishlist">
                {getOtherNicknames(bucket)}님과의 위시템
              </div>
              <div className="wishlist-count-wishlist">
                멤버 {bucket.collaborators.length}명 | 아이템 {bucket.items.length}개
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MySharedWishlist;