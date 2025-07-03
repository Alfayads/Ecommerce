import Link from 'next/link';

export default function AccountPage() {
  return (
    <div className='bg-white'>
      <h1 className="text-2xl font-semibold mb-4">Account Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Welcome to your account dashboard! Here you can get a quick overview of your recent activity and manage your account settings.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-lg mb-2">Manage Profile</h3>
          <p className="text-sm text-gray-500 mb-3">Update your personal information and password.</p>
          <Link href="/account/profile" className="text-sm font-medium text-black hover:underline">
            Go to Profile
          </Link>
        </div>
        <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-lg mb-2">View Orders</h3>
          <p className="text-sm text-gray-500 mb-3">Track your recent orders and view your order history.</p>
          <Link href="/account/orders" className="text-sm font-medium text-black hover:underline">
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}