import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import ProductDetailPage from "../pages/Home/ProductDetail/ProductDetailPage";
import MyPage from "../pages/Home/MyPage/MyPage";
import AddProducts from "../pages/Home/ProductDetail/AddProducts";
import ProfileSetting from "../pages/Setting/Profile_Setting";
import SearchResultPage from "../pages/Home/SearchResultPage"; // 🔍 추가

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/ProductDetail/addproducts" element={<AddProducts />} />
      <Route path="/profile-setting" element={<ProfileSetting />} />
      <Route path="/search" element={<SearchResultPage />} />
    </Routes>
  );
};

export default AppRouter;
