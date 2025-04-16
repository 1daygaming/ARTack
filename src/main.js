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

  // Базы по верхней полусфере
  const baseCount = 4;
  const baseRadius = planetRadius; // базы на поверхности сферы
  const baseHeight = 0.1;
  for (let i = 0; i < baseCount; i++) {
    // Угол theta от 0 до pi/2 (верхняя полусфера)
    const theta = Math.PI / 4 + (i / (baseCount - 1)) * (Math.PI / 2); // равномерно по дуге сверху
    const phi = (i / baseCount) * 2 * Math.PI; // равномерно по окружности
    // Координаты центра базы на поверхности сферы
    const x = baseRadius * Math.sin(theta) * Math.cos(phi);
    const y = baseRadius * Math.cos(theta);
    const z = baseRadius * Math.sin(theta) * Math.sin(phi);
    // Нормаль (вектор из центра сферы в точку базы)
    const nx = x;
    const ny = y;
    const nz = z;
    // Смещаем базу вдоль нормали на половину высоты базы
    const norm = Math.sqrt(nx*nx + ny*ny + nz*nz);
    const bx = x + (nx / norm) * (baseHeight / 2);
    const by = y + (ny / norm) * (baseHeight / 2);
    const bz = z + (nz / norm) * (baseHeight / 2);
    // Вычисляем rotation (A-Frame: x y z в градусах)
    // Воспользуемся методом look-at: пусть база "смотрит" из центра сферы в свою позицию
    // Получим вектор нормали и переведём в rotation
    const up = [0, 1, 0];
    const normal = [nx / norm, ny / norm, nz / norm];
    // Получаем угол между up и normal
    const dot = up[0]*normal[0] + up[1]*normal[1] + up[2]*normal[2];
    const angle = Math.acos(dot);
    // Ось вращения — векторное произведение up и normal
    const rx = up[1]*normal[2] - up[2]*normal[1];
    const ry = up[2]*normal[0] - up[0]*normal[2];
    const rz = up[0]*normal[1] - up[1]*normal[0];
    // Преобразуем в rotation для A-Frame (в градусах)
    // Для простоты используем только вращение вокруг оси X и Z (Y не нужен для симметрии)
    // Можно использовать библиотеку, но здесь вручную:
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