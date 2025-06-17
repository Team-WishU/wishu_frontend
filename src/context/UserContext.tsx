import React, { createContext, useContext, useState, useEffect } from "react";

interface UserInfo {
  name: string;
  email: string;
  avatar: string;
  nickname?: string; // 추가
}

interface UserContextType {
  user: UserInfo;
  isLoggedIn: boolean;
  login: (user: UserInfo) => void;
  logout: () => void;
  withdraw: () => void;
}

const defaultUser: UserInfo = { name: "", email: "", avatar: "", nickname: "" };

const UserContext = createContext<UserContextType>({
  user: defaultUser,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  withdraw: () => {},
});

const API_BASE = process.env.REACT_APP_API_URL;

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserInfo>(defaultUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const formatAvatar = (avatar: string) => {
    if (!avatar) return "";
    return avatar.includes("/assets")
      ? avatar
      : `/assets/images/Signup/${avatar}`;
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("accessToken");

    if (storedUser && token) {
      const parsed = JSON.parse(storedUser);
      setUser({
        name: parsed.nickname || parsed.name || "",
        email: parsed.email,
        avatar: formatAvatar(parsed.profileImage || parsed.avatar || ""),
        nickname: parsed.nickname || "", // 추가
      });
      setIsLoggedIn(true);
    }

    const handler = () => {
      const updatedUser = localStorage.getItem("user");
      const updatedToken = localStorage.getItem("accessToken");
      if (!updatedUser || !updatedToken) {
        setUser(defaultUser);
        setIsLoggedIn(false);
      } else {
        const parsed = JSON.parse(updatedUser);
        setUser({
          name: parsed.nickname || parsed.name || "",
          email: parsed.email,
          avatar: formatAvatar(parsed.profileImage || parsed.avatar || ""),
          nickname: parsed.nickname || "", // 추가
        });
        setIsLoggedIn(true);
      }
    };

    window.addEventListener("userUpdated", handler);
    return () => window.removeEventListener("userUpdated", handler);
  }, []);

  const login = (user: UserInfo) => {
    const formatted = {
      ...user,
      avatar: formatAvatar(user.avatar),
    };
    setUser(formatted);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(formatted));
    window.dispatchEvent(new Event("userUpdated"));
  };

  const logout = () => {
    setUser(defaultUser);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    window.dispatchEvent(new Event("userUpdated"));
  };

  const withdraw = async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/withdraw`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "회원 탈퇴 실패");
      }

      setUser(defaultUser);
      setIsLoggedIn(false);
      localStorage.clear();
      window.dispatchEvent(new Event("userUpdated"));
    } catch (err: any) {
      console.error("회원 탈퇴 실패:", err.message);
      alert("회원 탈퇴 중 오류 발생: " + err.message);
      throw err;
    }
  };

  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, logout, withdraw }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
