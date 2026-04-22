
"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
export default function NeuralNet() {
  const g = useRef<THREE.Group>(null);
  const lr = useRef<THREE.LineSegments>(null);
  const layers = [3,5,5,3];
  const nodes = useMemo(() => {
    const pts: [number,number,number][] = [];
    layers.forEach((c,li) => { for(let n=0;n<c;n++) pts.push([(li-1.5)*1.2,(n-(c-1)/2)*0.6,(Math.random()-0.5)*0.1]); });
    return pts;
  }, []);
  const lines = useMemo(() => {
    const v: number[] = []; let off=0;
    for(let l=0;l<layers.length-1;l++){for(let a=0;a<layers[l];a++){for(let b=0;b<layers[l+1];b++){v.push(...nodes[off+a],...nodes[off+layers[l]+b]);}}off+=layers[l];}
    return new Float32Array(v);
  }, [nodes]);
  useFrame(s => {
    if(g.current) g.current.rotation.y = Math.sin(s.clock.elapsedTime*0.4)*0.3;
    if(lr.current) (lr.current.material as THREE.LineBasicMaterial).opacity = 0.3+Math.sin(s.clock.elapsedTime*2)*0.1;
  });
  return (
    <group ref={g} scale={0.75}>
      <ambientLight intensity={0.5}/><pointLight position={[3,3,3]} intensity={2} color="#7B61FF"/>
      <lineSegments ref={lr}><bufferGeometry><bufferAttribute attach="attributes-position" count={lines.length/3} array={lines} itemSize={3}/></bufferGeometry><lineBasicMaterial color="#7B61FF" transparent opacity={0.35}/></lineSegments>
      {nodes.map((p,i)=><mesh key={i} position={p}><sphereGeometry args={[0.08,12,12]}/><meshStandardMaterial color="#4DFFD2" emissive="#4DFFD2" emissiveIntensity={0.6} metalness={0.5} roughness={0.2}/></mesh>)}
    </group>
  );
}
