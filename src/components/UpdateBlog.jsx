import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetchBlog from "../customHooks/useFetchBlog";
import UpdateBlogShimmerUi from '../shimmerUi/UpdateBlogShimmerUi'
import axios from "axios";
import {LoaderCircle} from 'lucide-react'

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blog, loading, error } = useFetchBlog(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`); // it is blank

  const actualBlog = blog?.blog || {}; 

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [updatingSpinner, setUpdateingSpinner] = useState(false);

  //when actual data changes it triggers useeffect
  useEffect(()=>{
    if (actualBlog) {
      setTitle(actualBlog.title);
      setDescription(actualBlog.description);
      setCategory(actualBlog.category);
    }
  },[actualBlog]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      if (image) formData.append('image', image);
      setUpdateingSpinner(true);
      await axios.put(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate(`/blog/${id}`);
    } catch (err) {
      console.error(err);
      alert('Failed to update blog');
      setUpdateingSpinner(false)
    }
  };

  if (loading) return <UpdateBlogShimmerUi/>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* <UpdateBlogShimmerUi/> */}
      <section className="w-full max-w-2xl p-6 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-4">Update Blog</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Image (optional)</label>
            <input className="w-full text-sm text-gray-600 file:py-2 file:px-4 file:rounded file:border-0 file:bg-amber-100" type="file" name="image" onChange={(e) => setImage(e.target.files[0])} />
            {actualBlog.image && (
              <div className="mt-2">
                <img src={actualBlog.image.startsWith('http') && actualBlog.image} alt="current" className="h-28 object-cover rounded" />
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300 resize-y min-h-25 max-h-50" required />
          </div>
          <div>
            <button type="submit" className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 cursor-pointer"
            disabled={updatingSpinner}>{
              updatingSpinner ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="animate-spin duration-500"><LoaderCircle/></span>
                  wait a sec...
                </div>
              ) : "update"
            }</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateBlog;