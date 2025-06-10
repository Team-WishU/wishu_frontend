import React, { useState } from "react";
import "../../styles/ChatBot/FloatingChatButton.css";
import ChatPreviewModal from "./ChatPreviewModal";

const FloatingChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {isOpen && <ChatPreviewModal />}
      <button className="floating-chat-button" onClick={toggleChat}>
        {isOpen ? "❌" : "💭"}
      </button>
    </>
  );
};

export default FloatingChatButton;
