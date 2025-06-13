import { useEffect, useState } from "react";
import api from "../../../../src/utils/axiosInstance";
import { useUser } from "../../../../src/context/UserContext";
import AvatarSelectModal from "./AvatarSelectModal";
import "../../../styles/ProductRegister/ModalBase.css";
import "../../../styles/ProductRegister/SignupAvatarModal.css";

const logo = process.env.PUBLIC_URL + "/assets/icons/logo.png";

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

interface SignupAvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onSwitchToLogin: () => void;
  email: string;
  password: string;
  realName: string;
  birth: string;
  gender: string;
}

const SignupAvatarModal: React.FC<SignupAvatarModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onSwitchToLogin,
  email,
  password,
  realName,
  birth,
  gender,
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [nickname, setNickname] = useState("");
  const [nicknameValid, setNicknameValid] = useState<boolean | null>(null);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const { login } = useUser();

  useEffect(() => {
    if (isOpen) {
      setSelectedAvatar(null);
      setNickname("");
      setNicknameValid(null);
      setShowAvatarModal(false);
    }
  }, [isOpen]);

  const checkNickname = async () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      const res = await api.get(`/users/check-nickname?nickname=${nickname}`);
      if (!res.data.isAvailable) {
        setNicknameValid(false);
        alert("이미 사용 중인 닉네임입니다.");
      } else {
        setNicknameValid(true);
        alert("사용 가능한 닉네임입니다!");
      }
    } catch {
      alert("닉네임 확인 중 오류가 발생했습니다.");
    }
  };

  const handleRegister = async () => {
    if (!nickname || !selectedAvatar) {
      alert("닉네임과 아바타를 모두 선택해주세요.");
      return;
    }
    if (!nicknameValid) {
      alert("닉네임 중복 확인을 완료해주세요.");
      return;
    }

    const profileImage = selectedAvatar.split("/").pop();
    const birthDate = `20${birth.slice(0, 2)}-${birth.slice(2, 4)}-${birth.slice(4, 6)}`;

    try {
      await api.post("/users/register", {
        email,
        password,
        nickname,
        profileImage,
        name: realName,
        birthDate,
        gender,
      });

      const loginRes = await api.post("/auth/login", { email, password });
      const { accessToken, user } = loginRes.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      window.dispatchEvent(new Event("userUpdated"));

      login({
        name: user.nickname || user.name || "",
        email: user.email,
        avatar: user.profileImage || "", // 경로는 context에서 보정
      });

      onSubmit();
    } catch {
      alert("회원가입 실패. 다시 시도해주세요.");
    }
  };

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

          <div className="avatar-wrapper">
            <div className={`avatar-circle ${selectedAvatar ? "selected" : ""}`} onClick={() => setShowAvatarModal(true)}>
              {selectedAvatar ? (
                <img src={selectedAvatar} alt="selected avatar" className="selected-avatar-img" />
              ) : (
                <div className="plus-button">
                  <img src="/assets/images/Signup/plus.png" alt="plus icon" className="plus-button-img" />
                </div>
              )}
            </div>
          </div>

          <div className="nickname-check-group">
            <input
              type="text"
              placeholder="닉네임을 입력해주세요."
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setNicknameValid(null);
              }}
              className="avatar-nickname-input"
            />
            <button onClick={checkNickname} className={`nickname-check-btn ${nickname.trim() ? "active" : ""}`}>
              중복 확인
            </button>
          </div>

          {nicknameValid === true && <p className="nickname-hint valid">사용 가능한 닉네임입니다.</p>}
          {nicknameValid === false && <p className="nickname-hint invalid">이미 사용 중인 닉네임입니다.</p>}

          <button className="password-submit-btn" onClick={handleRegister}>
            가입 완료
          </button>
        </div>
      </div>

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
