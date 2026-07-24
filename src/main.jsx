import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../Layout.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import Home from './components/Home.jsx'
import Blog from './components/Blog.jsx'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import CreateBlog from './components/CreateBlog.jsx'
import UpdateBlog from './components/UpdateBlog.jsx'
import Dashboard from './components/Dashboard.jsx'
import { AuthProvider } from './components/AuthContext.jsx'

const router = createBrowserRouter([{
  path : "/",
  element : <Layout/>,
  errorElement : <ErrorPage/>,
  children : [
    { path : '/', element : <Home/> },
    { path : '/dashboard', element : <Dashboard/> },
    { path : '/blog/:id', element : <Blog/> },
    { path : '/login', element : <Login/> },
    { path : '/signup', element : <SignUp/> },
    { path : '/createBlog', element : <CreateBlog/> },
    { path : '/blogs/update/:id', element : <UpdateBlog/> },
  ]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
)
