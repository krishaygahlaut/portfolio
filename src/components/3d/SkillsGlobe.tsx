
"use client";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Sphere } from "@react-three/drei";
import * as THREE from "three";

const SKILLS = [
  { label:"Swift",        color:"#FF6B35" }, { label:"Python",     color:"#4DFFD2" },
  { label:"Java",         color:"#FF9900" }, { label:"C/C++",      color:"#4DFFD2" },
  { label:"AI/ML",        color:"#FF00FF" }, { label:"iOS Dev",    color:"#FF6B35" },
  { label:"Deep Learning",color:"#7B61FF" }, { label:"AWS",        color:"#FF9900" },
  { label:"SwiftUI",      color:"#FF6B35" }, { label:"Minimax",    color:"#FF00FF" },
  { label:"MATLAB",       color:"#E16F24" }, { label:"Robotics",   color:"#00979D" },
  { label:"DSA",          color:"#FFD93D" }, { label:"React",      color:"#61DAFB" },
  { label:"Node.js",      color:"#61DAFB" }, { label:"Networking", color:"#00BCEB" },
  { label:"Git",          color:"#F05032" }, { label:"Img Proc",   color:"#E16F24" },
];

function SkillLabel({ skill, index, total }: { skill:typeof SKILLS[0]; index:number; total:number }) {
  const [hov, setHov] = useState(false);
  const phi = Math.acos(-1 + (2*index)/total);
  const theta = Math.sqrt(total * Math.PI) * phi;
  const r = 2.5;
  const pos: [number,number,number] = [r*Math.sin(phi)*Math.cos(theta), r*Math.sin(phi)*Math.sin(theta), r*Math.cos(phi)];
  return (
    <Text position={pos} fontSize={hov?0.19:0.13} color={hov?"#ffffff":skill.color}
      anchorX="center" anchorY="middle"
      onPointerEnter={()=>setHov(true)} onPointerLeave={()=>setHov(false)}
      font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD3emFsNlA.woff2">
      {skill.label}
    </Text>
  );
}

export default function SkillsGlobe() {
  const g = useRef<THREE.Group>(null);
  useFrame(s => {
    if (g.current) { g.current.rotation.y = s.clock.elapsedTime * 0.14; g.current.rotation.x = Math.sin(s.clock.elapsedTime*0.08)*0.12; }
  });
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5,5,5]} intensity={2.5} color="#7B61FF" />
      <pointLight position={[-5,-5,5]} intensity={2} color="#4DFFD2" />
      <group ref={g}>
        <Sphere args={[1.05,32,32]}><meshStandardMaterial color="#04050F" metalness={0.9} roughness={0.1} emissive="#7B61FF" emissiveIntensity={0.1}/></Sphere>
        <Sphere args={[1.12,16,16]}><meshBasicMaterial color="#4DFFD2" wireframe transparent opacity={0.07}/></Sphere>
        {SKILLS.map((s,i)=><SkillLabel key={s.label} skill={s} index={i} total={SKILLS.length}/>)}
      </group>
    </>
  );
}
