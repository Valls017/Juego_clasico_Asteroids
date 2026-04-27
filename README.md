# Juego de Asteroids - Proyecto de Programación Web

Este es mi proyecto de recreación del clásico juego arcade *Asteroids*. Está hecho 100% con HTML5, CSS y JavaScript puro (usando la API de Canvas), sin necesidad de usar servidores externos.

---

## ¿Cómo está armado el código? (Arquitectura MVC)

Para evitar un código espagueti gigante y mantener las cosas simples y bien estructuradas, decidí refactorizar todo el juego usando el patrón **Modelo-Vista-Controlador (MVC)** con **Módulos de ES6**. 

Así es como dividí el trabajo para que cada archivo tenga una sola tarea:

* **`index.html`**: Súper limpio. Solo tiene el `<canvas>` donde se dibuja el juego y llama a `main.js` usando `type="module"`.
* **`style.css`**: Lo básico para la presentación. Usa Flexbox para centrar la pantalla del juego en medio del monitor y le pone el fondo negro espacial.
* **`model.js` (El Cerebro)**: Aquí viven los datos. Se encarga de toda la matemática: calcular las físicas, la inercia, mover la nave con trigonometría y detectar si chocaste. No dibuja nada, solo hace cálculos.
* **`view.js` (El Pintor)**: Hace lo contrario. Agarra los datos del modelo y los dibuja en el Canvas. Se encarga de trazar las líneas blancas, actualizar el puntaje y mostrar la pantalla de Game Over.
* **`controller.js` (Los Controles)**: Solo escucha el teclado (las flechas y el espacio) y le avisa al modelo qué tiene que actualizar.
* **`main.js` (El Motor)**: Es el que une las tres piezas anteriores. Corre el bucle principal a 60 FPS para que el juego se mueva fluido.

## Detalles Técnicos Interesantes

* **Asteroides únicos:** No uso imágenes estáticas. Los asteroides se dibujan calculando puntos aleatorios alrededor de un círculo base, por eso ninguno sale con la misma forma geométrica.
* **Colisiones optimizadas:** Para que el juego no se ponga lento calculando si tocaste una esquina rara de un asteroide, uso un "hitbox" circular invisible. Calculo la distancia entre los centros usando el Teorema de Pitágoras; es mucho más rápido y rinde mejor.
* **Física clásica:** Le puse inercia y fricción a la nave para que resbale como en el espacio real, y si sales por un borde de la pantalla, apareces por el lado opuesto.

## ¿Cómo probarlo?

Como dividí el código en varios archivos usando módulos modernos de JavaScript (`import/export`), los navegadores bloquean el juego si solo le das doble clic al archivo HTML (por temas de seguridad de CORS). 

Para jugarlo sin problemas:
1. Abre la carpeta del proyecto en Visual Studio Code.
2. Arranca un servidor local (yo recomiendo usar la extensión **Live Server**).
3. Abre la dirección que te genera (casi siempre es `http://127.0.0.1:5500/index.html`) en tu navegador.

## Controles
* **Flechas Izquierda / Derecha:** Girar la nave.
* **Flecha Arriba:** Acelerar.
* **Barra Espaciadora:** Disparar.
* **Enter:** Reiniciar cuando pierdes.

**¡Ojalá todo el que lo pruebe se divierta un buen rato con el juego!**
