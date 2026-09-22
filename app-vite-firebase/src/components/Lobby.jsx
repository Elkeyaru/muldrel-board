import caso from "../data/caso-telon-final";
import { cambiarFase } from "../game/roomStore";

export default function Lobby({ sala, playerId }) {
  const jugadores = Object.entries(sala.jugadores || {});
  const soyHost = sala.jugadores?.[playerId]?.esHost;

  return (
    <div className="stack">
      <div className="documento">
        <div className="sello-confidencial">Sala de espera</div>
        <h3>Expediente {caso.numeroExpediente} — {caso.titulo}</h3>
        <p>{caso.resumen}</p>
      </div>

      <div className="card">
        <p className="texto-suave">Investigadores en la sala ({jugadores.length})</p>
        <div className="jugadores-lista">
          {jugadores.map(([id, j]) => (
            <span key={id} className={`jugador-chip ${j.esHost ? "jugador-chip--host" : ""}`}>
              {j.nombre}
            </span>
          ))}
        </div>
      </div>

      <div className="centro">
        {soyHost ? (
          <>
            <p className="texto-suave">
              Cuando todos hayan entrado con el código <b>{sala.codigo}</b>, comienza la investigación.
            </p>
            <button className="btn btn--primario" onClick={() => cambiarFase(sala.codigo, "investigacion")}>
              Abrir el expediente
            </button>
          </>
        ) : (
          <p className="texto-suave">Esperando a que el/la anfitrión/a abra el expediente...</p>
        )}
      </div>
    </div>
  );
}
