import * as THREE from "three";

export function scene(container) {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x111133); // optional: background color
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({ color: 0x00aaff });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.add(light);

  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();

  function onResize() {
    renderer.setSize(container.clientWidth, container.clientHeight);
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
  }

  window.addEventListener("resize", onResize);

  return () => {
    window.removeEventListener("resize", onResize);
    container.removeChild(renderer.domElement);
  };
}
