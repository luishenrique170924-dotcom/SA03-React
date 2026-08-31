import Header from "./components/Header";
import SerieCard from "./components/SerieCard";
import Footer from "./components/Footer";

function App() {
  const series = [
    {
      id: 1,
      titulo: "The Vampire Diaries",
      descricao:
        "Uma jovem conhece dois irmãos vampiros e acaba envolvida em uma história cheia de mistérios e acontecimentos sobrenaturais.",
      categoria: "Drama / Fantasia",
      status: "Finalizada",
    },
    {
      id: 2,
      titulo: "Teen Wolf",
      descricao:
        "Após um acontecimento misterioso, um adolescente tem sua vida transformada e passa a enfrentar perigos sobrenaturais.",
      categoria: "Ação / Fantasia",
      status: "Finalizada",
    },
    {
      id: 3,
      titulo: "Smallville",
      descricao:
        "A série acompanha a juventude de Clark Kent antes de ele se tornar o Superman.",
      categoria: "Super-herói / Drama",
      status: "Finalizada",
    },
    {
      id: 4,
      titulo: "One Tree Hill",
      descricao:
        "A história acompanha jovens e suas famílias, amizades, relacionamentos e rivalidades em uma pequena cidade.",
      categoria: "Drama",
      status: "Pausado",
    },
    {
    id: 5,
    titulo: "The Flash",
    descricao:
    "Barry Allen ganha supervelocidade após um acidente e passa a usar seus poderes para proteger Central City.",
    categoria: "Super-herói / Ação",
    status: "Quero Assistir",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Séries em destaque
        </h2>

        <p className="text-gray-600 mb-6">
          Confira algumas séries do nosso catálogo.
        </p>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {series.map((serie) => (
            <SerieCard
              key={serie.id}
              titulo={serie.titulo}
              descricao={serie.descricao}
              categoria={serie.categoria}
              status={serie.status}
            />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;