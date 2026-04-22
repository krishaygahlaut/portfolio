"use client";
import { useEffect, useRef } from "react";
export default function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot  = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) return;
    const r = ring.current; const d = dot.current;
    if (!r || !d) return;
    let mx=0,my=0,rx=0,ry=0,raf=0;
    const onMove = (e: MouseEvent) => { mx=e.clientX; my=e.clientY; d.style.left=mx+"px"; d.style.top=my+"px"; };
    const loop = () => { rx+=(mx-rx)*0.11; ry+=(my-ry)*0.11; r.style.left=rx+"px"; r.style.top=ry+"px"; raf=requestAnimationFrame(loop); };
    document.addEventListener("mousemove",onMove);
    raf=requestAnimationFrame(loop);
    const addH=(e:Event)=>{if((e.target as Element)?.closest("a,button,[data-hover]"))r.classList.add("hov");};
    const remH=()=>r.classList.remove("hov");
    document.addEventListener("mouseover",addH);
    document.addEventListener("mouseout",remH);
    return ()=>{ document.removeEventListener("mousemove",onMove); document.removeEventListener("mouseover",addH); document.removeEventListener("mouseout",remH); cancelAnimationFrame(raf); };
  },[]);
  return (<><div id="cur-ring" ref={ring}/><div id="cur-dot" ref={dot}/></>);
}
