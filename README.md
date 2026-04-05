# Juego de asteroides - Proyecto de Programación Web  

Este proyecto es una recreación del clásico juego *Asteroids*, desarrollado completamente del lado del cliente (en el navegador) usando HTML5, CSS y JavaScript con la API de Canvas.

---

## Fases de Desarrollo  

### Fase 1: Configuración Base y Renderizado  

En esta primera etapa me enfoqué en preparar todo el entorno, elegir cómo iba a renderizar el juego y lograr dibujar el primer elemento en pantalla.

### Decisión Técnica Principal  
Decidí usar **HTML5 Canvas** en lugar de SVG o animaciones con CSS. La razón es que Canvas tiene mejor rendimiento para juegos 2D donde se tienen que actualizar muchas posiciones constantemente. Además, me permite mantener el código más simple y directo.

---

## Explicación del Código  

### 1. HTML (index.html)  
La estructura es bastante simple. Solo creé un elemento `<canvas>` con el id `gameCanvas`, que básicamente funciona como la pantalla del juego.  

También coloqué el script al final del `<body>` para asegurarme de que todo el HTML cargue antes de ejecutar el JavaScript.

---

### 2. CSS (style.css)  
Aquí mi objetivo fue limpiar la pantalla y centrar el juego:

- Quité los márgenes por defecto del navegador (`margin: 0`)
- Puse el fondo negro para dar una sensación de espacio
- Usé **Flexbox** (`display: flex`, `justify-content: center`, `align-items: center`) para centrar el canvas perfectamente en la pantalla

---

### 3. JavaScript (game.js)  

Aquí es donde realmente empieza lo importante:

#### Configuración del Contexto  
Uso `canvas.getContext("2d")` para obtener el contexto de dibujo. Esto me permite usar todas las herramientas necesarias para dibujar en 2D (líneas, formas, etc.).

#### Objeto Jugador (ship)  
En lugar de complicarme desde el inicio con clases, decidí usar un objeto simple para la nave. Ahí guardo:

- Posición (`x`, `y`)
- Tamaño (`radius`)
- Ángulo hacia donde apunta (`angle`)

---

#### Función draw()  
Esta función se encarga de dibujar cada fotograma:

1. Primero limpio la pantalla pintando todo el canvas de negro (`fillRect`)
2. Luego uso trigonometría (`Math.cos` y `Math.sin`) para calcular las posiciones de las tres puntas del triángulo (la nave)
3. Finalmente dibujo las líneas con `lineTo` y `stroke`

---

#### Game Loop / Motor del Juego  
Uso `requestAnimationFrame(gameLoop)`, que básicamente le dice al navegador que ejecute continuamente el bucle del juego justo antes de cada refresco de pantalla.



---

## Fase 2
-tbd(To Be Determined)




---
