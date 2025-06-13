import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../../src/components/Header/Header";
import AvatarSelectModal from "../../pages/Home/ProductRegister/AvatarSelectModal";
import "../../styles/ProfileSetting.css";

const avatarImages = [
  "/assets/images/Signup/mouse.png",
  "/assets/images/Signup/cow.png",
  "/assets/images/Signup/tiger.png",
  "/assets/images/Signup/rabbit.png",
  "/assets/images/Signup/dragon.png",
  "/assets/images/Signup/snake.png",
  "/assets/images/Signup/horse.png",
  "/assets/images/Signup/sheep.png",
  "/assets/images/Signup/monkey.png",
  "/assets/images/Signup/chicken.png",
  "/assets/images/Signup/dog.png",
  "/assets/images/Signup/pig.png",
];

const API_URL = process.env.REACT_APP_API_URL;

const ProfileSetting: React.FC = () => {
  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    console.log("🔐 accessToken from localStorage:", token);

    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNickname(res.data.nickname);
        setProfileImage(res.data.profileImage);
      } catch (err) {
        console.error("❌ 사용자 정보 불러오기 실패:", err);
        alert("사용자 정보를 불러오지 못했습니다.");
      }
    };

    fetchUser();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      await axios.patch(
        `${API_URL}/users/me`,
        { nickname, profileImage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // ✅ localStorage 업데이트
      const updatedUser = JSON.parse(localStorage.getItem("user") || "{}");
      updatedUser.nickname = nickname;
      updatedUser.profileImage = profileImage;
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // ✅ Header에 반영되도록 이벤트 발송
      window.dispatchEvent(new Event("userUpdated"));

      alert("프로필이 성공적으로 수정되었습니다.");
      navigate("/");
    } catch (error: any) {
      alert(`오류 발생: ${error.response?.data?.message || error.message}`);
    }
  };

  if (profileImage === null) {
    return <div className="profile-setting-wrapper">로딩 중...</div>;
  }

  return (
    <div className="profile-setting-wrapper">
      <Header />
      <div className="profile-setting-container">
        <h2 className="setting-title">설정</h2>
        <div className="profile-card">
          <h3 className="card-title">프로필 설정</h3>

          <div className="profile-section">
            <label className="profile-label">프로필 사진</label>
            <div className="profile-image-wrapper">
              <img
                src={`/assets/images/Signup/${profileImage}`}
                alt="프로필"
                className="profile-avatar"
              />
              <button
                className="upload-button"
                onClick={() => setShowAvatarModal(true)}
              >
                +
              </button>
            </div>
          </div>

          <div className="profile-section">
            <label className="profile-label">닉네임</label>
            <input
              type="text"
              className="nickname-input"
              placeholder="닉네임을 입력하세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>

          <div className="button-wrapper">
            <button className="save-button" onClick={handleUpdateProfile}>
              프로필 수정
            </button>
          </div>
        </div>
      </div>

      <AvatarSelectModal
        isOpen={showAvatarModal}
        avatars={avatarImages}
        onClose={() => setShowAvatarModal(false)}
        onSelect={(src) => {
          const fileName = src.split("/").pop();
          if (fileName) setProfileImage(fileName);
          setShowAvatarModal(false);
        }}
      />
    </div>
  );
};

export default ProfileSetting;
