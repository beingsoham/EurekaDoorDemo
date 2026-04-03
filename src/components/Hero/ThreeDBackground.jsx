import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeDBackground() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesRef = useRef(null);
  const linesRef = useRef(null);

useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfaf8f3);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create floating particles
    const particleCount = 50;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 200;
      positions[i + 1] = (Math.random() - 0.5) * 200;
      positions[i + 2] = (Math.random() - 0.5) * 200;

      velocities[i] = (Math.random() - 0.5) * 0.5;
      velocities[i + 1] = (Math.random() - 0.5) * 0.5;
      velocities[i + 2] = (Math.random() - 0.5) * 0.5;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xc89b4f,
      size: 1.5,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.4,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Create connecting lines
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = [];
    const lineIndices = [];

    for (let i = 0; i < Math.min(particleCount, 20); i++) {
      for (let j = i + 1; j < Math.min(particleCount, 20); j++) {
        linePositions.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
        linePositions.push(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
        
        const index = (i * (Math.min(particleCount, 20) - 1) + (j - i - 1)) * 2;
        lineIndices.push(index, index + 1);
      }
    }

    lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
    lineGeometry.setIndex(new THREE.BufferAttribute(new Uint32Array(lineIndices), 1));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xc89b4f,
      transparent: true,
      opacity: 0.15,
      linewidth: 1,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);
    linesRef.current = lines;

    // Create geometric shapes
    const createGoldenShape = (x, y, z, scale = 1) => {
      const geometry = new THREE.IcosahedronGeometry(2 * scale, 3);
      const material = new THREE.MeshPhongMaterial({
        color: 0xc89b4f,
        emissive: 0xc89b4f,
        transparent: true,
        opacity: 0.08,
        wireframe: true,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      return mesh;
    };

    const shapes = [
      createGoldenShape(-60, 20, -30, 1.5),
      createGoldenShape(80, -30, -40, 1.2),
      createGoldenShape(-40, -60, -50, 1.3),
      createGoldenShape(50, 40, -45, 1.1),
    ];

    shapes.forEach(shape => scene.add(shape));

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xc89b4f, 0.8, 300);
    pointLight.position.set(100, 100, 50);
    scene.add(pointLight);

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Update particles
      const positionAttribute = particleGeometry.getAttribute('position');
      const velocityAttribute = particleGeometry.getAttribute('velocity');
      const posArray = positionAttribute.array;
      const velArray = velocityAttribute.array;

      for (let i = 0; i < particleCount * 3; i += 3) {
        posArray[i] += velArray[i];
        posArray[i + 1] += velArray[i + 1];
        posArray[i + 2] += velArray[i + 2];

        if (posArray[i] > 100 || posArray[i] < -100) velArray[i] *= -1;
        if (posArray[i + 1] > 100 || posArray[i + 1] < -100) velArray[i + 1] *= -1;
        if (posArray[i + 2] > 100 || posArray[i + 2] < -100) velArray[i + 2] *= -1;
      }
      positionAttribute.needsUpdate = true;

      // Rotate shapes
      shapes.forEach(shape => {
        shape.rotation.x += 0.0003;
        shape.rotation.y += 0.0005;
      });

      particles.rotation.z += 0.00005;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
