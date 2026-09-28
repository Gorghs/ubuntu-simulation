// ==========================================
// KARTHICK V - NOTION 3D VOXEL ENGINE
// ==========================================

let scene, camera, renderer;
let currentMeshGroup = null;
let currentModelType = 'train';
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let targetZoom = 13;

function initThree() {
  const container = document.getElementById('notion-three-canvas');
  if (!container || typeof THREE === 'undefined') return;

  const width = container.clientWidth || 600;
  const height = container.clientHeight || 280;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 7, targetZoom);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Soft studio daylight illumination
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xfff8ee, 0.9);
  dirLight.position.set(10, 18, 12);
  dirLight.castShadow = true;
  scene.add(dirLight);

  const fillLight = new THREE.DirectionalLight(0xdbeafe, 0.45);
  fillLight.position.set(-10, -5, -8);
  scene.add(fillLight);

  // Build initial model
  loadModel(currentModelType);

  // Mouse & Touch Controls
  container.addEventListener('mousedown', e => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', e => {
    if (!isDragging || !currentMeshGroup) return;
    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;

    currentMeshGroup.rotation.y += deltaX * 0.012;
    currentMeshGroup.rotation.x += deltaY * 0.008;

    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  container.addEventListener('wheel', e => {
    e.preventDefault();
    targetZoom += e.deltaY * 0.01;
    if (targetZoom < 6) targetZoom = 6;
    if (targetZoom > 22) targetZoom = 22;
  }, { passive: false });

  // Touch Handlers
  container.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
      isDragging = true;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', e => {
    if (!isDragging || !currentMeshGroup || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - previousMousePosition.x;
    const deltaY = e.touches[0].clientY - previousMousePosition.y;

    currentMeshGroup.rotation.y += deltaX * 0.012;
    currentMeshGroup.rotation.x += deltaY * 0.008;

    previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { passive: true });

  window.addEventListener('resize', onWindowResize);
  animate();
}

