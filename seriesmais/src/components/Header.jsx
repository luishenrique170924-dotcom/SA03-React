import { useState } from "react";
import Relogio from "./Relogio";

function Header() {
  const [mostrarRelogio, setMostrarRelogio] = useState(true);

  return (
    <header className="bg-purple-950 text-white px-6 py-5 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        
        <div>
          <h1 className="text-3xl font-bold">
            📺 SerieHub
          </h1>

          <p className="text-purple-200 mt-1">
            Seu catálogo de séries favoritas
          </p>
        </div>

        <div className="flex items-center gap-3">
          {mostrarRelogio && <Relogio />}

          <button
            onClick={() => setMostrarRelogio(!mostrarRelogio)}
            className="text-xs border border-purple-400 hover:bg-purple-800 px-3 py-2 rounded-lg transition-colors"
          >
            {mostrarRelogio
              ? "Esconder relógio"
              : "Mostrar relógio"}
          </button>
        </div>

      </div>
    </header>
  );
}

export default Header;