import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// 토큰 만료 시 자동 로그아웃 처리
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("userUpdated"));
      alert("세션이 만료되어 자동 로그아웃됩니다.");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
