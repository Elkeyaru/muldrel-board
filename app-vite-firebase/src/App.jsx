import { useEffect, useState } from "react";
import Inicio from "./components/Inicio";
import Lobby from "./components/Lobby";
import Investigacion from "./components/Investigacion";
import Resultados from "./components/Resultados";
import { obtenerIdJugador } from "./lib/jugador";
import { suscribirseASala } from "./game/roomStore";

function leerCodigoDeUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("sala");
}

export default function App() {
  const [playerId] = useState(obtenerIdJugador);
  const [codigo, setCodigo] = useState(leerCodigoDeUrl);
  const [sala, setSala] = useState(null);

  useEffect(() => {
    if (!codigo) return;
    const url = new URL(window.location.href);
    url.searchParams.set("sala", codigo);
    window.history.replaceState({}, "", url);

    const unsub = suscribirseASala(codigo, setSala);
    return () => unsub && unsub();
  }, [codigo]);

  function salirDeSala() {
    setCodigo(null);
    setSala(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("sala");
    window.history.replaceState({}, "", url);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar__marca" onClick={salirDeSala} style={{ cursor: "pointer" }}>
          MULDREL BOARD <small>expedientes criminales</small>
        </div>
        {sala && <div className="topbar__sala">Sala: {sala.codigo}</div>}
      </header>

      <main className="contenido">
        {!codigo || !sala ? (
          <Inicio playerId={playerId} onEntrar={setCodigo} />
        ) : sala.fase === "lobby" ? (
          <Lobby sala={sala} playerId={playerId} />
        ) : sala.fase === "resultados" ? (
          <Resultados sala={sala} playerId={playerId} />
        ) : (
          <Investigacion sala={sala} playerId={playerId} />
        )}
      </main>
    </div>
  );
}
