const API_BASE = process.env.REACT_APP_API_URL;

export const fetchRecommendations = async (tag: string) => {
  const response = await fetch(`${API_BASE}/chatbot/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: tag }), // ✅ 전송 메시지
  });

  const result = await response.json();

  // ✅ 전체 응답 객체 반환 (예: { success: true, messages: [...] })
  return result;
};
