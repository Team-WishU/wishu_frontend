// src/pages/Home/SearchResultPage.tsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../utils/axiosInstance";
import Masonry from "react-masonry-css";
import Header from "../../components/Header/Header";
import "../../styles/HomePage.css";

interface Product {
  _id: string;
  title: string;
  imageUrl: string;
  brand: string;
  price: number;
}

const SearchResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState<Product[]>([]);
  const query = new URLSearchParams(location.search).get("keyword") || "";

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await api.get(`/products/search?keyword=${query}`);
        setResults(res.data.data);
      } catch (err) {
        console.error("검색 실패:", err);
      }
    };

    if (query) fetchResults();
  }, [query]);

  const handleClick = (id: string) => {
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
        <h2 className="section-title">
          🔍 “{query}” <span style={{ color: "black" }}>검색 결과</span>
        </h2>

        {results.length === 0 ? (
          <p style={{ marginTop: "2rem", fontSize: "16px", color: "#777" }}>
            검색 결과가 없습니다.
          </p>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {results.map((item) => (
              <div
                key={item._id}
                className="masonry-item"
                onClick={() => handleClick(item._id)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="masonry-img"
                />
                <div className="masonry-info">
                  <strong>{item.title}</strong>
                  <p>{item.brand}</p>
                  <p>{item.price.toLocaleString()}원</p>
                </div>
              </div>
            ))}
          </Masonry>
        )}
      </main>
    </div>
  );
};

export default SearchResultPage;
