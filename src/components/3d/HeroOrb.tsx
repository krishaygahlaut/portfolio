
"use client";
import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const count = 700;
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 2.4 + Math.random() * 0.8;
      a[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      a[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      a[i*3+2] = r * Math.cos(phi);
    }
    return a;
  }, []);
  useFrame(s => { if (ref.current) { ref.current.rotation.y = s.clock.elapsedTime * 0.09; ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.04) * 0.25; } });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.014} color="#4DFFD2" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

export default function HeroOrb() {
  const mesh = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();
  useFrame(s => {
    if (!mesh.current) return;
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, mouse.y * 0.35, 0.04);
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, mouse.x * 0.35 + s.clock.elapsedTime * 0.1, 0.04);
  });
  return (
    <>
      <Stars radius={60} depth={40} count={1500} factor={2} saturation={0} fade speed={0.4} />
      <ambientLight intensity={0.18} />
      <pointLight position={[4, 4, 4]}   intensity={2.5} color="#7B61FF" />
      <pointLight position={[-4,-2, 2]}  intensity={2}   color="#4DFFD2" />
      <pointLight position={[0, -4,-2]}  intensity={1.5} color="#FF6B35" />
      <Float speed={1.5} floatIntensity={0.5} rotationIntensity={0.25}>
        <mesh ref={mesh}>
          <Sphere args={[1.7, 128, 128]}>
            <MeshDistortMaterial color="#00040F" distort={0.48} speed={2.8}
              roughness={0} metalness={1} emissive="#4422FF" emissiveIntensity={0.28} />
          </Sphere>
        </mesh>
        <mesh><Sphere args={[2.0,32,32]}><meshBasicMaterial color="#4DFFD2" transparent opacity={0.025} side={THREE.BackSide}/></Sphere></mesh>
        <mesh><Sphere args={[2.45,32,32]}><meshBasicMaterial color="#7B61FF" transparent opacity={0.012} side={THREE.BackSide}/></Sphere></mesh>
      </Float>
      <Particles />
    </>
  );
}
