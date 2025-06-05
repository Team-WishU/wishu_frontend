import React from "react";
import Header from "../../components/Header/Header";

const categories = ["전체 워시템", "상의", "하의", "신발", "액세서리", "폰케이스"];

const items = [
  "/items/top1.jpg",
  "/items/top2.jpg",
  "/items/top3.jpg",
  "/items/top4.jpg",
  "/items/top5.jpg",
  "/items/top6.jpg",
  "/items/top7.jpg",
  "/items/top8.jpg",
  "/items/top9.jpg",
  "/items/top10.jpg",
  "/items/top11.jpg",
  "/items/top12.jpg",
  "/items/top13.jpg",
  "/items/top14.jpg",
  "/items/top15.jpg",
];

const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <main className="px-10 py-6">
        {/* 카테고리 */}
        <div className="flex gap-6 justify-center my-6">
          {categories.map((cat, idx) => (
            <div key={idx} className="text-center">
              <div className="w-16 h-16 rounded-full bg-gray-200 mx-auto" />
              <span className="text-sm">{cat}</span>
            </div>
          ))}
        </div>

        {/* 해시태그 */}
        <h2 className="text-xl font-semibold text-[#6c49ff] my-4"># 상의 워시템</h2>

        {/* 이미지 리스트 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {items.map((src, idx) => (
            <img key={idx} src={src} alt={`item-${idx}`} className="w-full object-cover rounded-xl" />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
