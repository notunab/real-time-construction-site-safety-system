import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/ongc_logo.png";

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
  e.preventDefault();

  setError("");

  if (!email || !password) {
    setError("Please fill in all fields");
    return;
  }

  setIsLoading(true);

  // Fake login delay
  setTimeout(() => {
    setIsLoading(false);

    // Go to dashboard
    navigate("/dashboard");
  }, 1000);
};

  return (
    <div className="w-1/2 h-screen bg-white flex items-center justify-center px-8 py-4">
      <div className="w-full max-w-xl h-[95vh] flex flex-col justify-center">

        {/* Logo and Header Section */}
        <div className="text-center mb-4">
          {/* Logo */}
          <div className="flex justify-center mb-2 p-1 bg-gradient-to-b from-red-50 to-white rounded-lg">
            <img
              src={logo}
              alt="ONGC Logo"
              className="w-16 h-16 object-contain brightness-150 contrast-125"
              style={{
                filter: 'brightness(1.2) contrast(1.3) drop-shadow(0 4px 6px rgba(0,0,0,0.3))'
              }}
            />
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-black text-gray-900 mb-2">
            Real-Time Safety <span className="text-red-600">Monitoring System</span>
          </h1>
          <p className="text-gray-500 text-xs font-medium">
            Sign in to your Control Room Dashboard
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-lg">
            <p className="text-red-700 text-sm font-semibold">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">

          {/* Email Field */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              Email / Username
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                👤
              </span>
              <input
                type="text"
                placeholder="Enter your email or username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all bg-white text-gray-900 placeholder-gray-400 text-xs font-medium"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                🔒
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all bg-white text-gray-900 placeholder-gray-400 text-xs font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition text-lg"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-red-600 cursor-pointer rounded"
              />
              <span className="text-xs text-gray-700 font-medium">
                Remember me
              </span>
            </label>
            <a
              href="#"
              className="text-xs font-bold text-red-600 hover:text-red-700 transition"
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4 text-sm shadow-lg"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                🔒 LOGIN TO DASHBOARD
              </>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-5">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-xs text-gray-500 font-bold">OR</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

           <div className="text-center">
  <span className="text-sm text-gray-600">
    New to the system?{" "}
  </span>

  <button
    type="button"
    onClick={() => navigate("/register")}
    className="text-red-600 font-bold hover:text-red-700 transition"
  >
    Create a New Account
  </button>
</div>

        </form>

        {/* Footer Section */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <p className="text-xs font-bold text-gray-700 mb-1">Need help?</p>
              <a
                href="#"
                className="text-xs text-red-600 hover:text-red-700 font-bold transition"
              >
                Contact System Administrator
              </a>
            </div>
            <div className="flex items-center gap-2 bg-green-50 px-2.5 py-1.5 rounded-lg border border-green-200 flex-shrink-0">
              <div className="w-4 h-4 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold">
                ✓
              </div>
              <div>
                <p className="text-xs font-bold text-gray-700">
                  Secure Access
                </p>
                <p className="text-xs text-gray-500">All data encrypted</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center">
            © 2026 ONGC Safety Ops. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
}
