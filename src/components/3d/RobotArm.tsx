
"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Float } from "@react-three/drei";
import * as THREE from "three";
export default function RobotArm() {
  const g = useRef<THREE.Group>(null);
  useFrame(s => { if(g.current) g.current.rotation.y = Math.sin(s.clock.elapsedTime*0.5)*0.4; });
  return (
    <Float speed={2} floatIntensity={0.3}>
      <group ref={g} scale={0.68}>
        <ambientLight intensity={0.4}/><pointLight position={[2,2,2]} intensity={2} color="#00979D"/>
        <RoundedBox args={[2,0.3,1.2]} radius={0.06}><meshStandardMaterial color="#0d1117" metalness={0.9} roughness={0.1} emissive="#00979D" emissiveIntensity={0.05}/></RoundedBox>
        {([-0.8,0.8] as number[]).map(x=>([-0.5,0.5] as number[]).map(z=>(
          <mesh key={`${x}${z}`} position={[x,-0.2,z]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[0.22,0.22,0.12,16]}/><meshStandardMaterial color="#1a1a2e" metalness={0.7} roughness={0.3}/></mesh>
        )))}
        {([-.3,0,.3] as number[]).map((z,i)=><mesh key={i} position={[1.05,-0.05,z]}><boxGeometry args={[0.08,0.08,0.08]}/><meshStandardMaterial color="#00979D" emissive="#00979D" emissiveIntensity={0.8}/></mesh>)}
        <RoundedBox args={[0.7,0.05,0.5]} radius={0.02} position={[-0.1,0.18,0]}><meshStandardMaterial color="#00979D" metalness={0.3} roughness={0.6}/></RoundedBox>
      </group>
    </Float>
  );
}
