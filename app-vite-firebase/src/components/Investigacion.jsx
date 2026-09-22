import { useState } from "react";
import EscenaCrimen from "./EscenaCrimen";
import Autopsia from "./Autopsia";
import Sospechosos from "./Sospechosos";
import Pruebas from "./Pruebas";
import Objetivos from "./Objetivos";
import Tablero from "./Tablero";
import Acusacion from "./Acusacion";

const PESTANAS = [
  { id: "escena", label: "Escena" },
  { id: "autopsia", label: "Autopsia" },
  { id: "sospechosos", label: "Sospechosos" },
  { id: "pruebas", label: "Pruebas" },
  { id: "objetivos", label: "Objetivos" },
  { id: "tablero", label: "Tablero" },
  { id: "acusacion", label: "Acusación" },
];

export default function Investigacion({ sala, playerId }) {
  const [tab, setTab] = useState("escena");

  return (
    <div>
      <div className="tabs">
        {PESTANAS.map((p) => (
          <button
            key={p.id}
            className={`tab ${tab === p.id ? "tab--activo" : ""}`}
            onClick={() => setTab(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>

      {tab === "escena" && <EscenaCrimen sala={sala} />}
      {tab === "autopsia" && <Autopsia sala={sala} />}
      {tab === "sospechosos" && <Sospechosos sala={sala} />}
      {tab === "pruebas" && <Pruebas />}
      {tab === "objetivos" && <Objetivos sala={sala} />}
      {tab === "tablero" && <Tablero sala={sala} playerId={playerId} />}
      {tab === "acusacion" && <Acusacion sala={sala} />}
    </div>
  );
}
