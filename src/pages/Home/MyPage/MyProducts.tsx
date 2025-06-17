import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../styles/Mypage/MyProducts.css";
import CategoryDetail from "./CategoryDetail";

const API_BASE = process.env.REACT_APP_API_URL;

export interface Product {
  _id: string;
  category: string;
  imageUrl: string;
  title: string;
}

interface CategoryGroup {
  name: string;
  images: string[];
  count: number;
  products: Product[];
}

const MyProducts: React.FC = () => {
  const [groupedData, setGroupedData] = useState<CategoryGroup[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<CategoryGroup | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`${API_BASE}/products/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const products: Product[] = res.data;

        const grouped: { [key: string]: Product[] } = {};
        products.forEach((p) => {
          if (!grouped[p.category]) grouped[p.category] = [];
          grouped[p.category].push(p);
        });

        const groupedList = Object.entries(grouped).map(([cat, items]) => ({
          name: cat,
          count: items.length,
          images: items.slice(0, 2).map((item) => item.imageUrl),
          products: items,
        }));

        setGroupedData(groupedList);
      } catch (err) {
        console.error("내 상품 조회 실패", err);
      }
    };

    fetchMyProducts();
  }, []);

  const handleDelete = async (productId: string) => {
    try {
      const token = localStorage.getItem("accessToken");

      // 1. 서버에서 해당 상품 삭제
      await axios.delete(`${API_BASE}/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 2. 선택된 그룹 내에서 삭제된 상품 제거
      if (!selectedGroup) return;

      const updatedProducts = selectedGroup.products.filter(
        (p) => p._id !== productId
      );
      const updatedGroup = {
        ...selectedGroup,
        products: updatedProducts,
        count: updatedProducts.length,
        images: updatedProducts.slice(0, 2).map((p) => p.imageUrl),
      };

      // 3. 전체 그룹 리스트에서도 해당 그룹을 업데이트
      setGroupedData((prev) =>
        prev.map((group) =>
          group.name === updatedGroup.name ? updatedGroup : group
        )
      );

      // 4. 현재 선택된 그룹 상태도 갱신
      setSelectedGroup(updatedGroup);
    } catch (err) {
      console.error("개별 상품 삭제 실패", err);
    }
  };

  const handleDeleteCategory = async (categoryName: string) => {
    const confirmDelete = window.confirm(
      `'${categoryName}' 카테고리의 모든 위시템을 삭제할까요?`
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${API_BASE}/products/category/${categoryName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setGroupedData((prev) =>
        prev.filter((group) => group.name !== categoryName)
      );
      if (selectedGroup?.name === categoryName) {
        setSelectedGroup(null);
      }
    } catch (err) {
      console.error("카테고리 삭제 실패", err);
    }
  };

  const totalCount = groupedData.reduce((acc, g) => acc + g.count, 0);

  if (selectedGroup) {
    return (
      <CategoryDetail
        category={selectedGroup.name}
        products={selectedGroup.products}
        onBack={() => setSelectedGroup(null)}
        onDelete={handleDelete}
      />
    );
  }

  return (
    <div className="product-container">
      <div className="product-header">
        <div className="product-title">{totalCount}개의 위시템</div>
        <div className="product-actions">
          <button
            className="product-button"
            onClick={() => navigate("/products/add")}
          >
            + 위시템 작성
          </button>
          <button
            className="product-button"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "완료" : "편집"}
          </button>
        </div>
      </div>

      <div className="product-grid">
        {groupedData.map((group) => (
          <div key={group.name} className="product-card">
            <div className="product-image-wrapper">
              {group.images.map((src, idx) => (
                <div
                  key={idx}
                  className="product-image-box"
                  onClick={() => {
                    if (!isEditing) setSelectedGroup(group);
                  }}
                  style={{
                    cursor: isEditing ? "default" : "pointer",
                    position: "relative",
                  }}
                >
                  <img
                    src={src}
                    alt={`${group.name}-${idx}`}
                    className="product-image"
                  />
                  {isEditing && idx === group.images.length - 1 && (
                    <img
                      src="/assets/images/delete.png"
                      alt="삭제 아이콘"
                      className="product-delete-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCategory(group.name);
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="product-name">{group.name}</div>
            <div className="product-count">위시템 {group.count}개</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
