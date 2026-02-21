import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import TeamHome from "./pages/TeamHome"
import EventDetail from "./pages/EventDetail"
import CreateEvent from "./pages/CreateEvent"
import TeamMembers from "./pages/TeamMembers"



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/team/:teamId/members" element={<TeamMembers />} />
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-event/:teamId" element={<CreateEvent />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/team/:teamId"
          element={
            <ProtectedRoute>
              <TeamHome />
            </ProtectedRoute>
          }
        />


        <Route
          path="/event/:eventId"
          element={
            <ProtectedRoute>
              <EventDetail />
            </ProtectedRoute>
          }
        />



      </Routes>
    </BrowserRouter>
  )
}

export default App
