export function calcularPuntuacion(caso, acusacion) {
  const { acusacionFinal, puntuacion, sospechosos } = caso;
  const detalle = [];
  let total = 0;

  const acusadoEsCorrecto = acusacion.sospechosoId === acusacionFinal.sospechosoCorrectoId;
  if (acusadoEsCorrecto) {
    total += puntuacion.sospechosoCorrecto;
    detalle.push({ label: "Sospechoso correcto", puntos: puntuacion.sospechosoCorrecto, ok: true });
  } else {
    const acusado = sospechosos.find((s) => s.id === acusacion.sospechosoId);
    detalle.push({
      label: `Acusaron a ${acusado?.nombre ?? "alguien inocente"}`,
      puntos: puntuacion.penalizacionPorAcusarInocente,
      ok: false,
    });
    total += puntuacion.penalizacionPorAcusarInocente;
  }

  const armaCorrecta = acusacion.armaId === acusacionFinal.armaCorrectaId;
  detalle.push({
    label: armaCorrecta ? "Arma homicida correcta" : "Arma homicida incorrecta",
    puntos: armaCorrecta ? puntuacion.armaCorrecta : 0,
    ok: armaCorrecta,
  });
  if (armaCorrecta) total += puntuacion.armaCorrecta;

  const motivo = acusacionFinal.motivos.find((m) => m.id === acusacion.motivoId);
  const motivoCorrecto = Boolean(motivo?.correcto);
  detalle.push({
    label: motivoCorrecto ? "Motivo correcto" : "Motivo incorrecto",
    puntos: motivoCorrecto ? puntuacion.motivoCorrecto : 0,
    ok: motivoCorrecto,
  });
  if (motivoCorrecto) total += puntuacion.motivoCorrecto;

  const pruebasValidas = (acusacion.pruebaIds || []).filter((id) =>
    acusacionFinal.pruebasClave.includes(id)
  );
  const pruebasQueCuentan = Math.min(pruebasValidas.length, puntuacion.maxPruebasQueCuentan);
  const puntosPruebas = pruebasQueCuentan * puntuacion.porPruebaCorrecta;
  if (puntosPruebas > 0) {
    detalle.push({
      label: `${pruebasQueCuentan} prueba(s) de respaldo correctas`,
      puntos: puntosPruebas,
      ok: true,
    });
    total += puntosPruebas;
  } else {
    detalle.push({ label: "Sin pruebas de respaldo válidas", puntos: 0, ok: false });
  }

  if (acusacion.sinPistas) {
    detalle.push({ label: "Bonus: sin usar pistas de ayuda", puntos: puntuacion.bonusSinPistas, ok: true });
    total += puntuacion.bonusSinPistas;
  }

  total = Math.max(0, total);

  let veredicto;
  if (total >= 90) veredicto = "Caso resuelto con precisión ejemplar";
  else if (total >= 70) veredicto = "Caso resuelto correctamente";
  else if (total >= 40) veredicto = "Resolución parcial, con dudas razonables";
  else veredicto = "El caso queda sin resolver de forma convincente";

  return { total, detalle, acusadoEsCorrecto, veredicto };
}
