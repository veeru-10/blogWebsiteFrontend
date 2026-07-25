import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeClosed, Loader } from "lucide-react";
import AuthContext from "./AuthContext";




const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { refreshUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password }, { withCredentials: true });
      await refreshUser();
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed, enter valid credentials");
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="">
        <div className="min-w-md rounded-2xl border border-amber-200 bg-white p-8 shadow-xl">
          <h2 className="mb-6 text-center text-3xl font-semibold text-gray-900">Login</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={`${showPassword ? 'text' : 'password'}`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                  required
                />
                <button type="button" className="absolute inset-y-0 right-0 pe-4 flex items-center cursor-pointer" onClick={()=>setShowPassword(!showPassword)}>
                  {showPassword ? <EyeClosed/> : <Eye/>}
                </button>
              </div>
            </div>
            <div className="flex justify-between text-sm my-5 px-1">
              <p className=" text-blue-500 underline">Don't You have an account?</p>
              <Link to="/signup">SignUp</Link>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-amber-600 px-4 py-2 font-medium text-white transition hover:bg-amber-700 cursor-pointer"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="animate-spin duration-500"><Loader/></span>
                  Loging in...
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;