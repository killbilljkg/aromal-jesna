import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { motion } from 'framer-motion';
import './ThreeAnimation.css';

// Component for a single image plane in Three.js
const ImagePlane = ({ imageUrl, position, targetPosition, scrollProgress }) => {
  const meshRef = useRef();
  const texture = useLoader(TextureLoader, imageUrl);

  useFrame(() => {
    if (meshRef.current) {
      // Interpolate position based on scroll
      meshRef.current.position.x =
        position[0] + (targetPosition[0] - position[0]) * scrollProgress;
      meshRef.current.position.y =
        position[1] + (targetPosition[1] - position[1]) * scrollProgress;

      // Add rotation effect
      meshRef.current.rotation.y = (1 - scrollProgress) * 0.5;

      // Add floating animation
      meshRef.current.position.y += Math.sin(Date.now() * 0.001) * 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[2, 2.5]} />
      <meshStandardMaterial map={texture} transparent={true} />
    </mesh>
  );
};

// Particles effect
const Particles = () => {
  const particlesRef = useRef();
  const particleCount = 100;

  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
  }

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffd700" transparent opacity={0.6} />
    </points>
  );
};

const ThreeAnimation = ({ groomImage, brideImage, groomName, brideName }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate scroll progress for this section
        const start = rect.top + windowHeight * 0.5;
        const end = rect.bottom - windowHeight * 0.5;
        const total = end - start;
        const current = windowHeight * 0.5 - rect.top;

        let progress = Math.max(0, Math.min(1, current / total));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isJoined = scrollProgress > 0.7;

  return (
    <div ref={containerRef} className="three-animation-container">
      <div className="canvas-wrapper">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />

          <ImagePlane
            imageUrl={groomImage}
            position={[-5, 0, 0]}
            targetPosition={[-0.6, 0, 0]}
            scrollProgress={scrollProgress}
          />

          <ImagePlane
            imageUrl={brideImage}
            position={[5, 0, 0]}
            targetPosition={[0.6, 0, 0]}
            scrollProgress={scrollProgress}
          />

          <Particles />
        </Canvas>

        {/* Name labels */}
        <motion.div
          className="name-label left-label"
          initial={{ opacity: 0, x: -100 }}
          animate={{
            opacity: scrollProgress > 0.1 ? 1 : 0,
            x: scrollProgress > 0.1 ? 0 : -100
          }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="fancy-text">{groomName}</h3>
        </motion.div>

        <motion.div
          className="name-label right-label"
          initial={{ opacity: 0, x: 100 }}
          animate={{
            opacity: scrollProgress > 0.1 ? 1 : 0,
            x: scrollProgress > 0.1 ? 0 : 100
          }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="fancy-text">{brideName}</h3>
        </motion.div>

        {/* Heart frame effect when images meet */}
        <motion.div
          className="heart-frame"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: isJoined ? 1 : 0,
            scale: isJoined ? 1 : 0,
            rotate: isJoined ? 360 : 0
          }}
          transition={{ duration: 1, type: "spring" }}
        >
          <div className="frame-border">
            <div className="frame-corner top-left"></div>
            <div className="frame-corner top-right"></div>
            <div className="frame-corner bottom-left"></div>
            <div className="frame-corner bottom-right"></div>
            <div className="heart-icon">❤️</div>
          </div>
        </motion.div>

        {/* Together text */}
        <motion.div
          className="together-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: isJoined ? 1 : 0,
            y: isJoined ? 0 : 50
          }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="fancy-text">Together Forever</h2>
          <p>Two souls, one heart</p>
        </motion.div>

        {/* Sparkle effects */}
        {isJoined && (
          <div className="sparkles">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="sparkle"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: (Math.random() - 0.5) * 400,
                  y: (Math.random() - 0.5) * 400
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 0.5,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 2
                }}
                style={{
                  left: '50%',
                  top: '50%'
                }}
              >
                ✨
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreeAnimation;
