import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import CategorySelector from "../../components/CategorySelector";
import "../../styles/HomePage.css";

const items = [
  { id: 1, category: "상의", height: 200 },
  { id: 2, category: "상의", height: 250 },
  { id: 3, category: "하의", height: 180 },
  { id: 4, category: "신발", height: 300 },
  { id: 5, category: "액세서리", height: 160 },
  { id: 6, category: "폰케이스", height: 220 },
];

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const navigate = useNavigate();

  const filteredItems =
    selectedCategory === "전체"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const handleItemClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <div>
      <Header />
      <main className="home-container">
        <CategorySelector
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <h2 className="section-title">
          # {selectedCategory} <span style={{ color: "black" }}>위시템</span>
        </h2>

        <div className="masonry-grid">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="masonry-item"
              style={{
                height: `${item.height}px`,
                cursor: "pointer",
              }}
              onClick={() => handleItemClick(item.id)}
            >
              아이템 {item.id}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
