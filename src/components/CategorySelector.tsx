import React from "react";
import "../styles/CategorySelector.css";

type Props = {
  selected: string;
  onSelect: (cat: string) => void;
};

const categories = [
  { key: "전체", label: "Top 50", image: null },
  { key: "상의", label: "상의", image: "/assets/images/top.png" },
  { key: "하의", label: "하의", image: "/assets/images/bottom.png" },
  { key: "신발", label: "신발", image: "/assets/images/shoes.png" },
  { key: "액세서리", label: "액세서리", image: "/assets/images/apple.png" },
  { key: "폰케이스", label: "폰케이스", image: "/assets/images/phone_case.png" },
];

const CategorySelector: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <div className="category-list">
      {categories.map((cat) => (
        <div key={cat.key} className={`category-item ${selected === cat.key ? "active" : ""}`} onClick={() => onSelect(cat.key)}>
          {cat.image ? (
            <img src={cat.image} alt={`${cat.label} 아이콘`} className="category-image" />
          ) : (
            <div className="category-text-circle">
              <span>
                Top
                <br />
                50
              </span>
            </div>
          )}
          <span className="category-label">{cat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default CategorySelector;
