const API_BASE = process.env.REACT_APP_API_URL;

interface ChatRequest {
  message: string;
  userId?: string;
}

// 메시지 전송 API (userId로 수정)
export const fetchRecommendations = async (data: ChatRequest) => {
  const payload = {
    message: data.message,
    ...(data.userId?.trim() && { userId: data.userId }),
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

// 챗봇 상태 초기화 API (userId로 수정)
export const resetChat = async (userId?: string) => {
  const payload = {
    ...(userId?.trim() && { userId }),
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
