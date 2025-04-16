// main.js
// AR-Tack! — AR.js + Three.js integration

// TODO: Replace with your real 8th Wall app key in index.html

window.onload = () => {
  const status = document.getElementById('status');
  status.innerText = 'Waiting for AR...';

  // Ждём, когда сцена AR.js будет готова
  document.querySelector('a-scene').addEventListener('loaded', () => {
    status.innerText = 'Tap Start to place the planet!';
  });

  document.getElementById('start-btn').onclick = () => {
    status.innerText = 'Placing planet...';
    placePlanet();
  };
};

function placePlanet() {
  const container = document.querySelector('#threejs-container');

  // Сфера в центре маркера
  const planet = document.createElement('a-sphere');
  planet.setAttribute('radius', 0.5);
  planet.setAttribute('color', '#3cf');
  planet.setAttribute('position', '0 0 0');
  planet.setAttribute('shadow', 'cast: true; receive: true');
  container.appendChild(planet);

  // Базы по кругу вокруг центра маркера
  const baseCount = 4;
  const baseRadius = 0.6;
  for (let i = 0; i < baseCount; i++) {
    const angle = (i / baseCount) * Math.PI * 2;
    const x = Math.cos(angle) * baseRadius;
    const y = 0;
    const z = Math.sin(angle) * baseRadius;
    const base = document.createElement('a-box');
    base.setAttribute('width', 0.15);
    base.setAttribute('height', 0.1);
    base.setAttribute('depth', 0.15);
    base.setAttribute('color', '#fc3');
    base.setAttribute('position', `${x} ${y + 0.35} ${z}`);
    base.setAttribute('shadow', 'cast: true; receive: true');
    container.appendChild(base);
  }

  document.getElementById('status').innerText = 'Planet placed!';
} 