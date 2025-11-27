import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  Float,
  Stars,
  Sparkles,
} from "@react-three/drei";
import { motion } from "framer-motion";
void motion;
import * as THREE from "three";

const BuildingBlock = ({
  position,
  color,
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
}) => {
  return (
    <mesh
      position={position}
      scale={scale}
      rotation={rotation}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        roughness={0.1}
        metalness={0.8}
        envMapIntensity={1}
      />
    </mesh>
  );
};

const FloatingParticles = () => {
  const count = 100;
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Use deterministic pseudo-random generator to avoid impure calls during render
  const seeded = (i, salt = 9973) => {
    const x = Math.sin(i * 12.9898 + salt) * 43758.5453;
    return x - Math.floor(x);
  };

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const r1 = seeded(i, 1);
      const r2 = seeded(i, 2);
      const r3 = seeded(i, 3);
      const r4 = seeded(i, 4);
      const r5 = seeded(i, 5);
      const t = r1 * 100;
      const factor = 20 + r2 * 100;
      const speed = 0.01 + r3 / 200;
      const xFactor = -50 + r4 * 100;
      const yFactor = -50 + r5 * 100;
      const zFactor = -50 + seeded(i, 6) * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);

      dummy.position.set(
        (particle.mx / 10) * a +
        xFactor +
        Math.cos((t / 10) * factor) +
        (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b +
        yFactor +
        Math.sin((t / 10) * factor) +
        (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b +
        zFactor +
        Math.cos((t / 10) * factor) +
        (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <dodecahedronGeometry args={[0.2, 0]} />
      <meshPhongMaterial color="#f6ad55" />
    </instancedMesh>
  );
};

const Scene = () => {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t / 8) * 0.2;
    groupRef.current.position.y = Math.sin(t / 4) * 0.1;
  });

  return (
    <group ref={groupRef} scale={[0.6, 0.6, 0.6]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Main Structure */}
        <BuildingBlock
          position={[0, -2, 0]}
          scale={[4, 1, 4]}
          color="#1a365d"
        />
        <BuildingBlock
          position={[-1.5, 0, 1.5]}
          scale={[1, 6, 1]}
          color="#c05621"
        />
        <BuildingBlock
          position={[1.5, -0.5, -1.5]}
          scale={[1, 4, 1]}
          color="#2d3748"
        />
        <BuildingBlock
          position={[0, 1, 0]}
          scale={[2, 0.5, 2]}
          color="#f6ad55"
          rotation={[0, Math.PI / 4, 0]}
        />

        {/* Floating Elements */}
        <BuildingBlock
          position={[-3, 2, -2]}
          scale={[0.5, 0.5, 0.5]}
          color="#c05621"
        />
        <BuildingBlock
          position={[3, -1, 2]}
          scale={[0.5, 0.5, 0.5]}
          color="#1a365d"
        />
      </Float>
      <Sparkles
        count={50}
        scale={10}
        size={4}
        speed={0.4}
        opacity={0.5}
        color="#f6ad55"
      />
      <FloatingParticles />
      <Environment preset="city" />
    </group>
  );
};

const Hero3D = () => {
  return (
    <div className="relative min-h-[100dvh] w-full bg-gradient-to-r from-white via-orange-50 to-gray-100 overflow-hidden pt-20 md:pt-0">
      <div className="flex flex-col md:flex-row h-full">
        {/* Left: Text content */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-8 order-2 md:order-1">
          <div className="max-w-3xl w-full pointer-events-auto text-center md:text-left mt-8 md:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-4"
            >
              <span className="inline-block py-1 px-3 rounded-full bg-secondary/10 text-secondary border border-secondary/20 text-xs md:text-sm font-semibold tracking-wider mb-4 backdrop-blur-sm">
                PREMIUM CONSTRUCTION SERVICES
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight leading-tight"
            >
              Constructing <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-secondary to-orange-500">
                Excellence
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 max-w-xl font-light mx-auto md:mx-0"
            >
              We blend architectural innovation with structural integrity to
              create spaces that inspire and endure.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <a
                href="/floorplan"
                className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-full shadow hover:shadow-lg transition-transform hover:-translate-y-1"
              > generate FloorPlan </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-800 font-semibold rounded-full hover:bg-gray-100 transition"
              >
                Contact Us
              </a>
            </motion.div>
          </div>
        </div>

        {/* Right: 3D canvas */}
        <div className="w-full md:w-1/2 h-[40vh] md:h-screen relative order-1 md:order-2">
          <Canvas
            shadows
            dpr={[1, 2]}
            style={{ height: "100%", width: "100%" }}
          >
            <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={45} />
            <ambientLight intensity={0.8} color={0xffffff} />
            <directionalLight intensity={0.6} position={[5, 10, 5]} />
            <pointLight
              position={[-5, -5, -5]}
              intensity={0.3}
              color="#c05621"
            />
            <Stars
              radius={60}
              depth={20}
              count={400}
              factor={2}
              saturation={0}
              fade
              speed={0.5}
            />
            <Scene />
            <Environment preset="sunset" />
            <OrbitControls
              enableZoom={false}
              autoRotate
              autoRotateSpeed={0.6}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 3}
            />
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default Hero3D;
