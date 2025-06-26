export default function HomeContent() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Welcome Back!</h1>
        <p className="text-gray-600 mb-6">
          Explore your dashboard and manage your account.
        </p>
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}