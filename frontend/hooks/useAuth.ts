"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface RegisterInfo {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface LoginInfo {
  email: string;
  password: string;
}

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ Register API
  const registerUser = async (data: RegisterInfo) => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3002/api/user/register", data);

      const role = response.data.user?.role?.toLowerCase();
      const token = response.data.user?.token;

      if (token) {
        localStorage.setItem("token", token);
      }

      if (role === "employee") {
        router.push("/jobsdashboard");
      } else if (role === "organization") {
        router.push("/jobCreation");
      } else {
        router.push("/adminPage");
      }

      return response.data;
    } catch (error: any) {
      console.error("Error registering user:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Login API
  const loginUser = async (login: LoginInfo) => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3002/api/user/login", login);

      const role = response.data.user?.role?.toLowerCase();
      const token = response.data.user?.token;

      if (token) {
        localStorage.setItem("token", token);
      }

      if (role === "employee") {
        router.push("/jobsdashboard");
      } else if (role === "organization") {
        router.push("/jobCreation");
      } else {
        router.push("/adminPage");
      }

      return response.data;
    } catch (error: any) {
      console.error("Error logging in:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loginUser, loading };
};
