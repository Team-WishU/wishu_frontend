import React, { createContext, useContext, useState, useEffect } from "react";

interface UserInfo {
  name: string;
  email: string;
  avatar: string;
}

interface UserContextType {
  user: UserInfo;
  isLoggedIn: boolean;
  login: (user: UserInfo) => void;
  logout: () => void;
}

const defaultUser = { name: "", email: "", avatar: "" };

const UserContext = createContext<UserContextType>({
  user: defaultUser,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserInfo>(defaultUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const formatAvatar = (avatar: string) => {
    if (!avatar) return "";
    return avatar.includes("/assets") ? avatar : `/assets/images/Signup/${avatar}`;
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

  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
