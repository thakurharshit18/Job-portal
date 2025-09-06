"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>✅ Signed in as {session.user?.name || session.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <p>❌ Not signed in</p>
      <button onClick={() => signIn("github")}>Sign in with GitHub</button>
    </div>
  );
}
