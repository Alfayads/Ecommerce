"use client";

import React, { useState , useEffect} from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { authRequest, authSuccess , authFailure } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(authRequest());
    try {
      // Simulate API call
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email === "user@gmail.com" && password === "password") {
            resolve({ data: { user: { email, name: "User" } } });
          } else {
            reject(new Error("Invalid email or password"));
          }
        }, 1000);
      });
      dispatch(authSuccess(response.data.user));
      router.push("/"); // Redirect to dashboard on success
    } catch (error) {
      dispatch(authFailure(error.message));
      alert("Login failed: " + error.message); // Show error message
    }
  };

  // Check if user is already authenticated
  const { isAuthenticated , loading} = useSelector((state) => state.auth);
 useEffect(() => {
    if (isAuthenticated) {
      router.push('/'); // safe redirect inside useEffect
    }
  }, [isAuthenticated, router]);

  // Render the login form
  // If user is not authenticated, show the login form
  // If user is authenticated, redirect to dashboard
  // This is a simple simulation, replace with actual API call in production
  // You can also add validation and error handling as needed

  return (
    <div className="min-h-screen flex">
      {/* Left: Form Side */}
      <div className="flex-1 bg-white text-black flex items-center justify-center px-6">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-black mb-2">
              Welcome Back 👋
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Sign in to manage your eCommerce store — track sales, manage
              products, and fulfill orders.
            </p>
          </div>

          <div className="mt-8 space-y-6">
            {/* Email */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Email address"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <a href="#" className="text-sm text-black hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-black focus:ring-black  cursor-pointer border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 text-sm  cursor-pointer text-gray-700"
                >
                  Remember me
                </label>
              </div>

              {/* Login Button */}
              <div>
                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full py-3 px-4 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition duration-200"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Google Sign-in */}
            <button
              type="button"
              className="w-full flex justify-center cursor-pointer items-center py-3 px-4 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50 transition"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don’t have an account?{" "}
                <Link
                  href="/account/register"
                  className="text-black font-medium hover:underline"
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Background Image */}
      <div
        className="hidden lg:flex flex-1 bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/images/auth/login-bg.jpg')", // <-- Your image in public/images/
        }}
      ></div>
    </div>
  );
}
