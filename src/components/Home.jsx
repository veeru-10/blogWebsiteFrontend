import { Link } from 'react-router-dom'
import blog from '/blogImg.jpg'

const features = [
  {
    title: 'Write freely',
    description: 'Share your thoughts, tutorials, ideas, and personal stories in a clean space built for creators.',
  },
  {
    title: 'Discover stories',
    description: 'Explore fresh posts from passionate writers and find inspiration in every category.',
  },
  {
    title: 'Grow your audience',
    description: 'Create, publish, and build your own blog presence with a simple and welcoming experience.',
  },
]

const recentPosts = [
  'How to build a better writing routine',
  'Why thoughtful design matters in web apps',
  'Simple habits for staying consistent as a creator',
]

const Dashboard = () => {
  return (
    <section className="min-h-screen bg-slate-100 backdrop-blur-lg border-2 border-white rounded-xl shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-600 shadow-sm">
              ✍️ Fresh ideas, every day
            </span>

            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                A place where your stories, insights, and ideas come to life.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                Welcome to a simple blog experience where you can write, read, and connect with a community that loves meaningful content.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/login"
                className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Start Writing
              </Link>
              <a
                href="#"
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
              >
                Explore Posts
              </a>
            </div>

            <div className="flex flex-wrap gap-6 pt-2 text-sm text-slate-500">
              <span>100+ readers</span>
              <span>Daily inspiration</span>
              <span>Easy publishing</span>
            </div>
          </div>

          <div className="relative">
            <img
              className="h-[420px] w-full rounded-3xl object-cover shadow-2xl"
              src={blog}
              alt="Hero section for the blog landing page"
            />
            <div className="absolute -bottom-5 left-5 rounded-2xl border border-slate-300 bg-white/90 px-4 py-3 shadow-lg backdrop-blur">
              <p className="text-sm font-semibold text-slate-800">New stories published weekly</p>
              <p className="text-sm text-slate-500">Discover something new every time</p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">{feature.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Recently shared</h2>
              <p className="mt-1 text-sm text-slate-500">A quick look at the kinds of stories you can expect here.</p>
            </div>
            <Link to="/login" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
              View all posts
            </Link>
          </div>

          <ul className="mt-6 space-y-3">
            {recentPosts.map((post) => (
              <li key={post} className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {post}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Dashboard;