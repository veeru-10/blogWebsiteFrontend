import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/profile", { withCredentials: true });
      setProfile(response.data);
      return response.data;
    } catch (error) {
      console.log("User is anonymous:", error.response?.status);
      setProfile(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadProfile = async () => {
      await fetchProfile();
    };

    loadProfile();
  }, []);

  const logout = async () => {
    try {
      await axios.post("http://localhost:8080/api/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout request error details:", err);
    } finally {
      setProfile(null);
      window.location.href = "/";
    }
  };

  return (
    <AuthContext.Provider value={{ profile, setProfile, logout, loading, refreshUser: fetchProfile }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;