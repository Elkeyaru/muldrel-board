// Expediente Muldrel N.º 07 — "Telón Final"
// Caso original de ficción para el juego Muldrel Board.

export const caso = {
  id: "telon-final",
  numeroExpediente: "MB-07",
  titulo: "Telón Final",
  ciudad: "Puerto Muldrel",
  fecha: "Sábado 14 de marzo",
  edadMinima: 16,
  duracionEstimada: "90–120 min",
  jugadoresMin: 1,
  jugadoresMax: 8,

  resumen:
    "La noche de clausura de 'La Sombra del Rey' en el Gran Teatro Muldrel terminó con el hallazgo del cuerpo de su directora, Elena Vasco Reyes, colgando en su propio despacho. La policía cerró el caso como suicidio en 48 horas. La familia de la víctima no lo cree. El expediente vuelve a abrirse.",

  victima: {
    nombre: "Elena Vasco Reyes",
    edad: 47,
    cargo: "Directora artística y productora del Gran Teatro Muldrel",
    hallazgo:
      "Hallada a las 00:10 h por el utilero Diego Hurtado, colgando de una cuerda de tramoya atada a una viga de su despacho, tras bambalinas.",
    fotoDescripcion: "Retrato institucional del teatro, 2 años antes del hallazgo.",
  },

  escenaDelCrimen: {
    titulo: "Informe de la Policía Científica — Despacho de dirección",
    hallazgos: [
      {
        id: "puerta",
        titulo: "Puerta del despacho",
        texto:
          "Sin signos de forzamiento. La cerradura estaba intacta. Solo existen tres llaves maestras registradas: la de la víctima, la del gerente y socio Iván Roth, y la del jefe de mantenimiento.",
      },
      {
        id: "silla",
        titulo: "Silla volcada",
        texto:
          "Encontrada a 40 cm de la posición que le correspondería si la víctima se hubiese subido a ella para colgarse. La trayectoria de caída no es compatible con un salto o resbalón desde esa silla.",
      },
      {
        id: "trofeo",
        titulo: "Trofeo 'Cándido de Honor'",
        texto:
          "Estatuilla de bronce de 2.3 kg, premio anual del teatro, hallada en su estante habitual. Presenta una mella reciente en el borde de la base. Bajo luz ultravioleta se detecta un halo residual compatible con sangre limpiada de forma incompleta con disolvente de utilería.",
      },
      {
        id: "copa",
        titulo: "Copa de vino rota",
        texto:
          "Fragmentos en el suelo junto al escritorio. Se recuperan dos juegos de huellas: las de la víctima y una huella parcial de pulgar sin identificar en el momento del hallazgo inicial.",
      },
      {
        id: "tela",
        titulo: "Fragmento de tela",
        texto:
          "Un trozo de tela oscura de unos 3x2 cm, enganchado en la bisagra superior de la puerta. El tejido, tipo gabardina forrada, coincide con el forro interior de una chaqueta de vestuario de la producción 'La Sombra del Rey'.",
      },
      {
        id: "nota",
        titulo: "Nota manuscrita",
        texto:
          "Hallada sobre el escritorio, sin firmar: «Sabes lo que hiciste con las cuentas. Mañana hablo con la junta.» Pendiente de cotejo caligráfico.",
      },
      {
        id: "camara",
        titulo: "Cámara del pasillo de bambalinas",
        texto:
          "El registro muestra un corte de señal entre las 23:12 y las 23:28 (16 minutos). El sistema se opera exclusivamente desde la cabina de control, a cargo del técnico de sonido y luces de turno esa noche.",
      },
      {
        id: "reloj",
        titulo: "Reloj de pulsera de la víctima",
        texto:
          "Detenido a las 23:24. El cristal está roto, compatible con un golpe o forcejeo en ese instante.",
      },
    ],
  },

  autopsia: {
    titulo: "Informe de Autopsia — Dra. Beatriz Ontaneda, forense jefe",
    horaMuerteEstimada: "Entre las 23:15 y las 23:35",
    causaOficialInicial:
      "Reportada inicialmente a la prensa como 'asfixia por suspensión, compatible con suicidio'.",
    hallazgos: [
      "Fractura hundimiento en el hueso occipital, con bordes vitales (hemorragia y reacción inflamatoria presentes): el golpe se produjo con la víctima aún con vida, momentos antes de la muerte.",
      "El surco que deja la cuerda en el cuello NO presenta reacción vital: no hay hemorragia en el tejido subcutáneo bajo la marca, ni petequias conjuntivales significativas, ni el signo de Amussat completo propio de un ahorcamiento en vida.",
      "El hueso hioides está intacto, compatible con un golpe contundente previo y un ahorcamiento post mortem, no con estrangulamiento manual.",
      "Las livideces (livor mortis) están parcialmente fijadas en la espalda y los glúteos: una posición incompatible con haber permanecido colgada desde el instante de la muerte. El cuerpo permaneció al menos 15–20 minutos en posición horizontal antes de ser suspendida.",
      "El objeto causante del golpe es contundente, romo y de canto curvo: compatible en peso y radio con la base del trofeo 'Cándido de Honor'.",
    ],
    conclusion:
      "La víctima fue golpeada en la nuca con un objeto contundente mientras aún vivía. Minutos después de morir (o mientras agonizaba), el cuerpo fue trasladado y colgado con una cuerda de tramoya para simular un suicidio. No hay dudas médico-legales: se trata de un homicidio escenificado como suicidio.",
  },

  sospechosos: [
    {
      id: "ricardo",
      nombre: "Ricardo Elizondo Vega",
      edad: 52,
      rol: "Actor principal de 'La Sombra del Rey'",
      relacion:
        "Relación profesional tensa con la víctima por decisiones de reparto en la próxima temporada.",
      testimonio:
        "«Esa noche terminé la función, saludé al público y me fui directo a mi camerino. No salí de ahí hasta que Diego empezó a gritar que había encontrado a Elena. Estuve solo todo el tiempo, quitándome el maquillaje. Nunca entré a su despacho esa noche. Con Elena las cosas estaban tensas por el guion, nada más.»",
      coartada: "Dice haber estado solo en su camerino desde el final de la función.",
      contradiccionClave:
        "Declara que jamás entró al despacho esa noche, pero un fragmento de tela de su chaqueta de vestuario quedó enganchado en la bisagra de esa misma puerta.",
      siSeLoConfronta:
        "Confiesa que sí fue al despacho, pero antes de la función, sobre las 19:30, a reclamarle a Elena que planeaba sacarlo del reparto de la reposición. Discutieron y, al salir dando un portazo, se rasgó la chaqueta. Se fue furioso pero no regresó. La hora no coincide con la ventana de la muerte (23:15–23:35).",
      esCulpable: false,
    },
    {
      id: "marta",
      nombre: "Marta Solé Ibarra",
      edad: 34,
      rol: "Subdirectora y asistente de dirección",
      relacion:
        "Aspiraba desde hace tiempo al puesto de directora asociada, que Elena aún no le había confirmado.",
      testimonio:
        "«Después de la función estuve con Ricardo repasando notas, en el pasillo de camerinos, desde que bajó el telón hasta que se armó el escándalo. No me separé de él en ningún momento. Con Elena tuve una charla normal esa tarde sobre la temporada que viene, nada fuera de lo común.»",
      coartada: "Dice haber estado con Ricardo todo el tiempo tras la función.",
      contradiccionClave:
        "Su coartada choca de frente con la de Ricardo, que declara haber estado solo. Además, la huella parcial de pulgar en la copa de vino rota coincide con la suya.",
      siSeLoConfronta:
        "Se derrumba: reconoce que estuvo en el despacho con Elena hacia las 23:15, tomando una copa que ella misma le ofreció 'para cerrar la temporada en paz'. La conversación se torció cuando Elena le dijo que sabía que Marta llevaba semanas saboteando las entradas de luces y sonido de Ricardo para hacerlo quedar mal ante la crítica y quedarse con el papel protagónico en la reposición — y que, además de exponerlo ante la junta al día siguiente, no la ascendería a directora asociada. Marta tomó el trofeo del estante y la golpeó en la nuca. Al ver que no reaccionaba, entró en pánico, usó la cuerda de tramoya —que conocía bien por su trabajo con el equipo técnico— para simular el ahorcamiento, limpió el trofeo con disolvente de utilería y lo devolvió a su sitio. La nota sobre las cuentas la escribió ella misma, imitando una disputa económica, para desviar la sospecha hacia el terreno financiero.",
      esCulpable: true,
    },
    {
      id: "diego",
      nombre: "Diego Hurtado Castro",
      edad: 29,
      rol: "Técnico de sonido y luces / utilero",
      relacion: "Empleado técnico del teatro; acumulaba deudas de juego.",
      testimonio:
        "«Estuve en la cabina de control toda la noche, manejando las luces del cierre y el audio de la fiesta de después. La cámara del pasillo se cortó sola, ya ha fallado antes, el sistema es viejo. Yo fui quien encontró a la señora Vasco cuando bajé a avisarle que ya podíamos apagar el escenario.»",
      coartada: "Dice haber estado solo en la cabina de control toda la noche.",
      contradiccionClave:
        "El corte de la cámara coincide exactamente con su turno en solitario en la cabina, que él mismo controla. Los registros de mantenimiento no muestran fallos previos de esa cámara en los últimos 8 meses.",
      siSeLoConfronta:
        "Confiesa que apagó el sistema de cámaras para sacar equipo de sonido del inventario sin que quedara registrado: llevaba semanas vendiendo micrófonos y consolas para pagar deudas de juego. Es el motivo real de su nerviosismo y su mentira inicial, pero no está relacionado con la muerte de Elena.",
      esCulpable: false,
    },
    {
      id: "carla",
      nombre: "Carla Núñez Farías",
      edad: 41,
      rol: "Dramaturga y socia minoritaria del teatro",
      relacion:
        "Copropietaria del inmueble del teatro junto con Elena e Iván Roth; tuvo una discusión pública con Elena esa misma tarde sobre el futuro de la temporada.",
      testimonio:
        "«Me fui del teatro a las 22:50, en cuanto terminaron los aplausos, tenía jaqueca. Tomé un taxi a casa y ya no volví.»",
      coartada: "Dice haber tomado un taxi a casa a las 22:50.",
      contradiccionClave:
        "El recibo de taxi que ella misma entregó como coartada marca la recogida a las 23:35 en la puerta lateral del teatro: 45 minutos después de lo que declara haber salido.",
      siSeLoConfronta:
        "Confiesa que esos 45 minutos los pasó reunida en el bar de la esquina con un comprador inmobiliario, negociando en secreto la venta del edificio del teatro a espaldas de Elena y de la junta. Un motivo económico real, pero sin relación directa con el homicidio.",
      esCulpable: false,
    },
  ],

  pruebas: [
    { id: "trofeo", nombre: "Trofeo 'Cándido de Honor'", tipo: "arma homicida" },
    { id: "copa", nombre: "Huella de pulgar en la copa de vino", tipo: "evidencia física" },
    { id: "tela", nombre: "Fragmento de tela de la chaqueta", tipo: "evidencia física" },
    { id: "camara", nombre: "Corte de cámara de seguridad", tipo: "registro técnico" },
    { id: "reloj", nombre: "Reloj detenido a las 23:24", tipo: "evidencia física" },
    { id: "nota", nombre: "Nota manuscrita sobre las cuentas", tipo: "documento" },
    { id: "autopsia", nombre: "Informe de autopsia", tipo: "informe forense" },
    { id: "taxi", nombre: "Recibo de taxi de Carla Núñez", tipo: "documento" },
  ],

  objetivos: [
    {
      id: "obj1",
      titulo: "1. La escena no cuadra",
      descripcion:
        "Revisen la escena del crimen y el informe de autopsia. Determinen la verdadera causa de la muerte, el arma homicida y la franja horaria del deceso.",
      pregunta: "¿Qué ocurrió realmente con Elena Vasco Reyes?",
      opciones: [
        "Se suicidó ahorcándose en su despacho.",
        "Fue golpeada en la nuca con un objeto contundente y luego colgada para simular un suicidio.",
        "Murió por estrangulamiento manual durante un forcejeo.",
        "Se cayó accidentalmente y se golpeó la cabeza.",
      ],
      respuestaCorrecta: 1,
      pistaSiFalla:
        "Fíjense en la diferencia entre las heridas 'vitales' (con la víctima viva) y las heridas 'post mortem' (después de morir) que describe la autopsia.",
    },
    {
      id: "obj2",
      titulo: "2. Las coartadas se rompen",
      descripcion:
        "Crucen los testimonios de los cuatro sospechosos con las pruebas físicas. Dos coartadas son directamente contradictorias entre sí.",
      pregunta: "¿Qué dos sospechosos se contradicen frontalmente sobre dónde estuvieron tras la función?",
      opciones: [
        "Diego y Carla",
        "Ricardo y Diego",
        "Marta y Ricardo",
        "Carla y Marta",
      ],
      respuestaCorrecta: 2,
      pistaSiFalla:
        "Uno de ellos dice haber estado 'solo'. La otra persona dice haber estado 'con él todo el tiempo'. No pueden ser ambas ciertas.",
    },
  ],

  acusacionFinal: {
    titulo: "3. La acusación",
    descripcion:
      "Presenten su acusación formal: sospechoso, arma homicida, motivo y al menos dos pruebas que respalden su versión.",
    sospechosoCorrectoId: "marta",
    armaCorrectaId: "trofeo",
    motivos: [
      { id: "m1", texto: "Ambición profesional: quedarse con el papel protagónico y ser ascendida.", correcto: true },
      { id: "m2", texto: "Venganza pasional por una relación amorosa fallida.", correcto: false },
      { id: "m3", texto: "Disputa económica por la venta del teatro.", correcto: false },
      { id: "m4", texto: "Deudas de juego y necesidad de dinero.", correcto: false },
    ],
    pruebasClave: ["copa", "trofeo", "autopsia"],
  },

  puntuacion: {
    sospechosoCorrecto: 40,
    armaCorrecta: 20,
    motivoCorrecto: 20,
    porPruebaCorrecta: 10,
    maxPruebasQueCuentan: 2,
    penalizacionPorAcusarInocente: -15,
    bonusSinPistas: 10,
  },
};

export default caso;
