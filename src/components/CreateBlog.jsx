import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const CreateBlog = () => {

  const [title,setTitle]=useState("");

  const [description,setDescription]=useState("");

  const [image,setImage]=useState(null);

  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category",category);
      formData.append("description", description);
      if (image) formData.append("image", image);

      await axios.post("http://localhost:8080/api/blogs", formData, {
        withCredentials: true, //here also
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Failed to create blog');
    }
  }


  return (
    <div>
      <section className="min-h-screen flex items-center justify-center flex-col px-4">
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-semibold mb-4">Create Your Own Blog</h1>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Image</label>
              <input className="w-full text-sm text-gray-600 file:py-2 file:px-4 file:rounded file:border-0 file:bg-amber-100 file:cursor-pointer" type="file" name="image" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Title</label>
              <input className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300" type="text" name="title" onChange={(e)=>setTitle(e.target.value)} placeholder="Your Title.." value={title} required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Category</label>
              <input className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300" type="text" name="title" onChange={(e)=>setCategory(e.target.value)} placeholder="Title Category.." value={category} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300 resize-y min-h-25 max-h-50" name="description" placeholder="Overview of your blog..." onChange={(e)=>setDescription(e.target.value)} value={description}></textarea>
            </div>
            <div className="mt-2">
              <button type="submit" className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600">Create Blog</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default CreateBlog