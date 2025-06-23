const API_BASE = process.env.REACT_APP_API_URL;

interface ChatRequest {
  message: string;
  nickname?: string;
}

// ✅ 메시지 전송 API
export const fetchRecommendations = async (data: ChatRequest) => {
  const payload = {
    message: data.message,
    ...(data.nickname?.trim() && { nickname: data.nickname }),
  };

  const response = await fetch(`${API_BASE}/chatbot/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  return result;
};

// 챗봇 상태 초기화 API
export const resetChat = async (nickname?: string) => {
  const payload = {
    ...(nickname?.trim() && { nickname }),
  };

  const response = await fetch(`${API_BASE}/chatbot/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to reset chatbot session.");
  }

  return await response.json();
};
