
import BlogsListComponent from "./BlogsListComponent";
import { CirclePlus } from 'lucide-react';
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./AuthContext";
import AdminBlogs from "./AdminBlogs";


const Dashboard = () => {
  const { profile } = useContext(AuthContext);
  const isAdmin = profile.role === "admin";
  return (
    <div className="min-h-screen">
      {/* <Navbar /> */}
      <Link to="/createBlog">
        <div className="inline-flex gap-2 bg-slate-400/50 px-3 py-2 rounded border-2 border-black/35 mt-5 ms-5">
          <CirclePlus/>
          <p className="font-semibold">Add a Blog</p>
        </div>
      </Link>
      <section className="py-12 md:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl bg-linear-to-r from-black to-amber-600 p-8 text-white shadow-xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-200">
              Welcome to
            </p>
            <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Blog Posts App</h1>
            <p className="mt-4 text-lg text-gray-100">
              Discover the latest stories, tutorials, and ideas from our community.
            </p>
          </div>
          {isAdmin ? <AdminBlogs/> : <BlogsListComponent />}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;