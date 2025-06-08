// src/pages/Home/ProductRegister/TestPage.tsx
import React, { useState } from "react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import SignupPasswordModal from "./SignupPasswordModal";
import SignupProfileModal from "./SignupProfileModal";
import SignupAvatarModal from "./SignupAvatarModal";

const TestPage = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <button
        onClick={() => setLoginModalOpen(true)}
        className="bg-purple-700 text-white px-4 py-2 rounded"
      >
        로그인 모달 열기
      </button>

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSwitchToSignup={() => {
          setLoginModalOpen(false);
          setSignupModalOpen(true);
        }}
      />

      <SignupModal
        isOpen={signupModalOpen}
        onClose={() => setSignupModalOpen(false)}
        onSwitchToLogin={() => {
          setLoginModalOpen(true);
          setSignupModalOpen(false);
        }}
        onNextToPassword={() => {
          setSignupModalOpen(false);
          setPasswordOpen(true); // ✅ 이걸 위해 passwordOpen 필요
        }}
      />

      <SignupPasswordModal
        isOpen={passwordOpen}
        onClose={() => setPasswordOpen(false)}
        onNextToProfile={() => {
          setPasswordOpen(false);
          setProfileOpen(true);
        }}
        onSwitchToLogin={() => {
          setPasswordOpen(false);
          setLoginModalOpen(true);
        }}
      />

      <SignupProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        onSubmit={() => {
          setProfileOpen(false);
          setAvatarOpen(true);
        }}
        onSwitchToLogin={() => {
          setProfileOpen(false);
          setLoginModalOpen(true);
        }}
      />

      <SignupAvatarModal
        isOpen={avatarOpen}
        onClose={() => setAvatarOpen(false)}
        onSubmit={() => {
          setAvatarOpen(false);
          alert("회원가입 완료!");
        }}
        onSwitchToLogin={() => {
          setAvatarOpen(false);
          setLoginModalOpen(true);
        }}
      />
    </div>
  );
};

export default TestPage;
