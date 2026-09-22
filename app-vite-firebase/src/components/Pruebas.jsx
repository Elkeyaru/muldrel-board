import caso from "../data/caso-telon-final";

export default function Pruebas() {
  return (
    <div className="documento">
      <div className="sello-confidencial">Inventario de pruebas</div>
      <h3>Pruebas recogidas en el expediente</h3>
      <p className="texto-suave" style={{ color: "var(--tinta-suave)" }}>
        Estas son todas las pruebas registradas hasta ahora. Úsenlas para respaldar su acusación final.
      </p>
      <div className="stack">
        {caso.pruebas.map((p) => (
          <div key={p.id} className="card" style={{ background: "#f4eddc", color: "var(--tinta)", border: "1px solid rgba(0,0,0,0.1)" }}>
            <b>{p.nombre}</b>
            <div className="texto-suave" style={{ color: "var(--tinta-suave)" }}>{p.tipo}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
