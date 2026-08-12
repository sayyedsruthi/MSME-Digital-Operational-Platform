import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { authService } from "../services/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser =
      localStorage.getItem("msme_user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  const login = async (payload) => {
    try {
      const response =
        await authService.login(payload);

      const { user, token } =
        response.data.data;

      localStorage.setItem(
        "msme_user",
        JSON.stringify(user)
      );

      localStorage.setItem(
        "msme_token",
        token
      );

      setUser(user);

      return user;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  };

  const register = async (payload) => {
    try {
      const response =
        await authService.register(payload);

      const { user, token } =
        response.data.data;

      localStorage.setItem(
        "msme_user",
        JSON.stringify(user)
      );

      localStorage.setItem(
        "msme_token",
        token
      );

      setUser(user);

      return user;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("msme_user");
    localStorage.removeItem("msme_token");

    setUser(null);
  };

  useEffect(() => {
    const loadProfile = async () => {
      const token =
        localStorage.getItem("msme_token");

      if (!token) return;

      try {
        const response =
          await authService.profile();

        const profileUser =
          response.data.data;

        setUser(profileUser);

        localStorage.setItem(
          "msme_user",
          JSON.stringify(profileUser)
        );
      } catch (error) {
        logout();
      }
    };10

    loadProfile();
  }, []);

  const value = useMemo(
    () => ({
      user,
      login,
      register,
      logout,
      isAuthenticated: Boolean(user),
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}