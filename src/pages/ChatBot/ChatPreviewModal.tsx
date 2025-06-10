import React from "react";
import "../../styles/ChatBot/ChatPreviewModal.css";

interface ChatPreviewModalProps {
  onStartChat: () => void;
}

const ChatPreviewModal: React.FC<ChatPreviewModalProps> = ({ onStartChat }) => {
  return (
    <div className="chat-modal">
      {/* 헤더 영역 */}
      <div className="chat-header">
        <div className="chat-logo-circle">
          <img src="/assets/icons/logo.png" alt="WishU" className="chat-logo" />
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

          <button className="chat-start-btn" onClick={onStartChat}>
            채팅하기{" "}
            <img
              src="/assets/Chat/chat.svg"
              alt="chat icon"
              className="chat-icon"
            />
          </button>
        </div>
      </div>{" "}
    </div>
  );
};

export default ChatPreviewModal;
