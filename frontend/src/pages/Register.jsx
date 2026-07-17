import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/ongc_logo.png";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    employeeId: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.fullName ||
      !formData.employeeId ||
      !formData.email ||
      !formData.phone ||
      !formData.role ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Registration Successful!");
      navigate("/");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl p-10">

        <div className="text-center mb-8">
          <img
            src={logo}
            alt="ONGC"
            className="w-20 h-20 mx-auto mb-4"
          />

          <h1 className="text-3xl font-bold">
            Create <span className="text-red-600">New Account</span>
          </h1>

          <p className="text-gray-500 mt-2">
            ONGC Real-Time Safety Monitoring System
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-100 text-red-700 border border-red-300 rounded-lg p-3">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">

          <div>
            <label className="font-semibold text-sm">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter Full Name"
              className="w-full border rounded-lg p-3 mt-1"
            />
          </div>

          <div>
            <label className="font-semibold text-sm">
              Employee ID
            </label>

            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="Enter Employee ID"
              className="w-full border rounded-lg p-3 mt-1"
            />
          </div>

          <div>
            <label className="font-semibold text-sm">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="w-full border rounded-lg p-3 mt-1"
            />
          </div>

          <div>
            <label className="font-semibold text-sm">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              className="w-full border rounded-lg p-3 mt-1"
            />
          </div>

          <div>
            <label className="font-semibold text-sm">
              Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-1"
            >
              <option value="">Select Role</option>
              <option>Worker</option>
              <option>Supervisor</option>
              <option>Safety Officer</option>
              <option>Admin</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-sm">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create Password"
              className="w-full border rounded-lg p-3 mt-1"
            />
          </div>

          <div>
            <label className="font-semibold text-sm">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full border rounded-lg p-3 mt-1"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition"
          >
            {loading ? "Creating Account..." : "CREATE ACCOUNT"}
          </button>

        </form>

        <div className="text-center mt-8">
          <span className="text-gray-600">
            Already have an account?
          </span>

          <button
            onClick={() => navigate("/")}
            className="ml-2 text-red-600 font-bold hover:text-red-700"
          >
            Login
          </button>
        </div>

      </div>
    </div>
  );
}