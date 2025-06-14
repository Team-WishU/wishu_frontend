import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Masonry from "react-masonry-css";
import axios from "axios";

import Header from "../../components/Header/Header";
import CategorySelector from "../../components/CategorySelector";
import FloatingChatButton from "../ChatBot/FloatingChatButton";
import "../../styles/HomePage.css";

const API_BASE = process.env.REACT_APP_API_URL;

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE}/products`);
        // 최신순 정렬 (createdAt 내림차순)
        const sorted = res.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setProducts(sorted);
      } catch (err) {
        console.error("상품 불러오기 실패", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredItems = selectedCategory === "전체" ? products : products.filter((item) => item.category === selectedCategory);

  const handleItemClick = (id: string) => {
    navigate(`/products/${id}`);
  };

  const breakpointColumnsObj = {
    default: 5,
    1400: 4,
    1024: 3,
    768: 2,
    480: 1,
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div>
      <Header />
      <main className="home-container">
        <CategorySelector selected={selectedCategory} onSelect={setSelectedCategory} />
        <h2 className="section-title">
          # {selectedCategory} <span style={{ color: "black" }}>위시템</span>
        </h2>

        {filteredItems.length === 0 ? (
          <p style={{ padding: "200px", textAlign: "center" }}>해당 카테고리에 등록된 상품이 없습니다.</p>
        ) : (
          <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
            {filteredItems.map((item) => (
              <div key={item._id} className="masonry-item" onClick={() => handleItemClick(item._id)}>
                <img src={item.imageUrl} alt={item.title} className="masonry-img" />
              </div>
            ))}
          </Masonry>
        )}

        <FloatingChatButton />
      </main>
    </div>
  );
};

export default HomePage;
