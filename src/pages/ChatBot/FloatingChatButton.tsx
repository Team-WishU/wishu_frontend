import React, { useState } from "react";
import "../../styles/ChatBot/FloatingChatButton.css";
import ChatPreviewModal from "./ChatPreviewModal";
import ChatWindowModal from "./ChatWindowModal";

const FloatingChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inChatMode, setInChatMode] = useState(false);

  const openChatPreview = () => {
    setIsOpen(true);
    setInChatMode(false);
  };

  const closeChat = () => {
    setIsOpen(false);
    setInChatMode(false);
  };

  const startChat = () => {
    setInChatMode(true);
  };

  return (
    <>
      {isOpen &&
        (inChatMode ? (
          <ChatWindowModal onClose={closeChat} />
        ) : (
          <ChatPreviewModal onStartChat={startChat} onClose={closeChat} />
        ))}
      <button
        className={`floating-chat-button ${isOpen ? "close" : ""}`}
        onClick={isOpen ? closeChat : openChatPreview}
      >
        {isOpen ? (
          <img
            src="/assets/Chat/X.svg"
            alt="닫기"
            className="floating-chat-icon"
          />
        ) : (
          "💭"
        )}
      </button>
    </>
  );
};

export default FloatingChatButton;
