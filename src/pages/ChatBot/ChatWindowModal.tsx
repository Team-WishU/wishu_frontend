import React from "react";
import "../../styles/ChatBot/ChatWindowModal.css";

const ChatWindowModal: React.FC = () => {
  return (
    <div className="chat-window-modal">
      {/* header */}
      <div className="chat-window-header">
        <div className="chat-window-logo-circle">
          <img
            src="/assets/icons/logo.png"
            alt="WishU"
            className="chat-window-logo"
          />
        </div>
        <div className="chat-window-header-text">
          <h3>WishU</h3>
          <p className="chat-window-sub">
            운영시간 보기{" "}
            <img
              src="/assets/Chat/see.svg"
              alt="see"
              className="chat-window-see-icon"
            />
          </p>
        </div>
      </div>

      <div className="chat-window-body">
        {/* message area */}
        <div className="chat-window-content">
          <div className="chat-window-bubble">
            <div className="chat-window-logo-circle small">
              <img
                src="/assets/icons/logo.png"
                alt="WishU"
                className="chat-window-small-logo"
              />
            </div>
            <div className="chat-window-message-box">
              원하시는 분위기를 말씀해주시면,
              <br />
              WishU가 추천해드려요
              <br />
              <i>"Nice to meet you, New WishU!"</i>
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="chat-window-footer">
          <div className="chat-window-tags">
            <button>러블리</button>
            <button>캐쥬얼</button>
            <button>직시크</button>
            <button>스트릿</button>
          </div>
          <div className="chat-window-input-wrap">
            <input
              className="chat-window-input"
              placeholder="키워드를 입력하세요"
            />
            <div className="chat-window-icons">
              <img
                src="/assets/Chat/smile.svg"
                alt="smile"
                className="chat-window-icon"
              />
              <img
                src="/assets/Chat/clip.svg"
                alt="clip"
                className="chat-window-icon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindowModal;
