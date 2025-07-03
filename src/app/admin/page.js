'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Users, ShoppingCart, DollarSign, Package } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import OrderStatusSelector from '@/components/admin/OrderStatusSelector';
import { fetchProducts } from '@/redux/slices/productSlice';
import LoadingOverlay from '@/components/common/LoadingOverlay';

export default function AdminPage() {
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);

  const orders = useSelector((state) => state.orders?.orders || []);
  const { items: products, loading: productsLoading } = useSelector((state) => state.products);
  const allUsers = useSelector((state) => state.users?.users || []);

  useEffect(() => {
    setIsClient(true);
    // Fetch products if they are not already in the store to ensure all data is available.
    if (isClient && products.length === 0 && !productsLoading) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length, productsLoading, isClient]);

  // --- Data Calculation ---
  // NOTE: In a real app, aggregations like total revenue should be calculated on the backend.
  const totalRevenue = orders.reduce((acc, order) => !['Cancelled', 'Pending Payment'].includes(order.status) ? acc + order.total : acc, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalUsers = allUsers ? allUsers.length : 0;

  const recentOrders = orders ? [...orders].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5) : [];
  const recentUsers = allUsers ? [...allUsers].sort((a, b) => new Date(b.dateJoined) - new Date(a.dateJoined)).slice(0, 5) : [];

  if (!isClient) {
    return <LoadingOverlay message="Loading Admin Dashboard..." />;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={DollarSign} title="Total Revenue" value={`₹${totalRevenue.toFixed(2)}`} description="Excludes cancelled & pending" />
          <StatCard icon={ShoppingCart} title="Total Orders" value={totalOrders} description={`${orders.filter(o => o.status === 'Processing').length} processing`} />
          <StatCard icon={Users} title="Total Customers" value={totalUsers} description={allUsers ? `${allUsers.filter(u => u.role === 'Admin').length} admins` : ''} />
          <StatCard icon={Package} title="Total Products" value={totalProducts} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders Table */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">Order ID</th>
                    <th scope="col" className="px-6 py-3">Customer</th>
                    <th scope="col" className="px-6 py-3">Total</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                    <th scope="col" className="px-6 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">#{order.id}</td>
                      <td className="px-6 py-4">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</td>
                      <td className="px-6 py-4 font-semibold">₹{order.total.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <OrderStatusSelector orderId={order.id} currentStatus={order.status} />
                      </td>
                      <td className="px-6 py-4">{new Date(order.date).toLocaleDateString('en-CA')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Customers List */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Customers</h2>
            <div className="space-y-4">
              {recentUsers.map(user => (
                <div key={user.id} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <p className="text-xs text-gray-400">Joined {new Date(user.dateJoined).toLocaleDateString('en-CA')}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}