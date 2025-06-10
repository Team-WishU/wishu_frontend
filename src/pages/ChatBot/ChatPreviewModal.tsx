import React from "react";
import "../../styles/ChatBot/ChatPreviewModal.css";

const ChatPreviewModal: React.FC = () => {
  return (
    <div className="chat-modal">
      <div className="chat-header">
        <img src="/assets/icons/logo.png" alt="WishU" className="chat-logo" />
        <div className="chat-header-text">
          <h3>WishU</h3>
          <p className="chat-sub">운영시간 보기 &gt;</p>
        </div>
      </div>
      <div className="chat-message-box">
        <div className="chat-bubble">
          <strong>WishU</strong>
          <p>
            Hi, Wellcome ForNLOC!
            <br />
            원하는 스타일의 상품들을 키워드로 알려주세요.
          </p>
        </div>
        <button className="chat-start-btn">채팅하기 ▷</button>
      </div>
    </div>
  );
};

export default ChatPreviewModal;
