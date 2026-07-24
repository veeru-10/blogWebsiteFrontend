import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from 'lucide-react'

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, { name, email, password, role : selectedRole }, { withCredentials: true });
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Sign up failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="min-w-md">
        <div className="w-full max-w-md rounded-2xl border border-amber-200 bg-white p-8 shadow-xl">
          <h2 className="mb-6 text-center text-3xl font-semibold text-gray-900">Sign Up</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                required
              />
            </div>
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
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 relative"
                  required
                />
                <button 
                type="button"
                onClick={()=>setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pe-4 flex items-center cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <EyeClosed/> : <Eye/>}
                </button>
              </div>
            </div>
            <div className="">
              <label className="mb-1 block text-sm font-medium text-gray-700">Role</label>
              <select value={selectedRole} onChange={(e)=>setSelectedRole(e.target.value)} className="w-full px-3 py-2 rounded-lg outline-0 border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200">
                <option value="user" >User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-black px-4 py-2 font-medium text-white transition hover:bg-gray-800 cursor-pointer"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;