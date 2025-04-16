// main.js
// AR-Tack! — AR.js + Three.js integration

// TODO: Replace with your real 8th Wall app key in index.html

window.onload = () => {
  const status = document.getElementById('status');
  status.innerText = 'Waiting for AR...';

  const marker = document.querySelector('a-marker');
  marker.addEventListener('markerFound', () => {
    status.innerText = 'Marker found! Tap Start to place the planet!';
    document.getElementById('start-btn').onclick = () => {
      status.innerText = 'Placing planet...';
      placePlanet();
    };
  });
};

function placePlanet() {
  const container = document.querySelector('#threejs-container');
  container.innerHTML = '';

  // Сфера в центре маркера
  const planet = document.createElement('a-sphere');
  planet.setAttribute('radius', 0.5);
  planet.setAttribute('color', '#3cf');
  planet.setAttribute('position', '0 0 0');
  planet.setAttribute('shadow', 'cast: true; receive: true');
  container.appendChild(planet);

  // Базы по верхней полусфере вокруг центра маркера
  const baseCount = 4;
  const baseRadius = 0.6;
  for (let i = 0; i < baseCount; i++) {
    // Угол от 0 до pi (верхняя полусфера)
    const theta = (i / (baseCount - 1)) * Math.PI; // 0, pi/3, 2pi/3, pi
    const phi = Math.PI / 4; // фиксируем phi для распределения по дуге
    const x = Math.sin(theta) * Math.cos(phi) * baseRadius;
    const y = Math.abs(Math.cos(theta)) * baseRadius + 0.35; // всегда положительный y
    const z = Math.sin(theta) * Math.sin(phi) * baseRadius;
    const base = document.createElement('a-box');
    base.setAttribute('width', 0.15);
    base.setAttribute('height', 0.1);
    base.setAttribute('depth', 0.15);
    base.setAttribute('color', '#fc3');
    base.setAttribute('position', `${x} ${y} ${z}`);
    base.setAttribute('shadow', 'cast: true; receive: true');
    container.appendChild(base);
  }

  document.getElementById('status').innerText = 'Planet placed!';
} 