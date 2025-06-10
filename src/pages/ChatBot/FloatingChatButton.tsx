import React, { useState } from "react";
import "../../styles/ChatBot/FloatingChatButton.css";
import ChatPreviewModal from "./ChatPreviewModal";
import ChatWindowModal from "./ChatWindowModal";

const FloatingChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inChatMode, setInChatMode] = useState(false);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };
  const openChatPreview = () => {
    setIsOpen(true);
    setInChatMode(false);
  };

  const closeChat = () => {
    setIsOpen(false);
    setInChatMode(false);
  };

  return (
    <>
      {isOpen &&
        (inChatMode ? (
          <ChatWindowModal />
        ) : (
          <ChatPreviewModal onStartChat={() => setInChatMode(true)} />
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
