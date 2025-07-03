"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { User, ShoppingBag, MapPin, LogOut, LayoutDashboard } from 'lucide-react';

const accountNavItems = [
  { href: '/account', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/account/profile', label: 'Profile', icon: User },
  { href: '/account/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/account/addresses', label: 'Addresses', icon: MapPin },
];

export default function AccountLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // TODO: Dispatch your logout action from Redux here
    console.log("Logging out..."); // Placeholder for actual logout logic
    router.push('/account/login');
  };

  // Don't show the sidebar on login or register pages
  if (pathname === '/account/login' || pathname === '/account/register') {
    return <>{children}</>;
  }

  return (
    <div className="container bg-white mx-auto h-screen min-w-screen px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4">
          <div className="p-4 rounded-lg bg-gray-50 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Account Menu</h2>
            <nav className="flex flex-col space-y-1">
              {accountNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'bg-black text-white'
                      : 'text-gray-700 hover:bg-gray-200 hover:text-black'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-black transition-colors w-full text-left"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </aside>
        <main className="w-full md:w-3/4">
          <div className="bg-white p-6 rounded-lg shadow-sm min-h-[400px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}