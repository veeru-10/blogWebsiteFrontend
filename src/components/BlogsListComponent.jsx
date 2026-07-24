import { Link } from "react-router-dom";
import useFetchBlogs from "../customHooks/useFetchBlogs";
import axios from 'axios';
import { useState } from "react";
import { LoaderCircle } from "lucide-react";


const BlogsListComponent = () => {
  const [deleting, setDeleting] = useState(false)
  const { blogs, loading, error } = useFetchBlogs(`${import.meta.env.VITE_API_URL}/api/blogs`);


  if (loading) {
    return <div className="mt-8 text-center text-gray-200">Loading blogs...</div>;
  }

  if (error) {
    return <div className="mt-8 text-center text-red-200">{error}</div>;
  }

  const blogList = Array.isArray(blogs) ? blogs : blogs?.blogs || [];

  return (
    <div className="mt-8 grid md:grid-cols-2 gap-4">
      {blogList.length > 0 ? (
        blogList.map((blog) => {
          const blogId = blog._id || blog.id;
          return (
            <div
              key={blogId}
              className="rounded-2xl border border-amber-200 bg-white p-3 text-left shadow-sm transition hover:shadow-md"
            >
              <Link to={`/blog/${blogId}`}>
                <div className="w-full rounded-xl h-50 bg-gray-500 flex items-center justify-center overflow-hidden">
                  {blog.image ? <img src={blog.image.startsWith('http') && blog.image} className="w-full h-full object-cover" alt={blog.title} /> : <p className="text-white/70">No image</p> }
                </div>
              </Link>
              <p className="text-sm font-semibold uppercase tracking-wide text-amber-600 mt-4">
                {blog.category || "Blog"}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-gray-900">
                {blog.title || "Untitled Blog"}
              </h3>
              <p className="mt-3 text-sm text-gray-600">
                {blog.description || "No description available."}
              </p>
              <div className="mt-4 flex gap-2">
                <Link to={`/blogs/update/${blogId}`} className="px-3 py-1 bg-amber-300 rounded">update</Link>
                <button onClick={async ()=>{
                  if(!confirm('Delete this blog?')) return;
                  try{
                    setDeleting(true)
                    await axios.delete(`${import.meta.env.VITE_API_URL}/api/blogs/${blogId}`, { withCredentials: true }); // here also
                    window.location.reload();
                  }catch(err){
                    console.error(err);
                    alert('Failed to delete');
                    setDeleting(false)
                  }
                }} className="px-3 py-1 bg-red-300 rounded cursor-pointer"
                disabled={deleting}>
                  {deleting ? (
                    <div className="flex items-center justify-center gap-2">
                          <span className="animate-spin duration-500 text-sm"><LoaderCircle/></span>
                          deleting...
                        </div>
                  ) : "Delete"}
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-wgite font-semibold">No blogs found.</p>
      )}
    </div>
  );
};

export default BlogsListComponent;