function onWindowResize() {
  const container = document.getElementById('notion-three-canvas');
  if (!container || !renderer || !camera) return;
  const width = container.clientWidth;
  const height = container.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function createVoxelBox(w, h, d, colorHex, roughness = 0.5) {
  const geo = new THREE.BoxGeometry(w, h, d);
  const mat = new THREE.MeshStandardMaterial({
    color: colorHex,
    roughness: roughness,
    metalness: 0.1,
    flatShading: true
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

// 1. Steam Train Model
function buildMinecraftTrain() {
  const group = new THREE.Group();

  // Track sleepers & rails
  for (let z = -5; z <= 5; z += 1.2) {
    const sleeper = createVoxelBox(4.2, 0.25, 0.6, 0x6d4c28);
    sleeper.position.set(0, -1.8, z);
    group.add(sleeper);
  }
  const railL = createVoxelBox(0.25, 0.35, 12, 0x9e9e9e);
  railL.position.set(-1.5, -1.55, 0);
  const railR = createVoxelBox(0.25, 0.35, 12, 0x9e9e9e);
  railR.position.set(1.5, -1.55, 0);
  group.add(railL, railR);

  // Train Body
  const trainBody = new THREE.Group();
  const base = createVoxelBox(3.2, 1.2, 4.6, 0x4a4a4a);
  base.position.set(0, -0.7, 0);
  trainBody.add(base);

  // Wheels
  const w1 = createVoxelBox(0.3, 0.7, 0.7, 0x222222);
  w1.position.set(-1.7, -1.3, 1.4);
  const w2 = createVoxelBox(0.3, 0.7, 0.7, 0x222222);
  w2.position.set(-1.7, -1.3, -1.4);
  const w3 = createVoxelBox(0.3, 0.7, 0.7, 0x222222);
  w3.position.set(1.7, -1.3, 1.4);
  const w4 = createVoxelBox(0.3, 0.7, 0.7, 0x222222);
  w4.position.set(1.7, -1.3, -1.4);
  trainBody.add(w1, w2, w3, w4);

  // Boiler & Cabin
  const boiler = createVoxelBox(2.6, 2.0, 2.6, 0x333333);
  boiler.position.set(0, 0.8, 0.8);
  trainBody.add(boiler);

  const cabin = createVoxelBox(3.0, 2.8, 1.8, 0x3d3d3d);
  cabin.position.set(0, 1.2, -1.3);
  trainBody.add(cabin);

  // Roof & Chimney
  const roof = createVoxelBox(3.3, 0.35, 2.1, 0x1f1f1f);
  roof.position.set(0, 2.7, -1.3);
  trainBody.add(roof);

  const chimney = createVoxelBox(0.7, 1.5, 0.7, 0x1a1a1a);
  chimney.position.set(0, 2.4, 1.3);
  trainBody.add(chimney);

  // Glowing Furnace Core
  const furnace = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.0, 0.3), new THREE.MeshBasicMaterial({ color: 0xff6600 }));
  furnace.position.set(0, 0.5, 2.15);
  trainBody.add(furnace);

  // Puff Smoke
  const smoke1 = createVoxelBox(0.8, 0.8, 0.8, 0xd8d8d8);
  smoke1.position.set(0.1, 3.6, 1.1);
  const smoke2 = createVoxelBox(1.1, 1.1, 1.1, 0xefefef);
  smoke2.position.set(-0.2, 4.6, 0.6);
  trainBody.add(smoke1, smoke2);

  group.add(trainBody);
  return group;
}

// 2. Steve Voxel Model
function buildMinecraftSteve() {
  const group = new THREE.Group();
  const head = createVoxelBox(2.0, 2.0, 2.0, 0xd2a176);
  head.position.set(0, 3.0, 0);
  const hair = createVoxelBox(2.05, 0.7, 2.05, 0x4a2c11);
  hair.position.set(0, 3.7, 0);
  const body = createVoxelBox(2.0, 2.8, 1.1, 0x009999);
  body.position.set(0, 0.6, 0);

  const leftArm = createVoxelBox(0.8, 2.8, 0.8, 0x009999);
  leftArm.position.set(-1.5, 0.6, 0);

  const rightArm = createVoxelBox(0.8, 2.8, 0.8, 0x009999);
  rightArm.position.set(1.5, 0.6, 0);
  rightArm.rotation.x = -Math.PI / 4;

  const pickHandle = createVoxelBox(0.2, 2.8, 0.2, 0x8b5a2b);
  pickHandle.position.set(1.5, 1.4, 1.1);
  pickHandle.rotation.x = Math.PI / 4;

  const pickHead = createVoxelBox(1.6, 0.35, 0.35, 0x00f3ff);
  pickHead.position.set(1.5, 2.3, 2.0);

  const leftLeg = createVoxelBox(0.9, 2.8, 0.9, 0x283593);
  leftLeg.position.set(-0.5, -2.1, 0);
  const rightLeg = createVoxelBox(0.9, 2.8, 0.9, 0x283593);
  rightLeg.position.set(0.5, -2.1, 0);

  group.add(head, hair, body, leftArm, rightArm, pickHandle, pickHead, leftLeg, rightLeg);
  group.position.y = 0.5;
  return group;
}

// 3. Diamond Sword Model
function buildDiamondSword() {
  const group = new THREE.Group();
  const altar = createVoxelBox(3.8, 0.8, 3.8, 0x1e152a);
  altar.position.set(0, -3.0, 0);
  const altarGold = createVoxelBox(3.2, 0.3, 3.2, 0xffaa00);
  altarGold.position.set(0, -2.4, 0);
  group.add(altar, altarGold);

  const blade = createVoxelBox(0.7, 4.8, 0.2, 0x00ffff);
  blade.position.set(0, 1.0, 0);
  const tip = createVoxelBox(0.4, 0.7, 0.2, 0x55ffff);
  tip.position.set(0, 3.6, 0);
  const guard = createVoxelBox(2.4, 0.35, 0.4, 0x333333);
  guard.position.set(0, -1.3, 0);
  const handle = createVoxelBox(0.35, 1.3, 0.25, 0x6d4c28);
  handle.position.set(0, -1.9, 0);
  const pommel = createVoxelBox(0.6, 0.5, 0.35, 0x00f3ff);
  pommel.position.set(0, -2.6, 0);

  group.add(blade, tip, guard, handle, pommel);
  group.rotation.z = Math.PI / 6;
  return group;
}

// 4. Redstone AI Bot
function buildRedstoneBot() {
  const group = new THREE.Group();
  const chassis = createVoxelBox(3.0, 3.0, 3.0, 0xdcdcdc);
  chassis.position.set(0, 0, 0);

  const eye = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.7, 0.3), new THREE.MeshBasicMaterial({ color: 0xff1744 }));
  eye.position.set(0, 0.4, 1.55);

  const torchBase = createVoxelBox(0.3, 0.9, 0.3, 0x5a3d28);
  torchBase.position.set(0, 1.8, 0);
  const torchGlow = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), new THREE.MeshBasicMaterial({ color: 0xff0033 }));
  torchGlow.position.set(0, 2.4, 0);

  const leg1 = createVoxelBox(0.5, 1.5, 0.5, 0x424242);
  leg1.position.set(-0.9, -2.0, 0.7);
  const leg2 = createVoxelBox(0.5, 1.5, 0.5, 0x424242);
  leg2.position.set(0.9, -2.0, 0.7);
  const leg3 = createVoxelBox(0.5, 1.5, 0.5, 0x424242);
  leg3.position.set(0, -2.0, -0.9);

  group.add(chassis, eye, torchBase, torchGlow, leg1, leg2, leg3);
  return group;
}

function loadModel(type) {
  if (!scene) return;
  if (currentMeshGroup) scene.remove(currentMeshGroup);

  currentModelType = type;
  const statusPill = document.getElementById('model-status-pill');

  if (type === 'train') {
    currentMeshGroup = buildMinecraftTrain();
    if (statusPill) statusPill.textContent = 'Rendering: Steam Locomotive on Rails';
  } else if (type === 'steve') {
    currentMeshGroup = buildMinecraftSteve();
    if (statusPill) statusPill.textContent = 'Rendering: Steve Voxel Model with Diamond Pickaxe';
  } else if (type === 'sword') {
    currentMeshGroup = buildDiamondSword();
    if (statusPill) statusPill.textContent = 'Rendering: Diamond Sword on Obsidian Altar';
  } else if (type === 'redstone') {
    currentMeshGroup = buildRedstoneBot();
    if (statusPill) statusPill.textContent = 'Rendering: Redstone AI Core';
  }

  scene.add(currentMeshGroup);
}

function animate() {
  requestAnimationFrame(animate);

  if (currentMeshGroup && !isDragging) {
    currentMeshGroup.rotation.y += 0.008;
    currentMeshGroup.position.y = Math.sin(Date.now() * 0.002) * 0.15;
  }

  if (camera) {
    camera.position.z += (targetZoom - camera.position.z) * 0.1;
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

// Tab Switcher Handlers
document.querySelectorAll('.embed-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.embed-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const model = btn.getAttribute('data-model');
    loadModel(model);
  });
});

window.addEventListener('DOMContentLoaded', initThree);
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(initThree, 100);
}


