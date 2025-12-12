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

      // Add rotation effect - when joined, tilt toward each other
      const baseRotation = (1 - scrollProgress) * 0.5;
      const tiltDirection = position[0] < 0 ? 1 : -1; // Left tilts right, right tilts left
      const tiltAmount = scrollProgress > 0.7 ? (scrollProgress - 0.7) * 0.3 * tiltDirection : 0;
      meshRef.current.rotation.y = baseRotation + tiltAmount;

      // Add floating animation
      meshRef.current.position.y += Math.sin(Date.now() * 0.001) * 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[2, 2.5]} />
      <meshBasicMaterial map={texture} transparent={true} />
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
          <ambientLight intensity={1.5} />
          <directionalLight position={[0, 0, 5]} intensity={2} />

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

        {/* Unity effect when images meet */}
        {isJoined && (
          <>
            {/* Light beam connecting the images */}
            <motion.div
              className="unity-light-beam"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 0.6, scaleX: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />

            {/* Joining rings animation */}
            <motion.div
              className="unity-rings-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.div
                className="unity-ring unity-ring-left"
                initial={{ x: -100, y: 100, rotate: -45 }}
                animate={{ x: -15, y: 0, rotate: 0 }}
                transition={{ delay: 0.6, duration: 1, type: "spring" }}
              >
                💍
              </motion.div>
              <motion.div
                className="unity-ring unity-ring-right"
                initial={{ x: 100, y: 100, rotate: 45 }}
                animate={{ x: 15, y: 0, rotate: 0 }}
                transition={{ delay: 0.6, duration: 1, type: "spring" }}
              >
                💍
              </motion.div>

              {/* Interlocking circles symbol */}
              <motion.svg
                className="unity-circles"
                width="100"
                height="60"
                viewBox="0 0 100 60"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.8, type: "spring" }}
              >
                <circle
                  cx="35"
                  cy="30"
                  r="20"
                  fill="none"
                  stroke="var(--primary-color)"
                  strokeWidth="3"
                  opacity="0.7"
                />
                <circle
                  cx="65"
                  cy="30"
                  r="20"
                  fill="none"
                  stroke="var(--secondary-color)"
                  strokeWidth="3"
                  opacity="0.7"
                />
              </motion.svg>
            </motion.div>

            {/* Aura effect around images */}
            <motion.div
              className="unity-aura unity-aura-left"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.4, scale: 1.2 }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.div
              className="unity-aura unity-aura-right"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.4, scale: 1.2 }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: 0.75 }}
            />
          </>
        )}

        {/* Together text */}
        <motion.div
          className="together-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: isJoined ? 1 : 0,
            y: isJoined ? 0 : 50
          }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <h2 className="fancy-text">Together as One</h2>
          <p>Two souls united in eternal love</p>
          <p className="together-subtitle">A bond that transcends time</p>
        </motion.div>

        {/* Sparkle effects emanating from center */}
        {isJoined && (
          <div className="sparkles">
            {[...Array(20)].map((_, i) => {
              const angle = (Math.PI * 2 * i) / 20;
              const distance = 150 + Math.random() * 100;
              const xPos = Math.cos(angle) * distance;
              const yPos = Math.sin(angle) * distance;

              return (
                <motion.div
                  key={i}
                  className="sparkle"
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    scale: [0, 1.5, 0],
                    x: xPos,
                    y: yPos
                  }}
                  transition={{
                    duration: 2.5,
                    delay: 1.5 + (i * 0.05),
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                  style={{
                    left: '50%',
                    top: '50%'
                  }}
                >
                  ✨
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreeAnimation;
