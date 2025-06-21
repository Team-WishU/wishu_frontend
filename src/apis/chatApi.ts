// src/apis/chatApi.ts

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000"; // fallback

export const fetchRecommendations = async (tag: string) => {
  const response = await fetch(`${API_BASE}/chatbot/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: tag }),
  });

  if (!response.ok) {
    throw new Error("AI 서버 또는 백엔드와 연결할 수 없습니다.");
  }

  const result = await response.json();

  return result; // { messages: [...] }
};
