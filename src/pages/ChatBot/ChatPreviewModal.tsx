import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import LoginModal from "../Home/RegisterModal/LoginModal";
import "../../styles/ChatBot/ChatPreviewModal.css";

interface ChatPreviewModalProps {
  onStartChat: () => void;
  onClose: () => void;
}

const ChatPreviewModal: React.FC<ChatPreviewModalProps> = ({
  onStartChat,
  onClose,
}) => {
  const { user } = useUser();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const handleStartChat = () => {
    if (user && user.email) {
      onStartChat();
    } else {
      alert("로그인 후 이용 가능합니다.");
      setLoginModalOpen(true);
      onClose(); // 챗봇 창 닫기!
    }
  };

  const handleLoginSuccess = () => {
    setLoginModalOpen(false);
    // 로그인 성공 후 별도 동작 없음 (챗봇은 자동으로 안 열림)
  };

  const handleSwitchToSignup = () => {
    // 회원가입 모달 열기 등 필요하면 여기에
  };

  return (
    <>
      <div className="chat-modal">
        {/* 헤더 영역 */}
        <div className="chat-header">
          <div className="chat-logo-circle">
            <img
              src="/assets/icons/logo.png"
              alt="WishU"
              className="chat-logo"
            />
          </div>
          <div className="chat-header-text">
            <h3>WishU</h3>
            <p className="chat-sub">
              운영시간 보기{" "}
              <img
                src="/assets/Chat/see.svg"
                alt="see more"
                className="see-icon"
              />
            </p>
          </div>
        </div>
        {/* 흰색 콘텐츠 박스 */}
        <div className="chat-message-box">
          <div className="chat-bubble">
            <div className="chat-bubble-header">
              <div className="chat-bubble-logo-text">
                <div className="chat-logo-circle small">
                  <img
                    src="/assets/icons/logo.png"
                    alt="WishU"
                    className="Schat-logo"
                  />
                </div>
                <div className="chat-bubble-text">
                  <strong>WishU</strong>
                  <p>
                    Hi, Wellcome ForNLOC!
                    <br />
                    원하는 스타일의 상품들을 키워드로 알려주세요.
                  </p>
                </div>
              </div>
            </div>

            <button className="chat-start-btn" onClick={handleStartChat}>
              채팅하기{" "}
              <img
                src="/assets/Chat/chat.svg"
                alt="chat icon"
                className="chat-icon"
              />
            </button>
          </div>
        </div>
      </div>

      {/* 로그인 모달 */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSwitchToSignup={handleSwitchToSignup}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default ChatPreviewModal;
