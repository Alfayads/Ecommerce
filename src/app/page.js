'use client';

import LandingPage from "@/components/user/LandingPage";
import HomeContent from "@/components/user/HomeContent";
import { useSelector } from "react-redux";


export default function HomePage() {

  const { isAuthenticated  } = useSelector((state) => state.auth);

  return (
  <div className="min-h-screen bg-white">
      {isAuthenticated ? <HomeContent /> : <LandingPage />}
    </div>
  );
}