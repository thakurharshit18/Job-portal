"use client";
import { useState } from "react";
import axios from "axios";

interface RegisterInfo {
  name: string;
  email: string;
  password: string;
}

interface LoginInfo {
  email: string;
  password: string;
}

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  // ✅ Register API
  const registerUser = async (data: RegisterInfo) => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3002/api/user/register", data);
      localStorage.setItem("token",response.data.user.token);
      return response.data;
    } catch (error: any) {
      console.error("Error registering user:", error);
      throw error; // optional: let the component handle it
    } finally {
      setLoading(false);
    }
  };

  // ✅ Login API
  const loginUser = async (Login: LoginInfo) => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3002/api/user/login", Login); // ✅ fix endpoint
      localStorage.setItem("token",response.data.user.token);
      return response.data;
    } catch (error: any) {
      console.error("Error logging in:", error);
      throw error; // optional: let component show error
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loginUser, loading };
};
