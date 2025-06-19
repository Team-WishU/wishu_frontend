import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ChatBot/ChatWindowModal.css";
import { fetchRecommendations } from "../../apis/chatApi";

const ChatWindowModal: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");
  const chatContentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initMessage = {
      type: "bot",
      content:
        '원하시는 분위기를 말씀해주시면,\nWishU가 추천해드려요\n"Nice to meet you, New WishU!"',
    };
    setMessages([initMessage]);
  }, []);

  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages]);

  const handleTagClick = async (tag: string) => {
    if (!tag.trim()) return;

    setMessages((prev) => [...prev, { type: "user", content: tag }]);
    setInputValue("");
    setMessages((prev) => [...prev, { type: "loading" }]);

    try {
      const result = await fetchRecommendations(tag);
      if (!result || !result.messages || result.messages.length === 0) return;

      const newMessages = result.messages.map((msg: any) => ({
        type: msg.type || "bot",
        content: msg.content || "",
        products: msg.products?.map((p: any) => ({
          _id: p._id,
          title: p.title,
          price: p.price,
          imageUrl: p.imageUrl,
          productUrl: p.productUrl,
        })),
      }));

      // remove loading and add new messages
      setMessages((prev) => [
        ...prev.filter((m) => m.type !== "loading"),
        ...newMessages,
      ]);
    } catch (error) {
      console.error("Error fetching recommendations", error);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleTagClick(inputValue);
    }
  };

  const handleItemClick = (id: string) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="chat-window-modal">
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
            운영시간 보기
            <img
              src="/assets/Chat/see.svg"
              alt="see"
              className="chat-window-icon"
            />
          </p>
        </div>
      </div>

      <div className="chat-window-body">
        <div className="chat-window-content" ref={chatContentRef}>
          {messages.map((msg, idx) => (
            <div key={`msg-${idx}`} className={`chat-msg ${msg.type}`}>
              {msg.type === "bot" && msg.content && (
                <div className="chat-window-bubble">
                  <div className="chat-window-logo-circle small">
                    <img
                      src="/assets/icons/logo.png"
                      alt="WishU"
                      className="chat-window-small-logo"
                    />
                  </div>
                  <div className="chat-window-message-box">
                    {msg.content.split("\n").map((line: string, i: number) => (
                      <div key={`line-${idx}-${i}`}>{line}</div>
                    ))}
                  </div>
                </div>
              )}

              {msg.type === "loading" && (
                <div className="chat-window-bubble">
                  <div className="chat-window-logo-circle small">
                    <img
                      src="/assets/icons/logo.png"
                      alt="WishU"
                      className="chat-window-small-logo"
                    />
                  </div>
                  <div className="chat-window-message-box">...</div>
                </div>
              )}

              {msg.products &&
                msg.products.map((item: any, i: number) => (
                  <div
                    key={`product-${i}`}
                    className="chat-window-product"
                    onClick={() => handleItemClick(item._id)}
                  >
                    <img
                      src={item?.imageUrl || "/assets/placeholder.png"}
                      alt={item?.title || "상품 이미지"}
                      className="chat-window-product-image"
                    />
                    <div className="chat-window-product-info">
                      <div className="chat-window-product-title">
                        {item?.title ?? "제목 없음"}
                      </div>
                      <div className="chat-window-product-price">
                        {item?.price != null
                          ? `${item.price.toLocaleString()}원`
                          : "가격 미정"}
                      </div>
                    </div>
                  </div>
                ))}

              {msg.type === "user" && (
                <div className="chat-window-bubble chat-window-user-text">
                  {msg.content}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="chat-window-footer">
          <div className="chat-window-tags">
            {["러블리", "캐주얼", "스포티", "유니크"].map((tag) => (
              <button key={tag} onClick={() => handleTagClick(tag)}>
                {tag}
              </button>
            ))}
          </div>
          <div className="chat-window-input-wrap">
            <input
              className="chat-window-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="키워드를 입력하세요"
            />
            <div className="chat-window-icons">
              <svg
                className={`chat-window-icon ${
                  inputValue.trim() ? "active" : "inactive"
                }`}
                width="18"
                height="18"
                viewBox="0 0 14 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  if (inputValue.trim()) handleTagClick(inputValue);
                }}
              >
                <path
                  d="M5.29654 6.16516L7.19178 5.01402L9.08702 3.86287M12.7235 2.7207L8.41489 10.2466C8.02876 10.921 7.83557 11.2584 7.60255 11.3366C7.40044 11.4045 7.17232 11.3773 6.98962 11.2628C6.77896 11.1309 6.66125 10.7556 6.42667 10.0059L5.33675 6.52228C5.29953 6.4033 5.28084 6.34402 5.25097 6.28974C5.22446 6.24157 5.1918 6.19643 5.15309 6.15567C5.11047 6.11078 5.05836 6.07311 4.95666 5.99961L1.83302 3.74175C1.16226 3.25691 0.826881 3.01432 0.773826 2.78664C0.727813 2.58918 0.78747 2.38675 0.933898 2.24293C1.10274 2.0771 1.5192 2.04401 2.35196 1.97826L11.6414 1.24478C12.2961 1.19308 12.6236 1.16733 12.819 1.2794C12.9892 1.37702 13.1068 1.53727 13.1405 1.71778C13.1792 1.9249 13.0269 2.19083 12.7235 2.7207Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindowModal;
