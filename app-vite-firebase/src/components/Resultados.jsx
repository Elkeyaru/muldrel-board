import caso from "../data/caso-telon-final";
import { calcularPuntuacion } from "../game/puntuacion";
import { reiniciarSala } from "../game/roomStore";

export default function Resultados({ sala, playerId }) {
  const { acusacion } = sala;
  if (!acusacion) return null;

  const resultado = calcularPuntuacion(caso, acusacion);
  const culpable = caso.sospechosos.find((s) => s.id === caso.acusacionFinal.sospechosoCorrectoId);
  const soyHost = sala.jugadores?.[playerId]?.esHost;

  return (
    <div className="stack">
      <div className="documento centro">
        <div className="sello-confidencial">Veredicto</div>
        <div className="resultado-puntaje">{resultado.total}</div>
        <p className="texto-suave">puntos sobre 100</p>
        <h3>{resultado.veredicto}</h3>
      </div>

      <div className="card">
        <h4>Desglose de la puntuación</h4>
        {resultado.detalle.map((d, i) => (
          <div key={i} className={`detalle-fila ${d.ok ? "detalle-fila--ok" : "detalle-fila--no"}`}>
            <span>{d.label}</span>
            <span>{d.puntos > 0 ? "+" : ""}{d.puntos}</span>
          </div>
        ))}
      </div>

      <div className="documento">
        <div className="sello-confidencial">Resolución real del caso</div>
        <h3>El expediente cierra con...</h3>
        <p>
          <b>{culpable.nombre}</b> es la autora del homicidio de Elena Vasco Reyes.
        </p>
        <p>{culpable.siSeLoConfronta}</p>
      </div>

      {soyHost && (
        <div className="centro">
          <button className="btn" onClick={() => reiniciarSala(sala.codigo, caso.id)}>
            Reiniciar investigación (mismo grupo)
          </button>
        </div>
      )}
    </div>
  );
}
