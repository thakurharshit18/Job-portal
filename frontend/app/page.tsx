"use client";
import React from "react";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { SparklesCore } from "@/components/ui/sparkles";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { useRouter } from "next/navigation";
import { signIn,signOut, useSession } from "next-auth/react";
export default function Home() {
  const router = useRouter();
  const session = useSession();
  return (
    <div className="w-full h-screen  flex flex-col">
      {/* Header */}
      <header className="flex justify-end p-4 gap-5">
        <RainbowButton onClick={()=>signIn("google",{callbackUrl:"/jobsdashboard"})}> Login </RainbowButton>
      </header>

      {/* Main Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        {/* Title */}
        <h1 className="md:text-4xl text-3xl lg:text-5xl font-bold text-white relative z-20 mb-6">
          HireNeXT
        </h1>

        {/* Sparkles Animation */}
        <div className="w-[40rem] max-w-full h-40 relative mb-8">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Core Component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />

          {/* Radial Gradient */}
          <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" />
        </div>

        {/* Description */}
        <TypingAnimation
          duration={40}
          delay={0}
          className="text-white font-light text-lg md:text-2xl max-w-3xl"
        >
          HireNeXT is your modern job portal where talented job seekers and
          forward-thinking organizations connect seamlessly — making hiring and
          career growth faster, smarter, and easier.
        </TypingAnimation>
      </main>
    </div>
  );
}
