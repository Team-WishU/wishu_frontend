import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import ProductDetailPage from "../pages/Home/ProductDetail/ProductDetailPage";
import MyPage from "../pages/Home/MyPage/MyPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
};

export default AppRouter;
