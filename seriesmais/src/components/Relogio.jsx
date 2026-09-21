import { useState, useEffect } from "react";

function Relogio() {
  const [hora, setHora] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const intervalo = setInterval(() => {
      setHora(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(intervalo);
    };
  }, []);

  return (
    <span className="font-mono text-purple-200 text-sm bg-purple-900 px-3 py-1 rounded-lg">
      {hora}
    </span>
  );
}

export default Relogio;