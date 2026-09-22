import { useState } from "react";
import caso from "../data/caso-telon-final";
import { responderObjetivo } from "../game/roomStore";

export default function Objetivos({ sala }) {
  const respuestas = sala.respuestasObjetivos || {};

  return (
    <div className="stack">
      {caso.objetivos.map((obj) => (
        <ObjetivoCard key={obj.id} obj={obj} sala={sala} guardado={respuestas[obj.id]} />
      ))}
    </div>
  );
}

function ObjetivoCard({ obj, sala, guardado }) {
  const [mostrarPista, setMostrarPista] = useState(false);
  const respondido = guardado !== undefined;

  return (
    <div className="documento">
      <div className="sello-confidencial">{obj.titulo}</div>
      <p>{obj.descripcion}</p>
      <p><b>{obj.pregunta}</b></p>
      <div>
        {obj.opciones.map((op, i) => {
          let clase = "opcion";
          if (respondido) {
            if (i === obj.respuestaCorrecta) clase += " opcion--correcta";
            else if (i === guardado.respuesta) clase += " opcion--incorrecta";
          }
          return (
            <button
              key={i}
              className={clase}
              disabled={respondido}
              onClick={() => responderObjetivo(sala.codigo, obj.id, i)}
            >
              {op}
            </button>
          );
        })}
      </div>

      {!respondido && (
        <button className="btn btn--pequeno btn--fantasma" onClick={() => setMostrarPista((v) => !v)}>
          {mostrarPista ? "Ocultar pista" : "Pedir una pista"}
        </button>
      )}
      {!respondido && mostrarPista && (
        <p className="texto-suave" style={{ marginTop: 8 }}>💡 {obj.pistaSiFalla}</p>
      )}

      {respondido && (
        <p style={{ color: guardado.respuesta === obj.respuestaCorrecta ? "var(--verde-ok)" : "var(--sangre)" }}>
          {guardado.respuesta === obj.respuestaCorrecta
            ? "Correcto. El equipo avanza con esta conclusión."
            : "No es la conclusión que respalda la evidencia, pero la investigación continúa."}
        </p>
      )}
    </div>
  );
}
