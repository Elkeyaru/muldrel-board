import caso from "../data/caso-telon-final";
import { revelarPista } from "../game/roomStore";

export default function Autopsia({ sala }) {
  const revelada = sala.pistasReveladas?.["autopsia"];

  return (
    <div className="documento">
      <div className="sello-confidencial">Informe forense</div>
      <h3>{caso.autopsia.titulo}</h3>
      <p><b>Hora estimada de la muerte:</b> {caso.autopsia.horaMuerteEstimada}</p>
      <p style={{ fontStyle: "italic" }}>{caso.autopsia.causaOficialInicial}</p>

      {!revelada ? (
        <button className="btn btn--primario" onClick={() => revelarPista(sala.codigo, "autopsia")}>
          Solicitar informe detallado a patología
        </button>
      ) : (
        <>
          <h4 style={{ marginBottom: 6 }}>Hallazgos detallados</h4>
          <ul>
            {caso.autopsia.hallazgos.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
          <div className="card" style={{ background: "rgba(122,31,31,0.08)", color: "var(--tinta)" }}>
            <b>Conclusión forense:</b> {caso.autopsia.conclusion}
          </div>
        </>
      )}
    </div>
  );
}
