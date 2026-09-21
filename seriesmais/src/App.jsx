import { useState, useEffect } from "react";
import Header from "./components/Header";
import SerieCard from "./components/SerieCard";
import SerieForm from "./components/SerieForm";
import Footer from "./components/Footer";

const SERIES_INICIAIS = [
  {
    id: 1,
    titulo: "The Vampire Diaries",
    descricao:
      "Uma jovem conhece dois irmãos vampiros e acaba envolvida em uma história cheia de mistérios e acontecimentos sobrenaturais.",
    categoria: "Drama / Fantasia",
    status: "Finalizada",
    concluida: true,
  },
  {
    id: 2,
    titulo: "Teen Wolf",
    descricao:
      "Após um acontecimento misterioso, um adolescente tem sua vida transformada e passa a enfrentar perigos sobrenaturais.",
    categoria: "Ação / Fantasia",
    status: "Finalizada",
    concluida: true,
  },
  {
    id: 3,
    titulo: "Smallville",
    descricao:
      "A série acompanha a juventude de Clark Kent antes de ele se tornar o Superman.",
    categoria: "Super-herói / Drama",
    status: "Finalizada",
    concluida: true,
  },
  {
    id: 4,
    titulo: "One Tree Hill",
    descricao:
      "A história acompanha jovens e suas famílias, amizades, relacionamentos e rivalidades em uma pequena cidade.",
    categoria: "Drama",
    status: "Pausado",
    concluida: false,
  },
  {
    id: 5,
    titulo: "The Flash",
    descricao:
      "Barry Allen ganha supervelocidade após um acidente e passa a usar seus poderes para proteger Central City.",
    categoria: "Super-herói / Ação",
    status: "Quero Assistir",
    concluida: false,
  },
];

function App() {
  // Guarda as séries em um estado
  // Também recupera as séries salvas no navegador
  const [series, setSeries] = useState(() => {
    const seriesSalvas = localStorage.getItem("seriehub-series");

    return seriesSalvas
      ? JSON.parse(seriesSalvas)
      : SERIES_INICIAIS;
  });

  // Controla o filtro
  const [filtro, setFiltro] = useState("todas");

  // Adicionar uma nova série
  function adicionarSerie(novaSerie) {
    setSeries((seriesAtuais) => [
      ...seriesAtuais,
      {
        id: Date.now(),
        titulo: novaSerie.titulo,
        descricao: "Nova série adicionada ao catálogo.",
        categoria: novaSerie.categoria,
        status: "Quero Assistir",
        concluida: false,
      },
    ]);
  }

  // Marcar/desmarcar como assistida
  function alternarConcluida(id) {
    setSeries((seriesAtuais) =>
      seriesAtuais.map((serie) =>
        serie.id === id
          ? {
              ...serie,
              concluida: !serie.concluida,
              status: !serie.concluida
                ? "Finalizada"
                : "Quero Assistir",
            }
          : serie
      )
    );
  }

  // Remover série
  function removerSerie(id) {
    setSeries((seriesAtuais) =>
      seriesAtuais.filter((serie) => serie.id !== id)
    );
  }

  // Filtrar séries
  const seriesFiltradas = series.filter((serie) => {
    if (filtro === "pendentes") {
      return !serie.concluida;
    }

    if (filtro === "concluidas") {
      return serie.concluida;
    }

    return true;
  });

  // Salvar as séries no navegador
  useEffect(() => {
    localStorage.setItem(
      "seriehub-series",
      JSON.stringify(series)
    );
  }, [series]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-10 w-full">

        {/* Formulário para adicionar série */}
        <SerieForm onAdicionar={adicionarSerie} />

        {/* Título e filtros */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Séries em destaque ({series.length})
            </h2>

            <p className="text-gray-600 mt-1">
              Confira e gerencie as séries do nosso catálogo.
            </p>
          </div>

          {/* Botões de filtro */}
          <div className="flex gap-2">
            <button
              onClick={() => setFiltro("todas")}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filtro === "todas"
                  ? "bg-purple-700 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              Todas
            </button>

            <button
              onClick={() => setFiltro("pendentes")}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filtro === "pendentes"
                  ? "bg-purple-700 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              Quero Assistir
            </button>

            <button
              onClick={() => setFiltro("concluidas")}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filtro === "concluidas"
                  ? "bg-purple-700 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              Assistidas
            </button>
          </div>
        </div>

        {/* Cards das séries */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {seriesFiltradas.map((serie) => (
            <SerieCard
              key={serie.id}
              titulo={serie.titulo}
              descricao={serie.descricao}
              categoria={serie.categoria}
              status={serie.status}
              concluida={serie.concluida}
              onToggle={() => alternarConcluida(serie.id)}
              onRemover={() => removerSerie(serie.id)}
            />
          ))}
        </section>

      </main>

      <Footer />
    </div>
  );
}

export default App;