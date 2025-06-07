// src/pages/Home/ProductRegister/test.tsx
import React, { useState } from "react";
import LoginModal from "./LoginModal";

const TestPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <button
        onClick={() => setModalOpen(true)}
        className="bg-purple-700 text-white px-4 py-2 rounded"
      >
        로그인 모달 열기
      </button>

      <LoginModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default TestPage;
