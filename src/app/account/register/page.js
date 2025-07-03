'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authSuccess } from '@/redux/slices/authSlice';
import { addUser } from '@/redux/slices/userSlice';
import { UserPlus } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required.';
    if (!formData.lastName) newErrors.lastName = 'Last name is required.';
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid.';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // In a real app, you would dispatch an async thunk to register the user via an API.
      // For this demo, we'll simulate a successful registration directly.
      
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
      };

      // Dispatch authSuccess to log the user in
      dispatch(authSuccess(userData));
      
      // Dispatch addUser to add them to the global user list for the admin panel
      dispatch(addUser(userData));

      // Redirect to profile page
      router.push('/account/profile');
    }
  };

  const inputClass = (field) => `mt-1 block w-full rounded-lg border px-3 py-2 text-base shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:border-transparent ${errors[field] ? 'border-red-500 text-red-900 placeholder-red-300 focus:ring-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-black'}`;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link href="/account/login" className="font-medium text-black hover:text-gray-700">
              sign in to your existing account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-md" onSubmit={handleRegister}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label htmlFor="firstName" className="sr-only">First Name</label><input id="firstName" name="firstName" type="text" required className={inputClass('firstName')} placeholder="First Name" value={formData.firstName} onChange={handleChange} />{errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}</div>
              <div><label htmlFor="lastName" className="sr-only">Last Name</label><input id="lastName" name="lastName" type="text" required className={inputClass('lastName')} placeholder="Last Name" value={formData.lastName} onChange={handleChange} />{errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}</div>
            </div>
            <div><label htmlFor="email-address" className="sr-only">Email address</label><input id="email-address" name="email" type="email" autoComplete="email" required className={inputClass('email')} placeholder="Email address" value={formData.email} onChange={handleChange} />{errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}</div>
            <div><label htmlFor="password" className="sr-only">Password</label><input id="password" name="password" type="password" autoComplete="current-password" required className={inputClass('password')} placeholder="Password" value={formData.password} onChange={handleChange} />{errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}</div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"><span className="absolute left-0 inset-y-0 flex items-center pl-3"><UserPlus className="h-5 w-5 text-gray-400 group-hover:text-gray-300" aria-hidden="true" /></span>Create Account</button>
          </div>
        </form>
      </div>
    </div>
  );
}

