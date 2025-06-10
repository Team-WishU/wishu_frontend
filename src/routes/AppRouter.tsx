import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import ProductDetailPage from "../pages/Home/ProductDetail/ProductDetailPage";
import TestPage from "../pages/Home/ProductRegister/test";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/test" element={<TestPage />} />
    </Routes>
  );
};

export default AppRouter;
