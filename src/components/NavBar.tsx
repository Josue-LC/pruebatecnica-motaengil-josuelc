import { Link, useLocation } from "react-router-dom";
import { auth } from "../utilities/firebase";

import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  // Logout desde Firebase
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log("No se pudo cerrar sesión: ", error);
    }
  };

  const ubicacion = useLocation();
  const paginaActiva = ubicacion.pathname;

  return (
    <>
      <section className=" my-10">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-stretch w-full gap-4 lg:bg-transparent bg-[#171717]">
          {/* Image */}
          <div className="bg-[#171717] px-6 py-4 rounded-b-3xl rounded-l-none flex items-center lg:pr-20 pr-0">
            <img
              src="/images/landing/Layer_1.webp"
              alt="Logo"
              className="h-[5.875rem] w-full min-w-[12.5rem] object-contain"
            />
          </div>

          {/* Nav */}
          <div className="flex justify-center lg:justify-start px-4 items-center">
            <nav className="border-white border-2 rounded-full p-2 md:p-3 flex gap-4 md:gap-10 items-center bg-transparent">
              <Link
                to="/home"
                className={`hover:bg-white hover:text-[#1E1E1E] hover:rounded-full p-2 ${
                  paginaActiva === "/home"
                    ? "bg-white text-[#1E1E1E] rounded-full"
                    : ""
                }`}
              >
                Home
              </Link>

              <Link
                to="/about"
                className={`hover:bg-white hover:text-[#1E1E1E] hover:rounded-full p-2 ${
                  paginaActiva === "/about"
                    ? "bg-white text-[#1E1E1E] rounded-full"
                    : ""
                }`}
              >
                About Us
              </Link>

              <Link
                to="/contact"
                className={`hover:bg-white hover:text-[#1E1E1E] hover:rounded-full p-2 ${
                  paginaActiva === "/contact"
                    ? "bg-white text-[#1E1E1E] rounded-full"
                    : ""
                }`}
              >
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Buttons */}
          <div className="bg-[#171717] px-6 py-4 rounded-b-3xl rounded-r-none flex items-center gap-6 lg:pl-40">
            <button className="border-white border-2 rounded-full px-10 py-2 opacity-50">
              English ▼
            </button>
            <button
              className="border-white border-2 rounded-full px-10 py-2 hover:bg-white hover:text-[#1E1E1E]"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
