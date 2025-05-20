import type { Personaje } from "../types/index-types";

type SeleccionProps = {
  personajes: Personaje[];
};

export default function CardCharacter({personajes}: SeleccionProps) {
  return (
    <div className="my-10">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
        {personajes.map((personaje) => (

          // Tarjeta de personajes
          <div
            key={personaje.id}
            className="border-2 border-[#D9D9D9] mx-auto p-14 relative hover:bg-[#02DD73] group w-[18.75rem] h-[25rem] flex flex-col justify-center items-center"
          >
            <p className="absolute top-5 left-5 text-[1.25rem]">/{personaje.id}</p>
            <div className="flex flex-col items-center justify-center group-hover:opacity-0 group-hover:invisible">
              <img
                src={personaje.image}
                alt={personaje.name}
                className="h-[13.75rem] object-contain"
              />
              <p className="text-[1.875rem] text-center pt-5">{personaje.name}</p>
            </div>

            {/* Descipción de personajes con Hover */}
            <div className="absolute inset-0 flex flex-col items-center justify-center invisible group-hover:visible text-center">
              <p className="text-[1.875rem] font-semibold text-center">
                {personaje.name}
              </p>
              <p className=" text-[1.25rem]">Specie: {personaje.species}</p>
              <p className=" text-[1.25rem]">Location: {personaje.location.name}</p>
              <p className=" text-[1.25rem]">Gender: {personaje.gender}</p>
              <p className=" text-[1.25rem]">Status: {personaje.status}</p>
              <p className=" text-[1.25rem]">Origin: {personaje.origin.name}</p>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
