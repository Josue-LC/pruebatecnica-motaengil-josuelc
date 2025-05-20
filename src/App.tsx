import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PrivateRoute from "./utilities/PrivateRoute";
import About from "./pages/About"
import Contact from "./pages/Contact"

export default function App() {
  return (
<Router>
  <Routes>
    {/* Ruta pública */}
    <Route path="/login" element={<Login />} />

    {/* Rutas protegidas */}
    <Route
      path="/home"
      element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      }
    />
    <Route
      path="/contact"
      element={
        <PrivateRoute>
          <Contact />
        </PrivateRoute>
      }
    />
    <Route
      path="/about"
      element={
        <PrivateRoute>
          <About />
        </PrivateRoute>
      }
    />

    {/* Ruta por defecto o 404 */}
    <Route path="*" element={<Login />} />
  </Routes>
</Router>

  );
}
