import { useEffect, useState } from "react";
import "../../../styles/ProductRegister/ModalBase.css";
import "../../../styles/ProductRegister/SignupAvatarModal.css";
import AvatarSelectModal from "./AvatarSelectModal";

const logo = process.env.PUBLIC_URL + "/assets/icons/logo.png";

const avatarImages = [
  "/assets/images/Signup/mouse.png", // 쥐
  "/assets/images/Signup/cow.png", // 소
  "/assets/images/Signup/tiger.png", // 호랑이
  "/assets/images/Signup/rabbit.png", // 토끼
  "/assets/images/Signup/dragon.png", // 용
  "/assets/images/Signup/snake.png", // 뱀
  "/assets/images/Signup/horse.png", // 말
  "/assets/images/Signup/sheep.png", // 양
  "/assets/images/Signup/monkey.png", // 원숭이
  "/assets/images/Signup/chicken.png", // 닭
  "/assets/images/Signup/dog.png", // 개
  "/assets/images/Signup/pig.png", // 돼지
];

interface SignupAvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onSwitchToLogin: () => void;
}

const SignupAvatarModal: React.FC<SignupAvatarModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onSwitchToLogin,
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [showAvatarOptions, setShowAvatarOptions] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  // ✅ 여기 안에서 선언해야 합니다
  useEffect(() => {
    if (isOpen) {
      setSelectedAvatar(null);
      setShowAvatarOptions(false);
      setShowAvatarModal(false);
    }
  }, [isOpen]);
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-content">
          <div className="modal-header-wrapper">
            <div className="modal-header">
              <div className="logo-wrapper">
                <img src={logo} alt="Wishu Logo" className="logo-img" />
              </div>
              <div className="modal-text">
                <h2>위시유에 가입하기</h2>
                <p>프로필 설정하기!</p>
              </div>
            </div>
          </div>

          {/* ✅ 클릭 시 옵션 표시 */}
          <div className="avatar-wrapper">
            <div
              className={`avatar-circle ${selectedAvatar ? "selected" : ""}`}
              onClick={() => setShowAvatarModal(true)}
            >
              {selectedAvatar ? (
                <img
                  src={selectedAvatar}
                  alt="selected avatar"
                  className="selected-avatar-img"
                />
              ) : (
                <div className="plus-button">
                  <img
                    src="/assets/images/Signup/plus.png"
                    alt="plus icon"
                    className="plus-button-img"
                  />
                </div>
              )}
            </div>
          </div>

          {/* ✅ 옵션들 표시 */}
          {showAvatarOptions && (
            <div className="avatar-options">
              {avatarImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`avatar-${idx}`}
                  className="avatar-option"
                  onClick={() => {
                    setSelectedAvatar(img);
                    setShowAvatarOptions(false);
                  }}
                />
              ))}
            </div>
          )}

          <input
            type="text"
            placeholder="닉네임을 입력해주세요."
            className="avatar-nickname-input"
          />

          <button className="password-submit-btn" onClick={onSubmit}>
            회원가입
          </button>
        </div>
      </div>

      {/* 아바타 선택 모달 */}
      <AvatarSelectModal
        isOpen={showAvatarModal}
        avatars={avatarImages}
        onClose={() => setShowAvatarModal(false)}
        onSelect={(src) => {
          setSelectedAvatar(src);
          setShowAvatarModal(false);
        }}
      />
    </div>
  );
};

export default SignupAvatarModal;
