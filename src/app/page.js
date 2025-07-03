'use client';

import { useState, useEffect } from 'react';
import HomeContent from "@/components/user/HomeContent";
import LandingPage from "@/components/user/LandingPage";
import { useSelector } from "react-redux";

export default function HomePage() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after the initial render.
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/*
        On the server and during the initial client render, `isClient` is false,
        so we always render the same content, preventing a hydration mismatch.
      */}
      {isClient && isAuthenticated ? <HomeContent /> : <LandingPage />}
    </div>
  );
}