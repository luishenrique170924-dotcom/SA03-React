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
      className={`rounded-xl shadow-md p-6 border ${
        concluida
          ? "bg-slate-50 border-slate-200"
          : "bg-white border-slate-100"
      } hover:shadow-lg transition-shadow`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
          {categoria}
        </span>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-800">
          {status}
        </span>
      </div>

      <h2
        className={`text-lg font-semibold mb-4 ${
          concluida
            ? "text-slate-500 line-through"
            : "text-slate-800"
        }`}
      >
        {titulo}
      </h2>

      <p className="text-gray-600 text-sm mb-4">
        {descricao}
      </p>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
          <input
            type="checkbox"
            checked={concluida}
            onChange={onToggle}
            className="w-4 h-4 accent-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:ring-offset-1"
          />

          Assistida
        </label>

        <button
          onClick={onRemover}
          aria-label={`Remover série: ${titulo}`}
          className="text-xs text-red-600 hover:text-red-800 font-semibold focus:outline-none focus:ring-2 focus:ring-red-600 rounded px-1"
        >
          Remover
        </button>
      </div>
    </article>
  );
}

export default SerieCard;