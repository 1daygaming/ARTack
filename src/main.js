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
  const planetRadius = 0.5;
  const planet = document.createElement('a-sphere');
  planet.setAttribute('radius', planetRadius);
  planet.setAttribute('color', '#3cf');
  planet.setAttribute('position', '0 0 0');
  planet.setAttribute('shadow', 'cast: true; receive: true');
  container.appendChild(planet);

  // Базы по верхней полусфере (одна широта, равномерно по окружности)
  const baseCount = 4;
  const baseRadius = planetRadius;
  const baseHeight = 0.1;
  const theta = Math.PI / 4; // фиксированная широта (45°)
  for (let i = 0; i < baseCount; i++) {
    const phi = (i / baseCount) * 2 * Math.PI;
    const x = baseRadius * Math.sin(theta) * Math.cos(phi);
    const y = baseRadius * Math.cos(theta);
    const z = baseRadius * Math.sin(theta) * Math.sin(phi);
    const nx = x;
    const ny = y;
    const nz = z;
    const norm = Math.sqrt(nx*nx + ny*ny + nz*nz);
    const bx = x + (nx / norm) * (baseHeight / 2);
    const by = y + (ny / norm) * (baseHeight / 2);
    const bz = z + (nz / norm) * (baseHeight / 2);
    const rotX = -THREE.MathUtils.radToDeg(theta - Math.PI/2);
    const rotY = THREE.MathUtils.radToDeg(phi);
    const rotZ = 0;
    const base = document.createElement('a-box');
    base.setAttribute('width', 0.15);
    base.setAttribute('height', baseHeight);
    base.setAttribute('depth', 0.15);
    base.setAttribute('color', '#fc3');
    base.setAttribute('position', `${bx} ${by} ${bz}`);
    base.setAttribute('rotation', `${rotX} ${rotY} ${rotZ}`);
    base.setAttribute('shadow', 'cast: true; receive: true');
    container.appendChild(base);
  }

  document.getElementById('status').innerText = 'Planet placed!';
} 