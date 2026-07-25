
const UpdateBlogShimmerUi = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl h-[704px] p-6 bg-gray-700/10 border border-gray-400 backdrop-blur-md rounded-lg shadow">
        <h1 className="bg-gray-400 mb-4 w-full h-[40px] rounded animate-pulse"></h1>
        <form className="flex flex-col gap-4">
          <div className="mb-4 bg-gray-400 mb-4 w-full h-[150px] rounded animate-pulse"></div>
          <div className="mb-4 bg-gray-400 w-full h-[65px] rounded animate-pulse"></div>
          <div className="mb-4 bg-gray-400 w-full h-[65px] rounded animate-pulse"></div>
          <div className="mb-4 bg-gray-400 w-full h-[100px] rounded animate-pulse"></div>
          <div>
            <div className="mb-4 bg-gray-400 w-[83px] h-[40px] rounded animate-pulse"></div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateBlogShimmerUi