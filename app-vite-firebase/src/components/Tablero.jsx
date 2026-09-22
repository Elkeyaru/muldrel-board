import { useState } from "react";
import { agregarNota, eliminarNota } from "../game/roomStore";

const ROTACIONES = [-4, -2, 0, 2, 4, -3, 3];

export default function Tablero({ sala, playerId }) {
  const [texto, setTexto] = useState("");
  const notas = sala.notasTablero || [];

  function handleAgregar(e) {
    e.preventDefault();
    if (!texto.trim()) return;
    const nota = {
      id: "n_" + Math.random().toString(36).slice(2, 9),
      texto: texto.trim(),
      autor: sala.jugadores?.[playerId]?.nombre || "Investigador/a",
      x: 5 + Math.random() * 65,
      y: 5 + Math.random() * 55,
      rot: ROTACIONES[Math.floor(Math.random() * ROTACIONES.length)],
    };
    agregarNota(sala.codigo, nota);
    setTexto("");
  }

  return (
    <div className="stack">
      <p className="texto-suave">
        Usen este corcho compartido para anotar teorías, conexiones y sospechas. Todos en la
        sala ven las mismas notas en tiempo real.
      </p>
      <div className="corcho">
        {notas.map((n) => (
          <div
            key={n.id}
            className="nota-adhesiva"
            style={{ left: `${n.x}%`, top: `${n.y}%`, "--rot": `${n.rot}deg` }}
          >
            <div className="nota-adhesiva__pin" />
            <div>{n.texto}</div>
            <div style={{ marginTop: 6, fontSize: "0.65rem", opacity: 0.6 }}>— {n.autor}</div>
            <button className="nota-adhesiva__borrar" onClick={() => eliminarNota(sala.codigo, n.id)}>
              quitar
            </button>
          </div>
        ))}
      </div>
      <form className="corcho__form" onSubmit={handleAgregar}>
        <input
          className="input"
          style={{ flex: 1, minWidth: 200 }}
          placeholder="Ej: Marta miente sobre estar con Ricardo..."
          value={texto}
          maxLength={120}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button className="btn btn--pequeno" type="submit">Fijar nota</button>
      </form>
    </div>
  );
}
