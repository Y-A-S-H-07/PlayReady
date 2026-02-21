function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-6">PlayReady</h1>
      <p className="text-gray-400 mb-8">
        Smart Practice & Tournament Management
      </p>
      <div className="space-x-4">
        <a href="/login" className="bg-green-500 px-6 py-2 rounded">
          Login
        </a>
        <a href="/register" className="bg-gray-700 px-6 py-2 rounded">
          Register
        </a>
      </div>
    </div>
  )
}

export default Landing
