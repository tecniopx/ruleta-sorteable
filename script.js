let options = ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4'];
let trickedOption = -1;  // Si está -1, no está trucada

// Función para dibujar la ruleta
function drawWheel() {
  const canvas = document.getElementById('wheel');
  const ctx = canvas.getContext('2d');
  const numOptions = options.length;
  const angle = 2 * Math.PI / numOptions;
  const radius = 150;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibuja cada sección de la ruleta
  for (let i = 0; i < numOptions; i++) {
    ctx.fillStyle = `hsl(${i * (360 / numOptions)}, 70%, 60%)`;  // Colores saturados
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.arc(200, 200, radius, angle * i, angle * (i + 1));
    ctx.lineTo(200, 200);
    ctx.fill();

    // Escribir el texto de la opción
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.save();
    ctx.translate(200, 200);
    ctx.rotate(angle * i + angle / 2);
    ctx.fillText(options[i], 0, -radius + 20);
    ctx.restore();
  }
}

// Función para girar la ruleta
function spinWheel() {
  const canvas = document.getElementById('wheel');
  const ctx = canvas.getContext('2d');
  const numOptions = options.length;
  let randomAngle = Math.random() * 2 * Math.PI;
  let totalRotation = randomAngle + Math.PI * 2 * 3;  // Hacer que gire varias veces

  // Si está trucada, girar a la opción trucada
  if (trickedOption !== -1) {
    const angle = 2 * Math.PI / numOptions;
    totalRotation = angle * trickedOption + angle / 2;
  }

  // Animación de giro
  let startTime = Date.now();
  let animation = setInterval(function () {
    let elapsed = (Date.now() - startTime) / 1000;
    let rotation = totalRotation * (elapsed / 3);  // 3 segundos para el giro
    drawWheel(rotation);

    if (elapsed >= 3) {
      clearInterval(animation);
    }
  }, 10);
}

// Función para añadir una nueva opción
function addOption() {
  const newOptionInput = document.getElementById('newOption');
  const newOption = newOptionInput.value.trim();
  if (newOption !== '') {
    options.push(newOption);
    newOptionInput.value = '';
    drawWheel();
  }
}

// Función para eliminar todas las opciones
function clearOptions() {
  options = [];
  drawWheel();
}

// Función para trucar la ruleta
function setTrick() {
  const trickInput = document.getElementById('trickOption');
  trickedOption = parseInt(trickInput.value);
  if (isNaN(trickedOption) || trickedOption < 0 || trickedOption >= options.length) {
    alert('Índice no válido');
  }
}

// Iniciar la ruleta al cargar la página
drawWheel();
