import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../api/axios"

function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [collegeName, setCollegeName] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        collegeName
      })

      alert("Registered successfully")
      navigate("/login")
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || "Registration failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">

      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-8 rounded-2xl w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Create Account</h1>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 rounded bg-gray-700"
        />

        <input
          type="text"
          placeholder="College Name (Optional)"
          value={collegeName}
          onChange={(e) => setCollegeName(e.target.value)}
          className="w-full p-2 rounded bg-gray-700"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 rounded bg-gray-700"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 rounded bg-gray-700"
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg"
        >
          Register
        </button>

        <p className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>

      </form>
    </div>
  )
}

export default Register