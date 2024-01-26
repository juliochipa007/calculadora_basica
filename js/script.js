const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");

// Agregar evento de escucha para las teclas del teclado
document.addEventListener("keydown", (event) => {
  const tecla = event.key;
  manejarTecla(tecla);
});

// Función para manejar las pulsaciones de teclas
function manejarTecla(tecla) {
  // Convierte la colección de nodos 'botones' en un array.
  const botonesArray = Array.from(botones);

  // Utiliza el método 'find()' para buscar un botón cuyo texto coincida con la tecla presionada.
  const boton = botonesArray.find((btn) => btn.textContent === tecla);

  // Si el botón no es nulo, simular un clic en el botón
  if (boton) {
    boton.click();
  } else {
    // Manejar operaciones y otras teclas
    switch (tecla) {
      case "+":
      case "-":
      case "*":
      case "/":
        document.getElementById("operacion").click();
        break;
      case "Enter":
        document.getElementById("igual").click();
        break;
      case "Escape":
        document.getElementById("inicio").click();
        break;
      case ".":
        document.getElementById("punto").click();
        break;
      case "Backspace":
        document.getElementById("borrar").click();
        break;
      default:
        // Manejar números
        if (!isNaN(tecla)) {
          // Convierte la colección de nodos 'botones' en un array
          const botonesArray = Array.from(botones);

          // Busca el botón cuyo texto coincide con la tecla presionada
          const numeroBoton = botonesArray.find(
            (btn) => btn.textContent === tecla
          );
          if (numeroBoton) {
            numeroBoton.click();
          }
        }
    }
  }
}
// Fin del proceso de capturar numeros y otros por teclado fisico

// -----------------------------------------------------------------------

// Itera sobre todos los botones y agrega un evento de clic a cada uno.
botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    // Obtiene el texto del botón presionado.
    const botonApretado = boton.textContent;

    // Manejo del botón "C" (inicio)
    if (boton.id === "inicio") {
      pantalla.textContent = "0";
      return;
    }

    // Manejo del botón "←" (borrar)
    if (boton.id === "borrar") {
      // Restablece la pantalla a "0" si contiene un error.
      if (pantalla.textContent === "Error") {
        pantalla.textContent = "0";
      } else {
        // Borra el último carácter de la pantalla.
        if (pantalla.textContent.length === 1) {
          pantalla.textContent = "0";
        } else {
          pantalla.textContent = pantalla.textContent.slice(0, -1);
        }
      }
      return;
    }

    // Manejo del botón "=" (igual)
    if (boton.id === "igual") {
      // Evita realizar la operación si la pantalla muestra un error.
      if (pantalla.textContent === "Error") {
        return;
      }

      // Intenta evaluar la expresión en la pantalla y muestra el resultado.
      try {
        pantalla.textContent = eval(pantalla.textContent);
        const resultado = pantalla.textContent;
        // Manejando las diviciones entre 0 que sale Infinity
        if (isFinite(resultado)) {
          pantalla.textContent = resultado;
        } else {
          pantalla.textContent = "Error";
        }
      } catch (error) {
        // Si hay un error durante la evaluación, muestra "Error".
        pantalla.textContent = "Error";
      }
      return;
    }

    // Manejo de los dígitos y operadores
    if (pantalla.textContent === "0" || pantalla.textContent === "Error") {
      pantalla.textContent = botonApretado;
    } else {
      pantalla.textContent += botonApretado;
    }
  });
});
