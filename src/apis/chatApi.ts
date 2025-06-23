const API_BASE = process.env.REACT_APP_API_URL;

// 메시지 전송 API (accessToken 헤더로)
export const fetchRecommendations = async ({ message }: { message: string }) => {
  const accessToken = localStorage.getItem('accessToken');

  const response = await fetch(`${API_BASE}/chatbot/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: JSON.stringify({ message }),
  });

  const result = await response.json();
  return result;
};

// 챗봇 상태 초기화 API (accessToken 헤더로)
export const resetChat = async () => {
  const accessToken = localStorage.getItem('accessToken');

  const response = await fetch(`${API_BASE}/chatbot/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: JSON.stringify({}), // body 없이도 되지만 일관성
  });

  if (!response.ok) {
    throw new Error("Failed to reset chatbot session.");
  }

  return await response.json();
};
