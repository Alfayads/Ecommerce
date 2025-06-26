'use client';

import React, { useRef, useState , useEffect} from 'react';
import { useRouter } from 'next/navigation';

export default function VerifyOtp() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);



  // Move focus to next input
  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  useEffect(() => {
  const isAuth = localStorage.getItem('isAuthenticated') === 'true';
  if (isAuth) {
    router.replace('/'); // 👈 redirect home
  }
}, []);


  // Backspace to previous
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    console.log('Entered OTP:', enteredOtp);

    // Fake validation: assume correct OTP is "1234"
    if (enteredOtp === '1234') {
      router.push('/');
    } else {
      alert('Invalid OTP');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">OTP Verification</h2>
        <p className="text-gray-600 mb-6">Enter the 4-digit code sent to your email</p>
        
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-4 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-14 h-14 text-center text-2xl font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}
