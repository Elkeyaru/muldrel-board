# Muldrel Board — Expediente Criminal

Prototipo jugable de un juego de mesa online de resolución de casos criminales, pensado
para jugar en solitario o en grupo (2-8 personas), de forma cooperativa y en tiempo real.

## Probar en local (modo solo, sin configurar nada)

```bash
npm install
npm run dev
```

Abre la URL que te indique la terminal. Sin configurar Firebase, la app funciona en
**modo local**: puedes crear una sala y abrirla en varias pestañas del mismo navegador
para probar cómo se sincroniza, pero no verán la sala amigos en otros dispositivos.

## Jugar en tiempo real con amigos (gratis, ~10 minutos de configuración)

1. Ve a [https://console.firebase.google.com](https://console.firebase.google.com) y crea
   un proyecto nuevo (gratis, no pide tarjeta).
2. Dentro del proyecto, ve a **Compilación > Firestore Database** y créala en **modo de
   producción**, en cualquier región.
3. Ve a **Firestore Database > Reglas** y pega esto (permite jugar sin cuentas, solo
   dentro de tus salas de código; suficiente para jugar con amigos, no expone datos
   sensibles):

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /salas/{codigo} {
         allow read, write: if true;
       }
     }
   }
   ```

4. Ve a **Configuración del proyecto** (el engranaje) > **Tus apps** > icono `</>` para
   añadir una app web. Copia las claves que te da (`apiKey`, `authDomain`, etc.).
5. En la carpeta del proyecto, copia `.env.example` a `.env` y pega ahí tus claves.
6. Reinicia `npm run dev`. Ahora la sala se sincroniza en tiempo real entre cualquier
   dispositivo con la URL, sin que nadie necesite crear cuenta.

### Publicar la web para que tus amigos entren desde un link

Con Firebase Hosting (gratis):

```bash
npm install -g firebase-tools
firebase login
firebase init hosting   # elige tu proyecto, carpeta "dist", SPA: sí
npm run build
firebase deploy
```

Te dará una URL pública (`https://tu-proyecto.web.app`) para compartir con el grupo.
Alternativamente puedes desplegar la carpeta `dist/` en Vercel o Netlify (gratis) sin
usar `firebase deploy`; Firestore seguirá funcionando igual porque la conexión se hace
desde el navegador de cada jugador.

## Cómo se juega

1. Alguien crea una sala (queda como anfitrión) y comparte el **código de 5 caracteres**
   o el link con `?sala=CODIGO`.
2. El resto se une escribiendo el código y su nombre. Sin cuentas, sin contraseñas.
3. El anfitrión abre el expediente y todo el grupo investiga junto: escena del crimen,
   autopsia, interrogatorios a sospechosos (con confrontaciones que revelan
   contradicciones), pruebas físicas y un tablero de notas compartido en tiempo real.
4. El grupo responde dos objetivos de investigación y presenta una **acusación final**
   (sospechoso, arma, motivo y pruebas de respaldo), que se puntúa sobre 100.

## Sobre el caso incluido

El expediente "Telón Final" (`src/data/caso-telon-final.js`) es un caso original de
ficción, con un homicidio disfrazado de suicidio, cuatro sospechosos con coartadas
cruzadas y contradictorias, y varias pistas falsas deliberadas para que la deducción
tenga peso real. Está pensado para 90–120 minutos de juego, +16 años.

## Próximos pasos sugeridos

- Roles especiales asimétricos (cada jugador ve una parte distinta del expediente),
  seleccionables junto al modo cooperativo actual.
- Más casos en `src/data/`.
- Cronómetro de partida y ranking entre grupos.
