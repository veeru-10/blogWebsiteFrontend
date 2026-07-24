import { Link } from "react-router-dom";
import useFetchBlogs from "../customHooks/useFetchBlogs";
import axios from 'axios';


const BlogsListComponent = () => {
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
                  <img src={blog.image && blog.image.startsWith('http') ? blog.image : `${import.meta.env.VITE_API_URL}/uploads/${blog.image}`} className="w-full h-full object-cover" alt={blog.title} />
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
                    await axios.delete(`${import.meta.env.VITE_API_URL}/api/blogs/${blogId}`, { withCredentials: true }); // here also
                    // window.location.reload();
                  }catch(err){
                    console.error(err);
                    alert('Failed to delete');
                  }
                }} className="px-3 py-1 bg-red-300 rounded cursor-pointer">delete</button>
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