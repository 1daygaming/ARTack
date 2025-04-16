// main.js
// Entry point for AR-Tack! game

// TODO: Replace with your real 8th Wall app key in index.html

window.onload = () => {
  // Проверяем, что 8th Wall загрузился
  if (!window.XR8) {
    document.getElementById('status').innerText = '8th Wall not loaded.';
    return;
  }

  // Инициализация 8th Wall
  XR8.addCameraPipelineModules([
    // Three.js integration
    XR8.Threejs.pipelineModule(),
    // Ваши кастомные модули можно добавить сюда
  ]);

  XR8.run({canvas: document.getElementById('ar-container')});

  // Three.js scene setup
  const {scene, camera, renderer} = XR8.Threejs.xrScene();

  // Пример: добавим свет
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 2, 3);
  scene.add(light);

  // TODO: добавить размещение планеты, баз, врагов и т.д.

  // UI
  document.getElementById('start-btn').onclick = () => {
    document.getElementById('status').innerText = 'Game started!';
    // TODO: запуск игровой логики
  };
}; 