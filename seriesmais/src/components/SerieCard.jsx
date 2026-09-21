function SerieCard({
  titulo,
  descricao,
  categoria,
  status,
  concluida,
  onToggle,
  onRemover,
}) {
  return (
    <article
      className={`bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-600 hover:scale-105 transition ${
        concluida ? "opacity-60" : ""
      }`}
    >
      <span className="text-sm font-semibold text-purple-600">
        {categoria}
      </span>

      <h2 className="text-xl font-bold text-gray-800 mt-2">
        {titulo}
      </h2>

      <p className="text-gray-600 mt-3">
        {descricao}
      </p>

      <p className="mt-4 text-sm font-bold">
        Status: {status}
      </p>

      <div className="flex items-center justify-between mt-5">
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={concluida}
            onChange={onToggle}
            className="w-4 h-4 accent-purple-700"
          />

          Assistida
        </label>

        <button
          onClick={onRemover}
          className="bg-red-100 text-red-600 hover:bg-red-200 px-3 py-2 rounded-lg text-sm font-semibold transition"
        >
          Remover
        </button>
      </div>
    </article>
  );
}

export default SerieCard;