import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import sunImage from '../textures/sun.jpg';

const ThreeScene = () => {
  const mountRef = useRef(null);

  const loader = new THREE.TextureLoader();
  const sunTexture = loader.load(sunImage);
  sunTexture.mapping = THREE.EquirectangularReflectionMapping;


  useEffect(() => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;


    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    const helper = new THREE.GridHelper(200,200)
    scene.add(helper);


    const directionalLight = new THREE.DirectionalLight('yellow', 5);
    directionalLight.position.set(1,0,0);
    scene.add(directionalLight);
    directionalLight.castShadow = true;

    const ambientLight = new THREE.AmbientLight('white', 0.5);
    scene.add(ambientLight);


    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI; 
    controls.minPolarAngle = 0;
    controls.rotateSpeed = 0.4;
    controls.zoomSpeed = 0.6;

    const sun_geometry = new THREE.SphereGeometry(1, 250, 250);
    const sun_material = new THREE.MeshStandardMaterial({
      map: sunTexture,
      bumpMap: sunTexture,
      roughnessMap: sunTexture,
      bumpScale: 2,
      color: '#FFA500',  
      side: 2,
      emissive: '#FFD700',    
      emissiveIntensity: 0.1,

    });
    const sun = new THREE.Mesh(sun_geometry, sun_material);
    scene.add(sun);
    sun.receiveShadow = true;

   


    camera.position.z = 3;


    let frameId;
    const animate = () => {
      sun.rotation.y += 0.001;
      controls.update();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
  requestAnimationFrame(animate);
   controls.update();
      // geometry.dispose();
      // material.dispose();
      renderer.dispose();
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    
  <div
  ref={mountRef}
  style={{
    width: '100vw',
    height: '100vh',
    background: '#000',
    overflow: 'hidden',
    cursor: 'grab',
    position: 'absolute',
  top: '0',
  left: '0',
  zIndex: '1',
  }}>   
  </div>
  );
};

export default ThreeScene;
