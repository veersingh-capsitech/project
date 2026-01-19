import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Dashboard from "./pages/Dashboard";
import SingUp from "./pages/SingUp";
import Login from "./pages/login";
import PrivateRoute from "./PrivateRoute";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Navbar />


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/*" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />

        <Route path="/register" element={<><SingUp onClose={() => { }} /></>} />
        <Route path="/login" element={<><Login onClose={() => { }} /></>} />
      </Routes>
    </>
  )
}

export default App
