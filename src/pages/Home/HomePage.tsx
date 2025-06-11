import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Masonry from "react-masonry-css"; // 추가

import Header from "../../components/Header/Header";
import CategorySelector from "../../components/CategorySelector";
import FloatingChatButton from "../ChatBot/FloatingChatButton";
import "../../styles/HomePage.css";

const items = [
  { id: 1, category: "상의", imageUrl: "/assets/images/product/bottom/bottom1.png" },
  { id: 2, category: "상의", imageUrl: "/assets/images/product/bottom/bottom2.png" },
  { id: 3, category: "하의", imageUrl: "/assets/images/product/bottom/bottom3.png" },
  { id: 4, category: "신발", imageUrl: "/assets/images/product/bottom/bottom4.png" },
  { id: 5, category: "액세서리", imageUrl: "/assets/images/product/bottom/bottom5.png" },
  { id: 6, category: "액세서리", imageUrl: "/assets/images/product/bottom/bottom6.png" },
  { id: 7, category: "액세서리", imageUrl: "/assets/images/product/bottom/bottom7.png" },
  { id: 8, category: "액세서리", imageUrl: "/assets/images/product/bottom/bottom8.png" },
  { id: 9, category: "액세서리", imageUrl: "/assets/images/product/bottom/bottom9.png" },
  { id: 10, category: "액세서리", imageUrl: "/assets/images/product/bottom/bottom10.png" },
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

  const breakpointColumnsObj = {
    default: 5,
    1400: 4,
    1024: 3,
    768: 2,
    480: 1,
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

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="masonry-item"
              onClick={() => handleItemClick(item.id)}
            >
              <img
                src={item.imageUrl}
                alt={`item-${item.id}`}
                className="masonry-img"
              />
            </div>
          ))}
        </Masonry>

        <FloatingChatButton />
      </main>
    </div>
  );
};

export default HomePage;
