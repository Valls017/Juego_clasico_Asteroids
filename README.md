# Juego_clasico_Asteroids
# Asteroids Arcade Clone - Proyecto de Programación Web

Este proyecto es una recreación en cliente (Browser-side) del clásico juego Asteroids, desarrollado utilizando únicamente HTML5, CSS y JavaScript (Canvas API).

## Fases de Desarrollo

### Fase 1: Configuración Base y Renderizado
En esta primera semana, el objetivo fue establecer el entorno, elegir la tecnología de renderizado y dibujar nuestro primer elemento en pantalla.

**Decisión Técnica Principal:** Se optó por utilizar **HTML5 Canvas** en lugar de SVG o Animaciones CSS. Canvas ofrece un rendimiento muy superior para juegos 2D que requieren actualizar docenas de coordenadas en cada fotograma (60 FPS), manteniendo el código lógico, simple y funcional.

#### Explicación del Código (Paso a Paso)

**1. HTML (`index.html`)**
La estructura es mínima. Solo creamos un elemento `<canvas>` con el id `gameCanvas`. Este elemento actúa como la pantalla en blanco de nuestra máquina arcade. Al final del `body`, cargamos nuestro script para asegurar que el HTML cargue primero.

**2. CSS (`style.css`)**
El objetivo aquí fue limpiar la pantalla y centrar el juego:
* Eliminamos los márgenes por defecto del navegador (`margin: 0`).
* Establecemos el fondo de la página en negro para dar la sensación de espacio.
* Usamos *Flexbox* (`display: flex`, `justify-content: center`, `align-items: center`) para que el Canvas quede perfectamente centrado en la pantalla del jugador.

**3. JavaScript (`game.js`)**
Aquí es donde ocurre la magia. Lo dividimos en partes funcionales:

* **Configuración del Contexto:** Usamos `canvas.getContext("2d")`. Esto es crucial, ya que nos da acceso a todas las herramientas de dibujo 2D integradas en JavaScript (para hacer líneas, rellenar formas, etc.).
* **El Objeto Jugador (`ship`):** En lugar de crear clases complejas desde el día uno, guardamos la información de nuestra nave en un objeto simple. Guardamos su posición (`x`, `y`), su tamaño (`radius`) y hacia dónde apunta (`angle`).
* **La Función `draw()`:** Esta función dibuja un fotograma estático. 
  * Primero, pinta todo el canvas de negro (`fillRect`) para borrar el fotograma anterior.
  * Luego, usa trigonometría básica (`Math.cos` y `Math.sin`) para calcular dónde están las tres esquinas del triángulo de la nave a partir de su punto central, y traza las líneas blancas (`lineTo` y `stroke`).
* **El Motor / Game Loop:** Usamos `requestAnimationFrame(gameLoop)`. Esta función nativa del navegador le dice a la pantalla: "Justo antes de que refresques la imagen de tu monitor, vuelve a ejecutar el `gameLoop`". Esto crea un ciclo infinito suave que corre a la velocidad del monitor (usualmente 60 fotogramas por segundo), lo cual es perfecto para nuestro juego.

### Próximos Pasos (Fase 2)
* Implementar rotación de la nave capturando eventos del teclado.
* Aplicar física de inercia y velocidad para el desplazamiento.
* (Extra planeado): Estructuración de lógica para incluir un Jefe Final en etapas avanzadas.
