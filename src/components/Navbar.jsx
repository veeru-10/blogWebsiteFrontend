// import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState, useRef } from "react"
import AuthContext from "./AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { profile, logout } = useContext(AuthContext);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dropDownRef = useRef(null);
  useEffect(()=>{
    const handleScroll = () => {
      if(window.scrollY > 20) {
        setIsScrolled(true)
      }else {
        setIsScrolled(false)
      }
    };
    window.addEventListener('scroll',handleScroll); 
    return () => {
      window.removeEventListener('scroll', handleScroll)
    };
  },[])
  

  useEffect(()=> {
    function clickOutsideListener(e) {
      if(dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setDropDownOpen(false);
      }
    }
    document.addEventListener('mousedown', clickOutsideListener);
    return () => document.removeEventListener('mousedown', clickOutsideListener)
  }, []);

  const profileInitial = profile?.name ? profile.name.charAt(0).toUpperCase() : 'U';
  return (
    <>
      {/* sticky top-0 */}
      <nav className={`fixed left-0 right-0 top-0 z-50 p-4 flex justify-between items-center bg-gray-900/10 w-full ${isScrolled ? 'h-16 bg-white/20 backdrop-blur-md border-b border-gray-200/50 shadow-sm' : 'h-20 bg-transparent'}`}>
        <Link to={profile ? '/dashboard' : '/'}>
          <h1 className="font-semibold text-2xl">Blog Posts <span className="text-amber-700">App</span></h1>
        </Link>
        {profile ? (
          <div className="relative" ref={dropDownRef}>
            <button 
            onClick={()=>setDropDownOpen(!dropDownOpen)}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-100 shadow-lg font-bold text-lg border-2  border-transparent hover:border-amber-500 focus:outline-none transition-all uppercase cursor-pointer"
            aria-label="toggle user options box"
            >
              {profile.profileImg ? (
                <img src={profile.profileImg} alt={profile.name} className="w-full h-full object-cover rounded-full" />
              ) : (
                <span>{profileInitial}</span>
              )}
            </button>
            {dropDownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-sky-200 border border-gray-400 rounded-xl shadow-xl py-2 ps-3 space-y-2 z-50 animate-in fade-in slide-in-from-top-1 duration-100">
                <div className="">
                  <p className="text-sm font-semibold text-gray-800 capitalize truncate">{profile.name}</p>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{profile.email}</p>
                  <p className="text-sm font-bold">{profile.role}</p>
                </div>
                <button
                  onClick={() => { setDropDownOpen(false); logout(); }}
                  className="text-center px-4 py-2 rounded-xl text-sm bg-red-50 text-red-600 hover:bg-red-100 font-semibold border border-red-300 cursor-pointer transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-6 me-4 text-lg items-center">
            <Link to="/login"><button className="cursor-pointer text-gray-600 hover:underline hover:text-amber-700 transition-colors duration-200">Login</button></Link>
            <Link to="/signup"><button className="cursor-pointer text-gray-600 hover:underline hover:text-black transition-colors duration-200">SignUp</button></Link>
          </div>
        )}
        
      </nav>
    </>
  )
}

export default Navbar