import { useState } from "react";

function SerieForm({ onAdicionar }) {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("Drama");
  const [prioridade, setPrioridade] = useState("media");

  function aoEnviar(evento) {
    evento.preventDefault();

    if (titulo.trim() === "") return;

    onAdicionar({
      titulo,
      categoria,
      prioridade,
    });

    setTitulo("");
  }

  return (
    <form
      onSubmit={aoEnviar}
      className="bg-white rounded-xl shadow-md p-5 mb-8 flex flex-wrap gap-3 items-end"
    >
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-semibold text-slate-600 mb-1">
          Nova série
        </label>

        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Digite o nome da série"
          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-600 mb-1">
          Categoria
        </label>

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          <option>Drama</option>
          <option>Fantasia</option>
          <option>Ação</option>
          <option>Super-herói</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-600 mb-1">
          Prioridade
        </label>

        <select
          value={prioridade}
          onChange={(e) => setPrioridade(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          <option value="alta">alta</option>
          <option value="media">media</option>
          <option value="baixa">baixa</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-purple-700 hover:bg-purple-800 text-white font-bold px-5 py-2 rounded-lg transition-colors"
      >
        + Adicionar
      </button>
    </form>
  );
}

export default SerieForm;