import {
  db,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
  isFirebaseConfigured,
} from "../lib/firebase";

// -----------------------------------------------------------------------
// Capa de almacenamiento de la sala de juego.
// - Si Firebase está configurado (ver README.md), la sala se sincroniza
//   en tiempo real entre todos los dispositivos vía Firestore.
// - Si no, se usa un modo local (localStorage + BroadcastChannel) que
//   permite probar el prototipo en solitario o entre varias pestañas del
//   mismo navegador, sin necesidad de configurar nada.
// -----------------------------------------------------------------------

const LOCAL_PREFIX = "muldrel_room_";
const bc =
  typeof window !== "undefined" && "BroadcastChannel" in window
    ? new BroadcastChannel("muldrel-board")
    : null;

export function generarCodigoSala() {
  const letras = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let codigo = "";
  for (let i = 0; i < 5; i++) {
    codigo += letras[Math.floor(Math.random() * letras.length)];
  }
  return codigo;
}

function estadoInicial(codigo, caseId, hostId, hostName) {
  return {
    codigo,
    caseId,
    hostId,
    fase: "lobby", // lobby | investigacion | acusacion | resultados
    jugadores: {
      [hostId]: { nombre: hostName, esHost: true, unidoEn: Date.now() },
    },
    pistasReveladas: {},
    sospechososConfrontados: {},
    respuestasObjetivos: {},
    notasTablero: [],
    acusacion: null,
    actualizadoEn: Date.now(),
  };
}

function localRead(codigo) {
  const raw = localStorage.getItem(LOCAL_PREFIX + codigo);
  return raw ? JSON.parse(raw) : null;
}

function localWrite(codigo, data) {
  localStorage.setItem(LOCAL_PREFIX + codigo, JSON.stringify(data));
  bc?.postMessage({ codigo });
  window.dispatchEvent(new CustomEvent("muldrel-local-update", { detail: { codigo } }));
}

export async function crearSala(caseId, hostId, hostName) {
  const codigo = generarCodigoSala();
  const estado = estadoInicial(codigo, caseId, hostId, hostName);

  if (isFirebaseConfigured) {
    await setDoc(doc(db, "salas", codigo), {
      ...estado,
      actualizadoEn: serverTimestamp(),
    });
  } else {
    localWrite(codigo, estado);
  }
  return codigo;
}

export async function unirseASala(codigo, playerId, playerName) {
  codigo = codigo.trim().toUpperCase();

  if (isFirebaseConfigured) {
    await updateDoc(doc(db, "salas", codigo), {
      [`jugadores.${playerId}`]: {
        nombre: playerName,
        esHost: false,
        unidoEn: Date.now(),
      },
    });
  } else {
    const estado = localRead(codigo);
    if (!estado) throw new Error("Sala no encontrada");
    estado.jugadores[playerId] = {
      nombre: playerName,
      esHost: false,
      unidoEn: Date.now(),
    };
    localWrite(codigo, estado);
  }
  return codigo;
}

export function suscribirseASala(codigo, callback) {
  codigo = codigo.trim().toUpperCase();

  if (isFirebaseConfigured) {
    return onSnapshot(doc(db, "salas", codigo), (snap) => {
      if (snap.exists()) callback(snap.data());
    });
  }

  const emit = () => {
    const estado = localRead(codigo);
    if (estado) callback(estado);
  };
  emit();

  const onMsg = (e) => {
    if (e.data?.codigo === codigo) emit();
  };
  const onLocal = (e) => {
    if (e.detail?.codigo === codigo) emit();
  };
  bc?.addEventListener("message", onMsg);
  window.addEventListener("muldrel-local-update", onLocal);
  const interval = setInterval(emit, 1500);

  return () => {
    bc?.removeEventListener("message", onMsg);
    window.removeEventListener("muldrel-local-update", onLocal);
    clearInterval(interval);
  };
}

async function mutarSala(codigo, mutar) {
  codigo = codigo.trim().toUpperCase();

  if (isFirebaseConfigured) {
    const cambios = mutar(null);
    await updateDoc(doc(db, "salas", codigo), cambios);
  } else {
    const estado = localRead(codigo);
    if (!estado) return;
    mutar(estado);
    estado.actualizadoEn = Date.now();
    localWrite(codigo, estado);
  }
}

export function cambiarFase(codigo, fase) {
  return mutarSala(codigo, (estado) => {
    if (estado) {
      estado.fase = fase;
      return;
    }
    return { fase };
  });
}

export function revelarPista(codigo, pistaId) {
  return mutarSala(codigo, (estado) => {
    if (estado) {
      estado.pistasReveladas[pistaId] = true;
      return;
    }
    return { [`pistasReveladas.${pistaId}`]: true };
  });
}

export function confrontarSospechoso(codigo, sospechosoId) {
  return mutarSala(codigo, (estado) => {
    if (estado) {
      estado.sospechososConfrontados[sospechosoId] = true;
      return;
    }
    return { [`sospechososConfrontados.${sospechosoId}`]: true };
  });
}

export function responderObjetivo(codigo, objetivoId, respuesta) {
  return mutarSala(codigo, (estado) => {
    const valor = { respuesta, respondidoEn: Date.now() };
    if (estado) {
      estado.respuestasObjetivos[objetivoId] = valor;
      return;
    }
    return { [`respuestasObjetivos.${objetivoId}`]: valor };
  });
}

export function agregarNota(codigo, nota) {
  return mutarSala(codigo, (estado) => {
    if (estado) {
      estado.notasTablero.push(nota);
      return;
    }
    return null;
  });
}

export function eliminarNota(codigo, notaId) {
  return mutarSala(codigo, (estado) => {
    if (estado) {
      estado.notasTablero = estado.notasTablero.filter((n) => n.id !== notaId);
    }
  });
}

export function enviarAcusacion(codigo, acusacion) {
  return mutarSala(codigo, (estado) => {
    if (estado) {
      estado.acusacion = acusacion;
      estado.fase = "resultados";
      return;
    }
    return { acusacion, fase: "resultados" };
  });
}

export function reiniciarSala(codigo, caseId) {
  return mutarSala(codigo, (estado) => {
    if (estado) {
      estado.fase = "investigacion";
      estado.pistasReveladas = {};
      estado.sospechososConfrontados = {};
      estado.respuestasObjetivos = {};
      estado.notasTablero = [];
      estado.acusacion = null;
    }
  });
}
