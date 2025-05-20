import { useEffect, useState } from "react";
import CardCharacter from "../components/CardCharacter";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import type { Personaje } from "../types/index-types";

export default function Home() {
  // States: Características de personajes
  const [personajes, setPersonajes] = useState<Personaje[]>([]);
  const [todosPersonajes, setTodosPersonajes] = useState<Personaje[]>([]);
  const [especies, setEspecies] = useState<string[]>([]);
  const [locaciones, setLocaciones] = useState<string[]>([]);

  // States: Filtro y búsqueda de personajes
  const [especieSeleccionada, setEspecieSeleccionada] = useState("");
  const [locacionSeleccionada, setLocacionSeleccionada] = useState("");
  const [busqueda, setBusqueda] = useState("");

  // States: Paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  // useEffect: Obtención de especies, filtros
  useEffect(() => {
    const fetchTodos = async () => {
      let personajesTotales: Personaje[] = [];
      let pagina = 1;
      let continuar = true;

      while (continuar) {
        const respuesta = await fetch(
          `https://rickandmortyapi.com/api/character?page=${pagina}`
        );
        const resultado = await respuesta.json();

        personajesTotales = [...personajesTotales, ...resultado.results];
        if (resultado.info.next) {
          pagina++;
        } else {
          continuar = false;
        }
      }

      setTodosPersonajes(personajesTotales);

      const soloEspecies = personajesTotales
        .map((personaje) => personaje.species)
        .filter(
          (especie, indice, arregloEspecies) =>
            arregloEspecies.indexOf(especie) === indice
        );
      setEspecies(soloEspecies);

      const soloLocaciones = personajesTotales
        .map((p) => p.location.name)
        .filter(
          (locacion, indice, arregloLocaciones) =>
            arregloLocaciones.indexOf(locacion) === indice
        );
      setLocaciones(soloLocaciones);
    };

    fetchTodos();
  }, []);

  // useEffect: Filtros y paginación
  useEffect(() => {
    if (locacionSeleccionada || especieSeleccionada || busqueda !== "") {
      const personajesFiltrados = todosPersonajes.filter((personaje) => {
        let coincideEspecie = true;
        let coincideLocacion = true;
        let coincideBusqueda = true;

        if (especieSeleccionada) {
          coincideEspecie = personaje.species === especieSeleccionada;
        }

        if (locacionSeleccionada) {
          coincideLocacion = personaje.location.name === locacionSeleccionada;
        }

        if (busqueda !== "") {
          coincideBusqueda = personaje.name.toLowerCase().includes(busqueda.toLowerCase());
        }

        return coincideEspecie && coincideLocacion && coincideBusqueda;
      });

      const personajesPorPagina = 20;
      const inicio = (paginaActual - 1) * personajesPorPagina;
      const fin = inicio + personajesPorPagina;

      setPersonajes(personajesFiltrados.slice(inicio, fin));
      setTotalPaginas(Math.ceil(personajesFiltrados.length / personajesPorPagina));
    } else {
      let url = `https://rickandmortyapi.com/api/character?page=${paginaActual}`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setPersonajes(data.results);
          setTotalPaginas(data.info.pages);
        })
        .catch((err) => {
          console.error(err);
          setPersonajes([]);
        });
    }
  }, [
    paginaActual,
    especieSeleccionada,
    locacionSeleccionada,
    busqueda,
    todosPersonajes,
  ]);

  const paginas = [];
  for (let i = 1; i <= totalPaginas; i++) {
    paginas.push(i);
  }

  return (
    <>
      <div className="bg-[url('/images/landing/landing-home.png')] bg-cover bg-center min-h-screen mx-10">
        <NavBar />
        {/* Portada */}
        <div className=" flex lg:mx-28 lg:my-56 text-center xl:text-left lg:justify-start justify-center">
          <div>
            <p className="bg-white text-[#1E1E1E] block xl:w-fit lg:text-[6rem] text-[4.375rem] rounded-3xl px-3 py-0 leading-none m-0 tracking-wide text-center w-full">
              Morty! Boom!
            </p>
            <div className="block xl:w-fit lg:text-[6rem] text-[4.375rem] leading-none m-0">
              <span className="bg-white text-[#1E1E1E] inline-block rounded-3xl px-3 py-0">
                I'm a
              </span>
              <span className="text-white bg-[#1E1E1E] inline-block rounded-3xl px-3 py-0 ml-1">
                website.
              </span>
            </div>
            <hr className=" h-1 bg-[#1E1E1E] border-none  my-20" />
            <p className="text-[#1E1E1E] text-[1.25rem] inline-block">
              <span className="bg-[#D9D9D9] px-3 pt-2 pb-1 rounded-t-xl rounded-r-xl block">
                What do you think about that? I turned myself into a website!
                <br />
                W-what are you just staring at me for, bro? I turned myself into
              </span>
              <span className="bg-[#D9D9D9] px-3 pb-2 rounded-b-xl inline-block">
                a website, Morty!
              </span>
            </p>
          </div>
        </div>
      </div>

      <main className="my-10 mx-10">
        {/* Descripción */}
        <section className=" lg:mx-28 my-28">
          <h1 className=" lg:text-[4.375rem] text-[3.125rem] mb-10 lg:text-left text-center">
            Personajes <br /> Principales
          </h1>
          <hr className=" h-[0.063rem] border-none bg-white lg:w-2/6 w-full" />
          <p className=" text-[0.938rem] mt-10 text-center lg:text-left">
            The show revolves around the adventures of the members of the Smith
            household, which consists of <br /> parents, Jerry, and, Beth, their
            children Summer and Morty, and Beth's father, Rick Sanchez, who
            lives with <br /> them as a guest. The family lives in a suburb in
            the American Midwest. The adventures of Rick and Morty, <br />
            however, take place across an infinite number of realities, with the
            characters traveling to other planets <br /> and dimensions through
            portals and Rick's flying saucer.
          </p>
        </section>

        <section className=" lg:mx-28">
          {/* Filtros */}
          <div className=" flex flex-col lg:flex-row gap-10 lg:justify-between">
            <div className=" space-y-5">
              <select
                onChange={(e) => setEspecieSeleccionada(e.target.value)}
                name="relacion"
                id="relacion"
                className="w-full lg:w-auto bg-transparent border-2 border-white rounded-full px-10 py-2 text-white text-center mr-10 focus:bg-[#171717]"
              >
                <option disabled selected>
                  Por Especie
                </option>
                {especies.map((especie, i) => (
                  <option key={i} value={especie}>
                    {especie}
                  </option>
                ))}
              </select>
              <select
                onChange={(e) => setLocacionSeleccionada(e.target.value)}
                name="temporada"
                id="temporada"
                className="w-full lg:w-auto bg-transparent border-2 border-white rounded-full px-10 py-2 text-white text-center focus:bg-[#171717]"
              >
                <option value="" disabled selected>
                  Por Locación
                </option>
                {locaciones.map((locacion, i) => (
                  <option key={i} value={locacion}>
                    {locacion}
                  </option>
                ))}
              </select>
            </div>
            {/* Search Input */}
            <div className="relative w-full lg:max-w-md lg:px-4">
              <input
                type="text"
                placeholder="Search"
                className=" bg-transparent border-2 border-white rounded-full pl-10 pr-10 py-2 text-white text-center placeholder:text-white placeholder:opacity-40 w-full"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <img
                src="/icons/search-icon.svg"
                alt="Search"
                className="w-5 h-5 absolute right-10 top-3"
              />
            </div>
          </div>

          {/* API Resultados*/}
          <div>
            <CardCharacter 
              personajes={personajes}
            />
          </div>
        </section>
        {/* Paginación */}
        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          {paginas.map((numero) => (
            <button
              key={numero}
              onClick={() => setPaginaActual(numero)}
              className={`px-3 py-1 rounded-full border-2 ${
                paginaActual === numero
                  ? "bg-white text-black font-bold border-white"
                  : "text-white border-gray-400 hover:border-white"
              }`}
            >
              {numero}
            </button>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
