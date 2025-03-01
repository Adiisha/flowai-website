
import * as THREE from 'three';

interface ThreeSceneConfig {
  canvas: HTMLCanvasElement;
  color?: string;
  wireframe?: boolean;
  speed?: number;
}

export const createThreeScene = ({
  canvas,
  color = '#000000',
  wireframe = true,
  speed = 0.001
}: ThreeSceneConfig) => {
  // Create scene
  const scene = new THREE.Scene();
  
  // Create camera
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;
  
  // Create renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  // Add lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  
  // Create a geometry
  const geometry = new THREE.SphereGeometry(2, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    color: color,
    wireframe: wireframe,
    transparent: true,
    opacity: 0.8
  });
  
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  
  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);
    
    mesh.rotation.x += speed;
    mesh.rotation.y += speed * 1.5;
    
    renderer.render(scene, camera);
  };
  
  // Handle resize
  const handleResize = () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  };
  
  window.addEventListener('resize', handleResize);
  
  // Start animation
  animate();
  
  // Return cleanup function
  return () => {
    window.removeEventListener('resize', handleResize);
    scene.remove(mesh);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
};
