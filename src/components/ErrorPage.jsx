import { Link } from 'react-router-dom'
import error from '/404.png'
import { useContext } from 'react'
import AuthContext from "./AuthContext"
const ErrorPage = () => {
  const { profile } = useContext(AuthContext) || {}
  return (
    <>
      <section className='min-h-screen flex flex-col items-center justify-center'>
        <div className='sm:w-[400px] w-[300px] overflow-hidden'>
          <img src={error} alt="wrong url path image showcase" className='bg-gray-400 rounded-xl object-cover'/>
        </div>
        <Link className='mt-3 bg-black/5 px-2 py-1 rounded border border-black/30' to={profile?.role ? '/dashboard' : '/'}>Back To Home</Link>
      </section>
    </>
  )
}

export default ErrorPage