import { useState } from "react";
import caso from "../data/caso-telon-final";
import { enviarAcusacion } from "../game/roomStore";

export default function Acusacion({ sala }) {
  const [sospechosoId, setSospechosoId] = useState("");
  const [armaId, setArmaId] = useState("");
  const [motivoId, setMotivoId] = useState("");
  const [pruebaIds, setPruebaIds] = useState([]);

  const listoParaEnviar = sospechosoId && armaId && motivoId && pruebaIds.length > 0;

  function toggleFacil(id) {
    setPruebaIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function handleEnviar() {
    enviarAcusacion(sala.codigo, {
      sospechosoId,
      armaId,
      motivoId,
      pruebaIds,
      sinPistas: false,
      enviadaEn: Date.now(),
    });
  }

  return (
    <div className="documento">
      <div className="sello-confidencial">{caso.acusacionFinal.titulo}</div>
      <p>{caso.acusacionFinal.descripcion}</p>

      <h4>¿Quién es el/la responsable?</h4>
      <div className="stack">
        {caso.sospechosos.map((s) => (
          <button
            key={s.id}
            className={`opcion ${sospechosoId === s.id ? "opcion--correcta" : ""}`}
            onClick={() => setSospechosoId(s.id)}
          >
            {s.nombre}
          </button>
        ))}
      </div>

      <h4>¿Con qué arma?</h4>
      <div className="stack">
        {caso.pruebas
          .filter((p) => ["trofeo", "reloj", "copa"].includes(p.id))
          .map((p) => (
            <button
              key={p.id}
              className={`opcion ${armaId === p.id ? "opcion--correcta" : ""}`}
              onClick={() => setArmaId(p.id)}
            >
              {p.nombre}
            </button>
          ))}
      </div>

      <h4>¿Cuál fue el motivo?</h4>
      <div className="stack">
        {caso.acusacionFinal.motivos.map((m) => (
          <button
            key={m.id}
            className={`opcion ${motivoId === m.id ? "opcion--correcta" : ""}`}
            onClick={() => setMotivoId(m.id)}
          >
            {m.texto}
          </button>
        ))}
      </div>

      <h4>Pruebas que respaldan su acusación (elijan al menos una)</h4>
      <div className="stack">
        {caso.pruebas.map((p) => (
          <button
            key={p.id}
            className={`opcion ${pruebaIds.includes(p.id) ? "opcion--correcta" : ""}`}
            onClick={() => toggleFacil(p.id)}
          >
            {p.nombre}
          </button>
        ))}
      </div>

      <button className="btn btn--primario" disabled={!listoParaEnviar} onClick={handleEnviar} style={{ marginTop: 16 }}>
        Presentar acusación formal
      </button>
    </div>
  );
}
