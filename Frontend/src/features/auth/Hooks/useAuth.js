import { useContext,useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  const { user, setUser, Loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);

    try {
      const data = await login({ email, password });
      setUser(data.user);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);

    try {
      const data = await register({ username, email, password });
      setUser(data.user);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);

    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetMe = async () => {
    setLoading(true);

    try {
      const data = await getMe();
      setUser(data.user);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    Loading,
    handleLogin,
    handleRegister,
    handleLogout,
    handleGetMe,
  };
};