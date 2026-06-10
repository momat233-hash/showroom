document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('three-container');
  if (!container) return;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x060b18);

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 4, 12);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0x404060, 0.5);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0x28c4ff, 1.5);
  dirLight.position.set(5, 10, 7);
  scene.add(dirLight);

  const dirLight2 = new THREE.DirectionalLight(0xffd25c, 0.5);
  dirLight2.position.set(-5, -2, 3);
  scene.add(dirLight2);

  const pointLight = new THREE.PointLight(0x28c4ff, 1, 20);
  pointLight.position.set(0, 3, 0);
  scene.add(pointLight);

  const createFaucet = function () {
    const group = new THREE.Group();

    const baseMat = new THREE.MeshStandardMaterial({
      color: 0xc0c0c0,
      metalness: 0.85,
      roughness: 0.15,
    });

    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x2a2a3a,
      metalness: 0.9,
      roughness: 0.1,
    });

    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x28c4ff,
      metalness: 0.5,
      roughness: 0.3,
      emissive: 0x28c4ff,
      emissiveIntensity: 0.05,
    });

    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.9, 0.25, 32), baseMat);
    base.position.y = 0.125;
    group.add(base);

    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.2, 1.8, 16), baseMat);
    stem.position.set(0.3, 1.025, 0);
    group.add(stem);

    const arm = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.15, 16, 32, Math.PI / 2), baseMat);
    arm.rotation.x = Math.PI / 2;
    arm.position.set(0.3, 1.8, 0.7);
    group.add(arm);

    const spout = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 0.4, 16), baseMat);
    spout.position.set(0.3, 0.3, 1.3);
    spout.rotation.x = 0.2;
    group.add(spout);

    const handleBase = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 0.1, 24), darkMat);
    handleBase.position.set(-0.5, 0.95, 0);
    group.add(handleBase);

    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.7, 12), darkMat);
    handle.position.set(-0.85, 1.1, 0);
    handle.rotation.z = -0.5;
    group.add(handle);

    const accentRing = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.03, 16, 24), accentMat);
    accentRing.position.set(0.3, 1.9, 0.7);
    accentRing.rotation.x = Math.PI / 2;
    group.add(accentRing);

    return group;
  };

  const createPipe = function (x, z, height) {
    const group = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({
      color: 0xb8a88a,
      metalness: 0.7,
      roughness: 0.4,
    });

    const vert = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, height, 12), mat);
    vert.position.y = height / 2;
    group.add(vert);

    const joint = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 12), mat);
    joint.position.y = height;
    group.add(joint);

    const horiz = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.6, 12), mat);
    horiz.rotation.z = Math.PI / 2;
    horiz.position.set(0.3, height, 0);
    group.add(horiz);

    return group;
  };

  const faucet1 = createFaucet();
  faucet1.position.set(-1.5, 0, -1);
  scene.add(faucet1);

  const faucet2 = createFaucet();
  faucet2.position.set(1.5, 0, -1);
  faucet2.rotation.y = 0.3;
  scene.add(faucet2);

  const faucet3 = createFaucet();
  faucet3.position.set(0, 0, 1.5);
  faucet3.rotation.y = -0.2;
  scene.add(faucet3);

  const pipePositions = [
    [-2.5, 0.5, -2],
    [2.5, 0.8, -2],
    [-2, 0.3, 2],
    [2, 0.6, 2],
  ];

  pipePositions.forEach(function (pos) {
    const pipe = createPipe(pos[0], pos[2], pos[1]);
    pipe.position.set(pos[0], 0, pos[2]);
    scene.add(pipe);
  });

  const particlesGeo = new THREE.BufferGeometry();
  const particlesCount = 500;
  const posArray = new Float32Array(particlesCount * 3);
  for (var i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 30;
  }
  particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particlesMat = new THREE.PointsMaterial({
    size: 0.03,
    color: 0x28c4ff,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
  });
  const particles = new THREE.Points(particlesGeo, particlesMat);
  particles.position.y = 2;
  scene.add(particles);

  var clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    var elapsed = clock.getElapsedTime();

    faucet1.rotation.y = Math.sin(elapsed * 0.2) * 0.1;
    faucet2.rotation.y = 0.3 + Math.sin(elapsed * 0.15 + 1) * 0.1;
    faucet3.rotation.y = -0.2 + Math.sin(elapsed * 0.25 + 2) * 0.1;

    particles.rotation.y = elapsed * 0.01;

    pointLight.position.x = Math.sin(elapsed * 0.3) * 3;
    pointLight.position.z = Math.cos(elapsed * 0.3) * 3;

    camera.position.x = Math.sin(elapsed * 0.05) * 2;
    camera.lookAt(0, 1, 0);

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
