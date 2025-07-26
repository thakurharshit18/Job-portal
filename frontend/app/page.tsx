"use client";
import type React from "react";
import { Button } from "@/components/ui/button"; // If using shadcn/ui or similar
import Link from "next/link";
import gsap from 'gsap';
import { useEffect } from "react";

export default function Home() {
useEffect(()=>{
gsap.to("#mainHeading",{
  duration:0.7,
  y:-100,
  ease:"power",
  stagger:1,
  opacity:1
})
},[]);
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-400 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl md:text-8xl font-extrabold text-gray-900 mb-4 leading-tight opacity-0" id="mainHeading">
          Find Your <span className="text-blue-600">Dream Job</span> Today
        </h1>
        <p className="text-lg md:text-4xl text-gray-600 mb-8">
          Discover thousands of job opportunities tailored to your skills. Join the platform where talent meets opportunity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login">
            <Button className="px-6 py-3 rounded-full text-2xl font-medium shadow-md hover:shadow-lg transition bg-blue-600 hover:bg-blue-700 text-white">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button className="px-6 py-3 rounded-full text-2xl font-medium shadow-md hover:shadow-lg transition border border-blue-600 text-blue-600 hover:bg-blue-100">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
