import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utilities/firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // States: Correo, contraseña y error del formulario de login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Navegación
  const navigate = useNavigate();

  // Login desde Firebase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      console.error(error);
      setError("Datos incorrectos. Inténtalo de nuevo.");
    }
  };

  return (
    <main className="h-screen flex justify-center items-center mx-5 py-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-28 w-full h-full">
        {/* Imagen */}
        <div className="w-full h-64 md:h-full">
          <img
            src="/images/login-rickandmorty.jpg"
            alt="Log In"
            className="h-full w-full object-cover rounded-2xl"
          />
        </div>

        <div className="flex flex-col justify-center px-4 md:mr-20">
          <div>
            <h1 className="text-[3.75rem]">Log In</h1>
            <p className="text-[1.438rem]">
              Por favor ingresa tu correo y contraseña
            </p>
          </div>
          
          {/* Formulario */}
          <form onSubmit={handleSubmit} className="mt-16 flex flex-col gap-10">
            <input
              type="email"
              name="usuario"
              placeholder="Correo electrónico"
              className="text-[1.438rem] border-white border-2 bg-transparent rounded-full p-6 text-white placeholder-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="contrasena"
              placeholder="Contraseña"
              className="text-[1.438rem] border-white border-2 bg-transparent rounded-full p-6 text-white placeholder-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="text-[1.625rem] bg-white text-[#171717] p-5 rounded-full mt-10">
              Log In
            </button>
            {error && <p className="text-red-500 text-lg mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </main>
  );
}
