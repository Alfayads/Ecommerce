"use client";

import React, { useEffect, useState } from "react";
import { Eye, EyeOff, Mail, Phone, User, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector , useDispatch} from "react-redux";
import { authRequest , authSuccess , authFailure } from "@/redux/slices/authSlice";



export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
  });

  const togglePasswordVisibility = () => {
    setFormData((prev) => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  };

  const {isAuthenticated , loading} = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const router = useRouter();

  useEffect(() => { 
    // Redirect if user is already authenticated
    if (isAuthenticated) {
      router.push('/'); // Redirect to home or dashboard
    }
  }, [isAuthenticated, router]);


  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simulate API call
    const { name, email, phone, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    authRequest();
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


  return (
    <div className="min-h-screen flex flex-row-reverse bg-white text-black">
      {/* Left Form */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-black mb-2">Create Account 🛒</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {step === 1 && "Step 1: Personal Information"}
              {step === 2 && "Step 2: Secure Your Account"}
              {step === 3 && "Step 3: Confirm & Submit"}
            </p>
          </div>

          {/* Step Indicator */}
          <div className="flex space-x-2 mb-6">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-2 rounded-full ${
                  step >= s ? "bg-black" : "bg-gray-200"
                }`}
              ></div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <>
                {/* Name */}
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                  />
                </div>
                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                  />
                </div>
                {/* Phone */}
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  Next
                </button>
              </>
            )}

            {step === 2 && (
              <>
                {/* Password */}
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={formData.showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="pl-10 pr-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={togglePasswordVisibility}
                  >
                    {formData.showPassword ? (
                      <EyeOff className="text-gray-400" />
                    ) : (
                      <Eye className="text-gray-400" />
                    )}
                  </button>
                </div>
                {/* Confirm Password */}
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={formData.showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    required
                    className="pl-10 pr-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="py-3 px-6 bg-gray-200 rounded-lg"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="py-3 px-6 bg-black text-white rounded-lg hover:bg-gray-800"
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                {/* Final card */}
                <div className="bg-gray-100 p-6 rounded-xl shadow-md">
                  <div className="flex items-center space-x-4">
                    <Image
                      src="/images/icons/avatar.png"
                      alt="Avatar"
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{formData.name}</h3>
                      <p className="text-gray-600">{formData.email}</p>
                      <p className="text-gray-500">
                        {formData.showPassword ? formData.password : '••••••••'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="py-3 px-6 bg-gray-200 rounded-lg"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="py-3 px-6 bg-black text-white rounded-lg hover:bg-gray-800"
                  >
                    {loading ? "Registering..." : "Submit"}
                  </button>
                </div>
              </>
            )}
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/account/login" className="text-black font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div
        className="hidden lg:flex flex-1 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/auth/login-bg.jpg')" }}
      ></div>
    </div>
  );
}
