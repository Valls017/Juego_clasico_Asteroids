# Juego de asteroides - Proyecto de Programación Web  

Este proyecto es una recreación del clásico juego *Asteroids*, desarrollado completamente del lado del cliente (en el navegador) usando HTML5, CSS y JavaScript con la API de Canvas.

---

## Arquitectura del Proyecto

Para garantizar un código escalable, mantenible y limpio, el motor del juego fue refactorizado utilizando el patrón de diseño **Modelo-Vista-Controlador (MVC)** e implementado mediante **ES6 Modules**.

La estructura del proyecto se divide en las siguientes responsabilidades:

* **`model.js` (Modelo):**
  Encapsula el estado global del juego (`state`) y la lógica de negocio. Se encarga de calcular las físicas (inercia, vectores de velocidad), la trigonometría del movimiento, la detección de colisiones y la generación procedimental de los vértices para las formas irregulares de los asteroides. Es completamente agnóstico a la interfaz gráfica.
* **`view.js` (Vista):**
  Su única responsabilidad es renderizar el estado actual del juego. Utiliza la API de `CanvasRenderingContext2D` para dibujar los polígonos, limpiar los fotogramas y actualizar la interfaz de usuario (Score y Game Over) basándose en los datos proporcionados por el Modelo.
* **`controller.js` (Controlador):**
  Actúa como intermediario gestionando los eventos de entrada del usuario (`keydown`, `keyup`). Captura las interacciones con el teclado y ejecuta las funciones de mutación de estado correspondientes en el Modelo.
* **`main.js` (Core Loop):**
  Archivo de orquestación principal. Importa los módulos, inicializa los componentes y ejecuta el `gameLoop` a 60 FPS mediante `requestAnimationFrame()`, sincronizando la actualización de físicas y el renderizado visual.

## Características Técnicas Destacadas

* **Renderizado Optimizado:** Uso de Canvas en lugar de manipulación directa del DOM o animaciones CSS, logrando un rendimiento fluido de 60 FPS al manejar docenas de entidades simultáneas.
* **Generación Procedimental:** Los asteroides no son imágenes estáticas ni círculos perfectos. Sus vértices se calculan dinámicamente mediante coordenadas polares y factores de aleatoriedad para crear polígonos irregulares únicos.
* **Hitboxes Eficientes:** Para optimizar los cálculos de la CPU, la detección de colisiones utiliza un sistema de *hitboxes* circulares (mediante el Teorema de Pitágoras) aunque el renderizado visual sea poligonal complejo.
* **Físicas Arcade:** Implementación de inercia y fricción para simular el desplazamiento en el vacío del espacio, junto con el clásico efecto de "Screen Wrapping" (reaparecer por el borde opuesto).

## Instrucciones de Ejecución

Debido a la implementación estricta de ES6 Modules (`import`/`export`), este proyecto **no puede ejecutarse simplemente abriendo el archivo HTML** en el navegador por restricciones de seguridad (CORS). 

Para ejecutar el juego en un entorno de desarrollo local:
1. Abrir el proyecto en un editor de código como Visual Studio Code.
2. Iniciar un servidor local (por ejemplo, utilizando la extensión **Live Server**).
3. Acceder a la URL local generada (usualmente `http://127.0.0.1:5500/index.html`).

## Controles
* **Flecha Izquierda / Derecha:** Rotar la nave.
* **Flecha Arriba:** Acelerar (Thrust).
* **Barra Espaciadora:** Disparar.
* **Enter:** Reiniciar partida (en pantalla de Game Over).
