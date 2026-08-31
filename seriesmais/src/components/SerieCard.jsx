function SerieCard({ titulo, descricao, categoria, status }) {
  const cores = {
    assistindo: "border-green-500",
    paraAssistir: "border-yellow-400",
    finalizada: "border-blue-500",
  };

  return (
    <article
      className={`bg-white rounded-xl p-6 shadow-lg border-l-4 ${
        cores[status]
      } hover:scale-105 transition`}
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
    </article>
  );
}

export default SerieCard;