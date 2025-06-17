import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import ProductDetailPage from "../pages/Home/ProductDetail/ProductDetailPage";
import MyPage from "../pages/Home/MyPage/MyPage";
import AddProducts from "../pages/Home/ProductDetail/AddProducts";
import ProfileSetting from "../pages/Setting/Profile_Setting";
import SearchResultPage from "../pages/Home/SearchResultPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/products/add" element={<AddProducts />} />
      <Route path="/products/:id/edit" element={<AddProducts />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/profile-setting" element={<ProfileSetting />} />
      <Route path="/search" element={<SearchResultPage />} />
    </Routes>
  );
};

export default AppRouter;
