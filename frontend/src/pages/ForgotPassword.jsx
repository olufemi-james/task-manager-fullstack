import { useState } from "react";
import authService from "../services/authService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await authService.forgotPassword(email);
      toast.success(response.message);
      setEmail(""); // Optional: clear the input after success
    } catch (error) {
        toast.error(
            error.response?.data?.message ||
            "Something went wrong."
        );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Forgot Password
        </h1>

        <p className="text-gray-500 text-center mt-2 mb-6">
          Enter your email address and we'll send you a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

            <p className="mt-6 text-center text-sm text-gray-600">
                    Remember your password?{" "}
                    <Link
                        to="/login"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Back to Login
                    </Link>
             </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>


      </div>
    </div>
  );
}

export default ForgotPassword;