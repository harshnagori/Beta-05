// src/pages/Login.jsx
const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#0056B3] mb-6">
          Welcome Back
        </h2>
        <form className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#007AFF]"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#007AFF]"
          />
          <button className="w-full bg-[#0056B3] text-white p-3 rounded-lg hover:bg-[#004999] transition">
            Login
          </button>
        </form>
        <p className="text-center text-sm mt-4 text-gray-600">
          Don’t have an account?{" "}
          <a href="#" className="text-[#007AFF] hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
