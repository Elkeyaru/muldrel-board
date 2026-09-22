import { useState } from "react";
import caso from "../data/caso-telon-final";
import { crearSala, unirseASala } from "../game/roomStore";
import { isFirebaseConfigured } from "../lib/firebase";
import { guardarNombre } from "../lib/jugador";

export default function Inicio({ playerId, onEntrar }) {
  const [modo, setModo] = useState(null); // null | "crear" | "unirse"
  const [nombre, setNombre] = useState("");
  const [codigoInput, setCodigoInput] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  async function handleCrear(e) {
    e.preventDefault();
    if (!nombre.trim()) return;
    setCargando(true);
    setError("");
    try {
      guardarNombre(nombre.trim());
      const codigo = await crearSala(caso.id, playerId, nombre.trim());
      onEntrar(codigo);
    } catch (err) {
      setError("No se pudo crear la sala. Inténtalo de nuevo.");
      setCargando(false);
    }
  }

  async function handleUnirse(e) {
    e.preventDefault();
    if (!nombre.trim() || !codigoInput.trim()) return;
    setCargando(true);
    setError("");
    try {
      guardarNombre(nombre.trim());
      const codigo = await unirseASala(codigoInput, playerId, nombre.trim());
      onEntrar(codigo);
    } catch (err) {
      setError("No se encontró esa sala. Revisa el código.");
      setCargando(false);
    }
  }

  return (
    <div className="portada">
      <div className="portada__sello">EXPEDIENTE REABIERTO</div>
      <h1>MULDREL BOARD</h1>
      <div className="portada__expediente">
        Expediente N.º {caso.numeroExpediente} — "{caso.titulo}"
      </div>
      <p className="portada__resumen">{caso.resumen}</p>
      <div className="portada__meta">
        <span className="badge">{caso.jugadoresMin}–{caso.jugadoresMax} jugadores</span>
        <span className="badge">{caso.duracionEstimada}</span>
        <span className="badge">+{caso.edadMinima} años</span>
        <span className="badge">{caso.ciudad}</span>
      </div>

      {!isFirebaseConfigured && (
        <div className="badge" style={{ borderColor: "var(--sangre-2)", color: "var(--sangre-2)" }}>
          Modo local: sin Firebase configurado, solo se sincroniza en este navegador. Ver README.md.
        </div>
      )}

      {!modo && (
        <div className="fila" style={{ justifyContent: "center", marginTop: 10 }}>
          <button className="btn btn--primario" onClick={() => setModo("crear")}>
            Abrir nueva investigación
          </button>
          <button className="btn" onClick={() => setModo("unirse")}>
            Unirme con un código
          </button>
        </div>
      )}

      {modo === "crear" && (
        <form className="stack" style={{ alignItems: "center" }} onSubmit={handleCrear}>
          <div className="form-grupo">
            <label>Tu nombre de investigador/a</label>
            <input
              className="input"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Detective Ramírez"
              maxLength={24}
              autoFocus
            />
          </div>
          {error && <p style={{ color: "var(--sangre-2)" }}>{error}</p>}
          <div className="fila">
            <button className="btn btn--fantasma" type="button" onClick={() => setModo(null)}>
              Volver
            </button>
            <button className="btn btn--primario" type="submit" disabled={cargando}>
              {cargando ? "Abriendo expediente..." : "Crear sala"}
            </button>
          </div>
        </form>
      )}

      {modo === "unirse" && (
        <form className="stack" style={{ alignItems: "center" }} onSubmit={handleUnirse}>
          <div className="form-grupo">
            <label>Código de la sala</label>
            <input
              className="input"
              value={codigoInput}
              onChange={(e) => setCodigoInput(e.target.value.toUpperCase())}
              placeholder="Ej: A7K2Q"
              maxLength={6}
              autoFocus
            />
          </div>
          <div className="form-grupo">
            <label>Tu nombre de investigador/a</label>
            <input
              className="input"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Detective Ramírez"
              maxLength={24}
            />
          </div>
          {error && <p style={{ color: "var(--sangre-2)" }}>{error}</p>}
          <div className="fila">
            <button className="btn btn--fantasma" type="button" onClick={() => setModo(null)}>
              Volver
            </button>
            <button className="btn btn--primario" type="submit" disabled={cargando}>
              {cargando ? "Entrando..." : "Unirme"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
