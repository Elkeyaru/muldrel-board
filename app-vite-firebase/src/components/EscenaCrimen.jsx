import caso from "../data/caso-telon-final";
import { revelarPista } from "../game/roomStore";

export default function EscenaCrimen({ sala }) {
  const reveladas = sala.pistasReveladas || {};

  return (
    <div className="stack">
      <div className="documento">
        <div className="sello-confidencial">Víctima</div>
        <h3>{caso.victima.nombre}, {caso.victima.edad} años</h3>
        <p><b>{caso.victima.cargo}</b></p>
        <p>{caso.victima.hallazgo}</p>
      </div>

      <div className="documento">
        <div className="sello-confidencial">{caso.escenaDelCrimen.titulo}</div>
        <p className="texto-suave" style={{ color: "var(--tinta-suave)" }}>
          Toquen cada hallazgo para registrarlo como examinado. Discutan en voz alta lo que
          significa antes de continuar.
        </p>
        <div className="stack">
          {caso.escenaDelCrimen.hallazgos.map((h) => {
            const visto = reveladas[h.id];
            return (
              <button
                key={h.id}
                className="card"
                style={{
                  textAlign: "left",
                  border: visto ? "1px solid var(--sangre)" : undefined,
                  color: "var(--papel)",
                  background: visto ? "rgba(122,31,31,0.12)" : undefined,
                }}
                onClick={() => revelarPista(sala.codigo, h.id)}
              >
                <b>{visto ? "🔎 " : "📁 "}{h.titulo}</b>
                {visto && <p style={{ marginTop: 6 }}>{h.texto}</p>}
                {!visto && <p className="texto-suave">Pulsa para examinar esta evidencia.</p>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
