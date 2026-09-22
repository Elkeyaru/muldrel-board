# Muldrel Board — Expediente Muldrel

Juego de mesa online de resolución de casos criminales. Prototipo jugable en un solo
archivo (`index.html`), pensado para publicarse gratis en GitHub Pages.

## Jugar en local

No hace falta instalar nada: es HTML/CSS/JS plano. Solo necesita servirse por HTTP (no
abrir el archivo directamente) porque usa `<audio>` con rutas relativas.

```bash
npx serve .
```

y abre la URL que te indique (o usa la configuración `muldrel-static` si trabajas con
Claude Code).

## Publicar en GitHub Pages

Este repositorio está pensado para servirse desde la raíz de la rama `main`:

1. `Settings → Pages → Build and deployment → Source: Deploy from a branch`.
2. Rama `main`, carpeta `/ (root)`.
3. GitHub te da una URL tipo `https://<usuario>.github.io/<repo>/` en 1–2 minutos.

## Cómo se juega ahora mismo

- **Menú y lobby**: pantalla de portón → menú con música ambiental → selección de caso.
- **Investigación compartida entre pestañas**: si abres esta misma página en varias
  pestañas del mismo navegador, comparten la escena, las confrontaciones y el corcho de
  conexiones en tiempo real (vía `localStorage`).
- **Acusación individual y ranking**: cada persona escribe su propia teoría y presenta su
  propia acusación (bloqueada al confirmar, con cronómetro personal). El ranking se revela
  cuando todas las personas de la ronda han terminado.

### Limitación actual: solo mismo navegador

La sincronización de sala hoy usa `localStorage`, que **no cruza dispositivos** — sirve
para probarlo en varias pestañas de una misma computadora, no para que cada amigo juegue
desde su propio celular. Para eso hace falta una sala por código con un backend en tiempo
real de verdad.

## `app-vite-firebase/` — el camino a multijugador real entre dispositivos

Ahí vive una versión en React + Vite con salas por código sobre **Firebase Firestore**
(gratis, sin tarjeta) que si sincroniza entre dispositivos distintos. Tiene su propio
`README.md` con los pasos de configuración. Está por detrás del contenido y las mecánicas
del `index.html` actual — el plan es portar las mejoras (menú, corcho con desbloqueo,
ranking, etc.) ahí una vez que se confirme que vale la pena el salto a backend real.
