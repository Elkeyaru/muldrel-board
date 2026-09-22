import { useState } from "react";
import caso from "../data/caso-telon-final";
import { confrontarSospechoso } from "../game/roomStore";

export default function Sospechosos({ sala }) {
  const [abierto, setAbierto] = useState(null);
  const confrontados = sala.sospechososConfrontados || {};

  const sospechoso = caso.sospechosos.find((s) => s.id === abierto);

  return (
    <div className="stack">
      <p className="texto-suave">
        Interroguen a cada sospechoso. Si creen tener una prueba que contradiga su testimonio,
        confróntenlo para obtener su reacción.
      </p>
      <div className="sospechosos-grid">
        {caso.sospechosos.map((s) => (
          <div key={s.id} className="sospechoso-card" onClick={() => setAbierto(s.id)}>
            <div className="sospechoso-card__ficha">
              {s.nombre.split(" ").map((p) => p[0]).slice(0, 2).join("")}
            </div>
            <div className="sospechoso-card__info">
              <h4>{s.nombre}</h4>
              <span>{s.rol}</span>
              {confrontados[s.id] && (
                <p style={{ marginTop: 6, color: "var(--sangre-2)", fontSize: "0.75rem" }}>
                  ⚠ Confrontado
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {sospechoso && (
        <div className="modal-fondo" onClick={() => setAbierto(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal__cerrar" onClick={() => setAbierto(null)}>✕</button>
            <h3>{sospechoso.nombre}, {sospechoso.edad} años</h3>
            <p><b>{sospechoso.rol}</b></p>
            <p className="texto-suave" style={{ color: "var(--tinta-suave)" }}>{sospechoso.relacion}</p>

            <div className="card" style={{ background: "#f4eddc", color: "var(--tinta)", border: "1px solid rgba(0,0,0,0.1)" }}>
              <p style={{ fontStyle: "italic", margin: 0 }}>{sospechoso.testimonio}</p>
            </div>

            <p style={{ marginTop: 14 }}>
              <b>Coartada declarada:</b> {sospechoso.coartada}
            </p>

            {!confrontados[sospechoso.id] ? (
              <button
                className="btn btn--primario"
                style={{ marginTop: 10 }}
                onClick={() => confrontarSospechoso(sala.codigo, sospechoso.id)}
              >
                Confrontar con la evidencia
              </button>
            ) : (
              <>
                <div className="confrontacion">
                  <b>Contradicción detectada:</b> {sospechoso.contradiccionClave}
                </div>
                <div className="confrontacion" style={{ borderLeftColor: "var(--verde-ok)", background: "rgba(60,110,60,0.08)" }}>
                  <b>Reacción al ser confrontado/a:</b> {sospechoso.siSeLoConfronta}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
