"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useAuth(); 
const router = useRouter();
  const handleSubmit = async () => {
    try {
      const response = await loginUser({ email, password });
      router.push('/jobsdashboard');
    } catch (error) {
      console.error("Error logging in user", error);  
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-[500px] h-[500px]">
        <h2 className="text-6xl  text-center font-bold mb-15">Login</h2>
        <div className="mb-10">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-5"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
