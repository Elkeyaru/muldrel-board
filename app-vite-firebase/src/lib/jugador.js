export function obtenerIdJugador() {
  let id = localStorage.getItem("muldrel_player_id");
  if (!id) {
    id = "p_" + Math.random().toString(36).slice(2, 10);
    localStorage.setItem("muldrel_player_id", id);
  }
  return id;
}

export function obtenerNombreGuardado() {
  return localStorage.getItem("muldrel_player_name") || "";
}

export function guardarNombre(nombre) {
  localStorage.setItem("muldrel_player_name", nombre);
}
