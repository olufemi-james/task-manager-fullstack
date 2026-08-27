import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { toast } from "react-toastify";

function ResetPassword() {

    const { token } = useParams();

    const navigate = useNavigate();

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

                setLoading(true);

        try {

            const response = await authService.resetPassword(
                token,
                password
            );

            toast.success(response.message);
               setPassword("");
               setConfirmPassword("");

           setTimeout(() => {

                navigate("/login");

            }, 2000);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to reset password."

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

                <h1 className="text-3xl font-bold text-center mb-6">

                    Reset Password

                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
                       </label>

                        <input
                            type="password"
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e)=>
                                setPassword(e.target.value)
                            }
                            required
                        />

                         <label className="block text-sm font-medium text-gray-700 mt-4 mb-2">
                                Confirm Password
                         </label>
                                <input
                                    type="password"
                                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg disabled:bg-gray-400"
                    >

                        {loading

                            ? "Updating..."

                            : "Reset Password"}

                    </button>

                </form>

            </div>

        </div>

    );

}

export default ResetPassword;