import { useState, useEffect } from "react";

function useFetchBlogs(url) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  async function getData() {
    try {
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch blog data");
      const resData = await res.json();
      setBlogs(resData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return { blogs, loading, error};
}

export default useFetchBlogs;