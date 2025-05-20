export default function Footer() {
  return (
    <footer className=" bg-[#3F3F3F] px-32">
      <div className=" flex flex-col lg:flex-row justify-between items-center py-5">
        {/* Logo */}
        <div>
          <img
            src="/images/landing/Layer_1.webp"
            alt="Logo"
            className="h-[5.875rem] min-w-[12.5rem]"
          />
        </div>
        {/* Correo */}
        <div>
          <p className=" font-bold text-[0.75rem]">Email</p>
          <p className=" text-[0.75rem]">loredo.josue@hotmail.com</p>
        </div>
      </div>

      <hr className="h-[0.063rem] border-none bg-gradient-to-r from-transparent via-white to-transparent" />

      <div className=" flex flex-col lg:flex-row lg:gap-0 gap-6 justify-between items-center lg:items-start text-[0.75rem] py-10">
        <p>©2024 RickandMorty</p>
        <a href="#" className=" font-bold">
          Aviso de Privacidad
        </a>
      </div>
    </footer>
  );
}
