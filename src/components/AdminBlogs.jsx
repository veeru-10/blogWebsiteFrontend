// import { Link } from "react-router-dom";
import useFetchBlogs from "../customHooks/useFetchBlogs"
// import axios from "axios";
const AdminBlogs = () => {
  const { blogs, loading, error } = useFetchBlogs(`${import.meta.env.VITE_API_URL}/api/admin`);
  if (loading) {
    return <div className="mt-8 text-center text-gray-200">Loading blogs...</div>;
  }

  if (error) {
    return <div className="mt-8 text-center text-red-200">{error}</div>;
  }
  return (
    <>
      <section className="mt-8 grid md:grid-cols-2 gap-4">
        {
          blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog._id || blog.id}
                className="rounded-2xl border-amber-200 bg-white p-3 text-left shadow-sm transition hover:shadow-md space-y-2">
                {/* <Link to={`/blog/${blog._id}`}></Link> */}
                <div className="w-full rounded-xl h-50 bg-gray-500 flex items-center justify-center overflow-hidden">
                  <img src={blog.image && blog.image.startsWith('http') && blog.image} className="w-full h-full object-cover" alt={blog.title} />
                </div>
                <p className="text-sm font-semibold uppercase tracking-wide text-amber-600 mt-4">
                  {blog.category || "Blog"}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-gray-900">
                  {blog.title || "Untitled Blog"}
                </h3>
                <p className="mt-3 text-sm text-gray-600">
                  {blog.description || "No description available."}
                </p>
                <div className="flex items-center px-4 py-2 gap-3 bg-black/5 border border-black/20 backdrop-blur-lg text-black rounded-xl">
                  <div className="size-10 p-4 rounded-full bg-amber-400 border text-center flex items-center">
                    <span className="font-bold">{blog.user.name.charAt(0).toUpperCase() || "U"}</span>
                  </div>
                  <div className="text-gray-500 text-sm">
                    <p>{blog.user.name}</p>
                    <p className="">{blog.user.email}</p>
                  </div>
                </div>
                {/* <div className="mt-4 flex gap-2">
                  <Link to={`/blogs/update/${blog._id}`} className="px-3 py-1 bg-amber-300 rounded">update</Link>
                  <button onClick={async () => {
                    if (!confirm('Delete this blog?')) return;
                    try {
                      await axios.delete(`http://localhost:8080/api/blogs/${blog._id}`, { withCredentials: true }); // here also
                      // window.location.reload();
                    } catch (err) {
                      console.error(err);
                      alert('Failed to delete');
                    }
                  }} className="px-3 py-1 bg-red-300 rounded cursor-pointer">delete</button>
                </div> */}
              </div>
            ))
          ) : (
            <div className="text-white font-semibold">No blogs Found</div>
          )
        }
      </section>
    </>
  )
}

export default AdminBlogs