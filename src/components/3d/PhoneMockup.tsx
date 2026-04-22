
"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Float } from "@react-three/drei";
import * as THREE from "three";
export default function PhoneMockup({ color="#1a1a2e", accentColor="#4DFFD2" }: { color?:string; accentColor?:string }) {
  const g = useRef<THREE.Group>(null);
  useFrame(s => { if(g.current) g.current.rotation.y = Math.sin(s.clock.elapsedTime*0.5)*0.35; });
  return (
    <Float speed={3} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={g} scale={0.72}>
        <RoundedBox args={[1.2,2.4,0.12]} radius={0.12} smoothness={4}><meshStandardMaterial color={color} metalness={0.8} roughness={0.1}/></RoundedBox>
        <RoundedBox args={[1.0,2.0,0.01]} radius={0.08} smoothness={4} position={[0,0,0.07]}><meshStandardMaterial color="#040510" emissive={accentColor} emissiveIntensity={0.07}/></RoundedBox>
        <RoundedBox args={[0.88,1.8,0.005]} radius={0.06} smoothness={4} position={[0,0.05,0.076]}><meshStandardMaterial color={accentColor} transparent opacity={0.055} emissive={accentColor} emissiveIntensity={0.35}/></RoundedBox>
        <mesh position={[0,1.05,0.065]}><cylinderGeometry args={[0.055,0.055,0.02,16]}/><meshStandardMaterial color="#111"/></mesh>
        <RoundedBox args={[0.28,0.024,0.005]} radius={0.01} position={[0,-0.94,0.075]}><meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.5}/></RoundedBox>
      </group>
    </Float>
  );
}
