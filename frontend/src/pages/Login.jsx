import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../api/axios"

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await api.post("/auth/login", {
        email,
        password
      })

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("userId", res.data.user._id)

      navigate("/dashboard")

    } catch (error) {
      alert("Invalid credentials")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-white">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 rounded bg-gray-700 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 rounded bg-gray-700 text-white"
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg text-white font-semibold transition duration-200"
        >
          Login
        </button>

        {/* 🔥 REGISTER LINK */}
        <p className="text-center text-gray-400 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login