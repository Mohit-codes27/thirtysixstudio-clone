import React, { useEffect, useRef, useState } from 'react'
import canvasImages from './canvasImages'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function Canvas({details}) {
  const {startIndex, numImages, duration, size, top, left, zIndex} = details;
  const [index, setIndex] = useState({value: startIndex});
  const canvasRef = useRef(null);

  useGSAP(()=>{
    gsap.fromTo(index, 
      { value: startIndex },
      {
        value: startIndex + numImages - 1,
        duration: duration,
        repeat: -1,
        ease: "none",
        onUpdate: () => {
          setIndex({value: Math.round(index.value)})
        }
      }
    );
    
    // Removed the opacity animation that was making the canvas disappear
  })

  useEffect(()=>{
    const scale = window.devicePixelRatio;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = canvasImages[index.value];
    
    img.onload = () => {
        canvas.width = canvas.offsetWidth * scale;
        canvas.height = canvas.offsetHeight * scale;
        canvas.style.width = canvas.offsetWidth + "px";
        canvas.style.height = canvas.offsetHeight + "px";
        ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
        ctx.scale(scale, scale);
    };
  }, [index])

  return (
    <canvas ref={canvasRef} data-scroll data-scroll-speed={Math.random().toFixed(1)} className='absolute' style={{width: `${size*2}px`, height: `${size*2}px`, top: `${top}%`, left: `${left}%`, zIndex: `${zIndex}`}}></canvas>
  )
}

export default Canvas
