import { Link, useNavigate, useParams } from "react-router-dom";
import useFetchBlog from "../customHooks/useFetchBlog";
import axios from "axios";

const Blog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blog, loading, error } = useFetchBlog(`http://localhost:8080/api/blogs/${id}`);

  if (loading) {
    return <div className="px-4 py-16 text-center text-gray-600">Loading blog...</div>;
  }

  if (error) {
    return <div className="px-4 py-16 text-center text-red-600">{error}</div>;
  }
  const actualBlog = blog?.blog || blog;

  return (
    <div className="min-h-screen px-4 flex flex-col items-center justify-center">
      <div className="mx-auto rounded-2xl border border-white p-8 shadow-lg max-w-lg space-y-2">
        <div className="flex items-center justify-center overflow-hidden">
          <img src={`http://localhost:8080/uploads/${actualBlog.image}`} alt={actualBlog.title} className="object-cover" />
        </div>
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-600">
          {actualBlog?.category || "Blog"}
        </p>
        <h1 className="text-3xl font-semibold text-gray-900">
          {actualBlog?.title || "Blog not found"}
        </h1>
        <p className=" whitespace-pre-line text-gray-700">
          {actualBlog?.description || "No content available."}
        </p>
        <div className="flex gap-4 mt-4">
          <Link to={`/blogs/update/${id}`} className="px-3 py-2 bg-amber-300 rounded">update</Link>
          <button onClick={async ()=>{
            if(!confirm('Delete this blog?')) return;
            try{
              await axios.delete(`http://localhost:8080/api/blogs/${id}`, { withCredentials: true }); // credencials ?
              navigate('/dashboard')
              window.location.reload();
            }catch(err){
              console.error(err);
              alert('Failed to delete');
            }
          }} className="px-3 py-1 bg-red-300 rounded cursor-pointer">delete</button>
        </div>
      </div>
      <Link to="/dashboard"><h1 className="text-lg my-4 hover:underline self-start">Home</h1></Link>
    </div>
  );
};

export default Blog;