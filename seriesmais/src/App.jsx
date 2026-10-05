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

const FILTROS = [
  {
    valor: "todas",
    rotulo: "Todas",
  },
  {
    valor: "pendentes",
    rotulo: "Quero Assistir",
  },
  {
    valor: "concluidas",
    rotulo: "Assistidas",
  },
];

function App() {
  const [series, setSeries] = useState(() => {
    const seriesSalvas = localStorage.getItem("seriehub-series");

    return seriesSalvas
      ? JSON.parse(seriesSalvas)
      : SERIES_INICIAIS;
  });

  const [filtro, setFiltro] = useState("todas");

  // Mensagem para leitores de tela
  const [anuncio, setAnuncio] = useState("");

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

    setAnuncio(`Série "${novaSerie.titulo}" adicionada.`);
  }

  function alternarConcluida(id) {
    const serie = series.find((serie) => serie.id === id);

    if (!serie) return;

    const vaiConcluir = !serie.concluida;

    const status = vaiConcluir
      ? "assistida"
      : "para assistir";

    setSeries((seriesAtuais) =>
      seriesAtuais.map((serieAtual) =>
        serieAtual.id === id
          ? {
              ...serieAtual,
              concluida: !serieAtual.concluida,
              status: vaiConcluir
                ? "Finalizada"
                : "Quero Assistir",
            }
          : serieAtual
      )
    );

    setAnuncio(
      `Série "${serie.titulo}" marcada como ${status}.`
    );
  }

  function removerSerie(id) {
    const serie = series.find((serie) => serie.id === id);

    if (!serie) return;

    setSeries((seriesAtuais) =>
      seriesAtuais.filter((serieAtual) => serieAtual.id !== id)
    );

    setAnuncio(`Série "${serie.titulo}" removida.`);
  }

  const seriesFiltradas = series.filter((serie) => {
    if (filtro === "pendentes") {
      return !serie.concluida;
    }

    if (filtro === "concluidas") {
      return serie.concluida;
    }

    return true;
  });

  useEffect(() => {
    localStorage.setItem(
      "seriehub-series",
      JSON.stringify(series)
    );
  }, [series]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* Skip link */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:text-slate-900 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
      >
        Pular para o conteúdo
      </a>

      <Header />

      {/* Avisos para leitores de tela */}
      <div
        aria-live="polite"
        role="status"
        className="sr-only"
      >
        {anuncio}
      </div>

      <main
        id="conteudo"
        className="flex-1 max-w-6xl mx-auto px-6 py-10 w-full"
      >
        <SerieForm onAdicionar={adicionarSerie} />

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Séries em destaque ({series.length})
            </h2>

            <p className="text-gray-600 mt-1">
              Confira e gerencie as séries do nosso catálogo.
            </p>
          </div>

          {/* Filtros */}
          <div
            role="group"
            aria-label="Filtrar séries"
            className="flex gap-2"
          >
            {FILTROS.map((opcao) => (
              <button
                key={opcao.valor}
                onClick={() => setFiltro(opcao.valor)}
                aria-pressed={filtro === opcao.valor}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-purple-700 ${
                  filtro === opcao.valor
                    ? "bg-purple-700 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-200"
                }`}
              >
                {opcao.rotulo}
              </button>
            ))}
          </div>
        </div>

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