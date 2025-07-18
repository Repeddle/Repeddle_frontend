// AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import {
  registerUserService,
  deleteUserService,
  forgetPasswordService,
  getUserService,
  loginUser,
  sendVerifyEmailService,
  updateUserService,
  verifyEmailService,
  resetUserPasswordService,
  getSuggestUsernameService,
  unFollowUserService,
  followUserService,
  addToWishlistService,
  removeFromWishlistService,
  getWishlistService,
} from "../services/auth";
import { IUser, UpdateUser, Wishlist } from "../types/user";
import socket from "../socket";

interface Props {
  children?: ReactNode;
}

export const AuthContext = createContext<{
  user: IUser | null;
  error: string | null;
  loading: boolean;
  authErrorModalOpen: boolean;
  setAuthErrorModalOpen: (value: boolean) => void;
  sendVerifyEmail: (credentials: { email: string }) => Promise<boolean>;
  verifyEmail: (credentials: { token: string }) => Promise<boolean>;
  registerUser: (tokenData: {
    token: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
  }) => Promise<boolean>;
  login: (credentials: { email: string; password: string }) => Promise<{
    isError: boolean;
    error?: string;
  }>;
  sendForgetPasswordEmail: (credentials: { email: string }) => Promise<boolean>;
  getUser: () => Promise<IUser | null>;
  updateUser: (userData: UpdateUser) => Promise<IUser | null>;
  logout: () => void;
  deleteUser: (id: string) => Promise<boolean | null>;
  resetPassword: (password: string, token: string) => Promise<boolean>;
  getSuggestUsername: (body: {
    firstName: string;
    lastName: string;
    otherText?: string;
  }) => Promise<string[]>;
  unFollowUser: (userId: string) => Promise<string | null>;
  followUser: (userId: string) => Promise<string | null>;
  addToWishlist: (productId: string) => Promise<string | null>;
  removeFromWishlist: (productId: string) => Promise<string | null>;
  getWishlist: () => Promise<Wishlist[] | null>;
} | null>(null);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [authErrorModalOpen, setAuthErrorModalOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleError = (error: any) => {
    setLoading(false);

    // Check if the error indicates an invalid or expired token
    if (error === "Token expired" || error === "Invalid token") {
      setError("");
      // Set the state to open the auth error modal
      setAuthErrorModalOpen(true);
    } else {
      setError(error || "An error occurred.");
    }
  };

  const sendVerifyEmail = async (userData: { email: string }) => {
    try {
      setError("");
      setLoading(true);
      const response = await sendVerifyEmailService(userData);
      setLoading(false);
      return !!response;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  const verifyEmail = async (tokenData: { token: string }) => {
    try {
      setError("");
      const response = await verifyEmailService(tokenData);
      return !!response;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  const registerUser = async (tokenData: {
    token: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
  }) => {
    try {
      setError("");
      const response = await registerUserService(tokenData);
      return !!response;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
    try {
      setError("");
      setLoading(true);
      const authenticatedToken = await loginUser(credentials);
      if (authenticatedToken) {
        setAuthToken(authenticatedToken);
        setLoading(false);
        setAuthErrorModalOpen(false);
        return { isError: false };
      }
      setLoading(false);
      return { isError: true };
    } catch (error) {
      handleError(error);
      return { isError: true, error: error as string };
    }
  };

  const sendForgetPasswordEmail = async (userData: { email: string }) => {
    try {
      setError("");
      setLoading(true);
      const response = await forgetPasswordService(userData);
      setLoading(false);
      return !!response;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  const getSuggestUsername = async (body: {
    firstName: string;
    lastName: string;
    otherText?: string;
  }) => {
    try {
      const response = await getSuggestUsernameService(body);

      return response;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getUser = async () => {
    try {
      setError("");
      setLoading(true);
      const authenticatedUser = await getUserService();
      if (authenticatedUser && authenticatedUser.role !== "Guest") {
        setUser(authenticatedUser);
        return authenticatedUser;
      }
      return null;
    } catch (error) {
      handleError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };
  const unFollowUser = async (userId: string) => {
    try {
      setError("");
      setLoading(true);
      const result = await unFollowUserService(userId);

      if (user) {
        const following = user.following.filter((fl) => fl !== userId);
        const newUser = user;
        newUser.following = following;

        setUser(newUser);
      }

      setLoading(false);
      return result;
    } catch (error) {
      handleError(error as string);
      setLoading(false);
      return error as string;
    }
  };

  const followUser = async (userId: string) => {
    try {
      setError("");
      setLoading(true);
      const result = await followUserService(userId);

      if (user) {
        const following = [...user.following, userId];
        const newUser = user;
        newUser.following = following;

        setUser(newUser);
      }

      setLoading(false);
      return result;
    } catch (error) {
      handleError(error as string);
      setLoading(false);
      return error as string;
    }
  };

  const updateUser = async (userData: UpdateUser) => {
    try {
      setError("");
      const updatedUser = await updateUserService(userData);
      if (updatedUser) {
        setUser(updatedUser);
        return updatedUser;
      }
      return null;
    } catch (error) {
      handleError(error);
      return null;
    }
  };

  const deleteUser = async (id: string) => {
    try {
      setError("");
      const result = await deleteUserService(id);
      if (result) {
        // getAllUser();
        await logout();
        return result;
      }
      return null;
    } catch (error) {
      handleError(error);
      return null;
    }
  };

  const resetPassword = async (password: string, token: string) => {
    try {
      setError("");
      setLoading(true);
      await resetUserPasswordService(password, token);
      setLoading(false);
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  const addToWishlist = async (productId: string) => {
    if (!user) return null;
    try {
      setError("");
      const result = await addToWishlistService(productId);
      const newUser = { ...user, wishlist: result.wishlist };

      setUser(newUser);
      return result.message;
    } catch (error) {
      handleError(error);
      return null;
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!user) return null;
    try {
      setError("");
      const result = await removeFromWishlistService(productId);
      const newUser = { ...user, wishlist: result.wishlist };

      setUser(newUser);
      return result.message;
    } catch (error) {
      handleError(error);
      return null;
    }
  };

  const getWishlist = async () => {
    try {
      setError("");
      const result = await getWishlistService();

      return result;
    } catch (error) {
      handleError(error);
      return null;
    }
  };

  const logout = async () => {
    // await logoutUser()
    setUser(null);
    localStorage.removeItem("authToken");
  };

  useEffect(() => {
    if (user) {
      socket.emit("login", user._id);
    }
  }, [user]);

  useEffect(() => {
    const checkUser = async () => {
      const savedToken = authToken || localStorage.getItem("authToken");
      if (savedToken) {
        await getUser();
      }
      setLoading(false);
    };
    checkUser();
  }, [authToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        followUser,
        unFollowUser,
        loading,
        authErrorModalOpen,
        setAuthErrorModalOpen,
        sendVerifyEmail,
        verifyEmail,
        registerUser,
        login,
        sendForgetPasswordEmail,
        getUser,
        updateUser,
        resetPassword,
        logout,
        deleteUser,
        getSuggestUsername,
        addToWishlist,
        removeFromWishlist,
        getWishlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
