// src/components/CategorySelector.tsx

import React from "react";
import "../styles/CategorySelector.css";

type Props = {
  selected: string;
  onSelect: (cat: string) => void;
};

const categories = [
  { key: "전체", image: null },
  { key: "상의", image: "/assets/images/top.png" },
  { key: "하의", image: "/assets/images/bottom.png" },
  { key: "신발", image: "/assets/images/shoes.png" },
  { key: "액세서리", image: "/assets/images/apple.png" },
  { key: "폰케이스", image: "/assets/images/phone_case.png" },
];

const CategorySelector: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <div className="category-list">
      {categories.map((cat, idx) => (
        <div key={idx} className={`category-item ${selected === cat.key ? "active" : ""}`} onClick={() => onSelect(cat.key)}>
          {cat.image ? (
            <img src={cat.image} alt={cat.key} className="category-image" />
          ) : (
            <div className="category-text-circle">
              <span>
                Top
                <br />
                50
              </span>
            </div>
          )}
          <span className="category-label">{cat.key}</span>
        </div>
      ))}
    </div>
  );
};

export default CategorySelector;
