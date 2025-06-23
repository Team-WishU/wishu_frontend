import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ChatBot/ChatWindowModal.css";
import { fetchRecommendations, resetChat } from "../../apis/chatApi";
import { useUser } from "../../context/UserContext";

interface ChatWindowModalProps {
  onClose: () => void;
}

const ChatWindowModal: React.FC<ChatWindowModalProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [initialChoiceVisible, setInitialChoiceVisible] = useState(true);
  const [showTagButtons, setShowTagButtons] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const chatContentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user } = useUser();

  const tagOptionsByCategory: Record<
    string,
    { value: string; label: string }[]
  > = {
    상의: [
      { value: "스트릿", label: "스트릿" },
      { value: "심플", label: "심플" },
      { value: "미니멀", label: "미니멀" },
      { value: "러블리", label: "러블리" },
      { value: "걸리시", label: "걸리시" },
      { value: "캐주얼", label: "캐주얼" },
      { value: "유니크", label: "유니크" },
      { value: "하이틴", label: "하이틴" },
      { value: "오버핏", label: "오버핏" },
      { value: "크롭", label: "크롭" },
    ],
    하의: [
      { value: "시크", label: "시크" },
      { value: "스트릿", label: "스트릿" },
      { value: "미니멀", label: "미니멀" },
      { value: "캐주얼", label: "캐주얼" },
      { value: "러블리", label: "러블리" },
      { value: "페미닌", label: "페미닌" },
      { value: "하이웨스트", label: "하이웨스트" },
      { value: "롱스커트", label: "롱스커트" },
      { value: "와이드핏", label: "와이드핏" },
      { value: "키치", label: "키치" },
    ],
    신발: [
      { value: "스포티", label: "스포티" },
      { value: "스트릿", label: "스트릿" },
      { value: "시크", label: "시크" },
      { value: "러블리", label: "러블리" },
      { value: "클래식", label: "클래식" },
      { value: "빈티지", label: "빈티지" },
      { value: "유니크", label: "유니크" },
      { value: "슬림핏", label: "슬림핏" },
    ],
    액세서리: [
      { value: "큐티", label: "큐티" },
      { value: "러블리", label: "러블리" },
      { value: "키치", label: "키치" },
      { value: "심플", label: "심플" },
      { value: "하이틴", label: "하이틴" },
      { value: "레트로", label: "레트로" },
      { value: "포인트", label: "포인트" },
      { value: "데일리", label: "데일리" },
    ],
    폰케이스: [
      { value: "유니크", label: "유니크" },
      { value: "큐티", label: "큐티" },
      { value: "키치", label: "키치" },
      { value: "하이틴", label: "하이틴" },
      { value: "레트로", label: "레트로" },
      { value: "컬러풀", label: "컬러풀" },
      { value: "심플", label: "심플" },
      { value: "글리터", label: "글리터" },
      { value: "무광", label: "무광" },
      { value: "투명", label: "투명" },
    ],
  };

  const categoryList = Object.keys(tagOptionsByCategory);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        // nickname → user._id
        await resetChat(user?._id);
      } catch (err) {
        console.error("챗봇 상태 초기화 실패", err);
      }

      const welcomeMessage = {
        type: "bot",
        content:
          '원하시는 분위기를 말씀해주시면,\nWishU가 추천해드려요\n"Nice to meet you, New WishU!"',
      };
      setMessages([welcomeMessage]);
    };

    initializeChat();
  }, []);

  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages, initialChoiceVisible]);


  const handleInitialChoiceClick = (choice: string) => {
    setMessages((prev) => [...prev, { type: "user", content: choice }]);
    setInitialChoiceVisible(false);
    setShowTagButtons(choice.includes("전체 태그별"));
    sendMessage(choice);
  };

  const sendMessage = async (msg: string) => {
    if (!msg.trim()) return;

    setInputValue("");
    setMessages((prev) => [...prev, { type: "loading" }]);

    try {
      const result = await fetchRecommendations({
        message: msg,
        userId: user?._id,
      });

      if (!result || !result.messages || result.messages.length === 0) return;

      const newMessages = result.messages.map((m: any) => ({
        type: m.type || "bot",
        content: m.content || "",
        buttons: m.buttons || [],
        products: m.products?.map((p: any) => ({
          _id: p._id,
          title: p.title,
          price: p.price,
          imageUrl: p.imageUrl,
          productUrl: p.productUrl,
        })),
      }));

      setMessages((prev) => [
        ...prev.filter((m) => m.type !== "loading"),
        ...newMessages,
      ]);
    } catch (error) {
      console.error("메시지 전송 오류", error);
      setMessages((prev) => prev.filter((m) => m.type !== "loading"));
      setMessages((prev) => [
        ...prev,
        { type: "bot", content: "서버와 통신 중 오류가 발생했습니다." },
      ]);
    }
  };

  const handleTagClick = (tag: string) => {
    setMessages((prev) => [...prev, { type: "user", content: tag }]);
    sendMessage(tag);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      setMessages((prev) => [...prev, { type: "user", content: inputValue }]);
      sendMessage(inputValue);
      setInputValue("");
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
          <div className="chat-window-sub-wrapper">
            <p className="chat-window-sub">
              운영시간 보기
              <img
                src="/assets/Chat/see.svg"
                alt="see"
                className="chat-window-icon"
              />
            </p>
            <div className="chat-window-tooltip">
              연중무휴 오전 10시 ~ 오후 10시
            </div>
          </div>
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

              {msg.type === "bot" && msg.buttons?.length > 0 && (
                <div className="chat-window-bot-buttons">
                  {msg.buttons.map((btn: any, i: number) => (
                    <button
                      key={`btn-${i}`}
                      onClick={() => handleTagClick(btn.id)}
                      className="chat-window-bot-button"
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              )}

              {msg.products?.map((item: any, i: number) => (
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

        <div className="chat-window-fixed-bottom">
          {initialChoiceVisible && (
            <div className="initial-choice-modal">
              <div
                className="initial-choice-button"
                onClick={() =>
                  handleInitialChoiceClick(
                    "나의 위시템과 유사상품 추천 받을래!"
                  )
                }
              >
                나의 위시템과 유사상품 추천 받을래!
              </div>
              <div className="initial-choice-separator" />
              <div
                className="initial-choice-button"
                onClick={() =>
                  handleInitialChoiceClick(
                    "전체 태그별 맘에 드는 태그 상품 추천 받을래!"
                  )
                }
              >
                전체 태그별 맘에 드는 태그 상품 추천 받을래!
              </div>
            </div>
          )}

          {showTagButtons && !selectedCategory && (
            <div className="chat-window-tags-container">
              <div className="chat-window-tags wrap-tags">
                {categoryList.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      sendMessage(category); // 여기에 메시지 전송 추가
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedCategory && (
            <div className="chat-window-tags-container">
              <div className="chat-window-tags scrollable-tags">
                {tagOptionsByCategory[selectedCategory].map((tag) => (
                  <button
                    key={tag.value}
                    onClick={() => handleTagClick(tag.value)}
                  >
                    {tag.label}
                  </button>
                ))}
                <div
                  className="chat-window-back-button"
                  onClick={() => setSelectedCategory(null)}
                >
                  카테고리 다시 선택
                </div>
              </div>
            </div>
          )}

          <div className="chat-window-input-wrap">
            <input
              className="chat-window-input"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              placeholder="키워드를 입력하세요"
            />
            <div className="chat-window-icons">
              <svg
                className={`chat-window-icon ${inputValue.trim() ? "active" : "inactive"
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
