import React, { useEffect, useState } from "react";//수정
import "../../../styles/Mypage/MyWishlist.css";
import WishlistDetail from "./WishlistDetail";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL;

export interface Product {
  _id: string;
  category: string;
  imageUrl: string;
  title: string;
  // 필요 시 brand, price 등 추가 가능
}

interface WishlistGroup {
  name: string;
  images: string[];
  count: number;
  products: Product[];
}

const MyWishlist: React.FC = () => {
  const [wishlistData, setWishlistData] = useState<WishlistGroup[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<WishlistGroup | null>(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`${API_BASE}/products/saved/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data; // { "상의": [...], "하의": [...] }

        const formatted: WishlistGroup[] = Object.entries(data).map(([category, products]) => ({
          name: category,
          count: (products as Product[]).length,
          images: (products as Product[]).slice(0, 3).map((p) => p.imageUrl),
          products: products as Product[],
        }));

        setWishlistData(formatted);
      } catch (err) {
        console.error("찜 목록 불러오기 실패", err);
      }
    };

    fetchWishlist();
  }, []);

  const handleDeleteCategory = async (categoryName: string) => {
    const confirm = window.confirm(`'${categoryName}' 카테고리의 위시템을 삭제할까요?`);
    if (!confirm) return;

    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${API_BASE}/products/saved/category/${categoryName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlistData((prev) => prev.filter((group) => group.name !== categoryName));
      if (selectedGroup?.name === categoryName) {
        setSelectedGroup(null);
      }
    } catch (err) {
      console.error("카테고리별 찜 삭제 실패", err);
    }
  };

  if (selectedGroup) {
    return (
      <WishlistDetail
        category={selectedGroup.name}
        products={selectedGroup.products}
        onBack={() => setSelectedGroup(null)}
        onDelete={async (productId: string) => {
          try {
            const token = localStorage.getItem("accessToken");
            await axios.delete(`${API_BASE}/products/${productId}/save`, {
              headers: { Authorization: `Bearer ${token}` },
            });

            // 삭제 후 상태 갱신
            const updatedProducts = selectedGroup.products.filter((p) => p._id !== productId);
            const updatedGroup = {
              ...selectedGroup,
              products: updatedProducts,
              count: updatedProducts.length,
              images: updatedProducts.slice(0, 3).map((p) => p.imageUrl),
            };

            setWishlistData((prev) => prev.map((group) => (group.name === updatedGroup.name ? updatedGroup : group)));
            setSelectedGroup(updatedGroup);
          } catch (err) {
            console.error("개별 찜 삭제 실패", err);
            alert("삭제에 실패했습니다.");
          }
        }}
      />
    );
  }

  const totalCount = wishlistData.reduce((acc, group) => acc + group.count, 0);

  return (
    <div className="wishlist-container-wishlist">
      <div className="wishlist-header-wishlist">
        <div className="wishlist-title-wishlist">{totalCount}개의 위시템</div>
        <div className="wishlist-actions-wishlist">
          <button className="create-button-wishlist" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "완료" : "편집"}
          </button>
        </div>
      </div>

      <div className="wishlist-grid-wishlist">
        {wishlistData.map((group) => (
          <div key={group.name} className="wishlist-card-wishlist">
            <div className="wishlist-image-wrapper-wishlist">
              {group.images.map((src, idx) => (
                <div
                  key={idx}
                  className="wishlist-image-box-wishlist"
                  onClick={() => !isEditing && setSelectedGroup(group)}
                  style={{ cursor: isEditing ? "default" : "pointer" }}
                >
                  <img src={src} alt={`${group.name}-${idx}`} className="wishlist-image-multi-wishlist" />
                  {isEditing && idx === group.images.length - 1 && (
                    <img
                      src="/assets/images/delete.png"
                      alt="삭제 아이콘"
                      className="delete-icon-wishlist"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCategory(group.name);
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="wishlist-name-wishlist">{group.name}</div>
            <div className="wishlist-count-wishlist">위시템 {group.count}개</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWishlist;
