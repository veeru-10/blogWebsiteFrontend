import { useState, useEffect } from "react";

function useFetchBlog(url) {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  async function getData() {
    try {
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch food data");
      const resData = await res.json();
      setBlog(resData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return { blog, loading, error};
}

export default useFetchBlog;