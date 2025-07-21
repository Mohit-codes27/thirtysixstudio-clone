import { useEffect, useState, useRef } from "react";
import "./index.css"
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from 'locomotive-scroll';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import 'locomotive-scroll/dist/locomotive-scroll.css';

function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const headingRef = useRef(null);
  const growingSpanRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true,
      multiplier: 1,
      class: 'is-revealed'
    });

    // Cleanup
    return () => {
      if (locomotiveScroll) locomotiveScroll.destroy();
    }
  }, [])

  useEffect(() => {
    const handleClick = (e) => {
         setShowCanvas((prevShowCanvas) => {
          if(!prevShowCanvas){
            // Position the circle at click position and make it initially small
            gsap.set(growingSpanRef.current, {
              top: e.clientY,
              left: e.clientX,
              scale: 0,
              opacity: 1,
              display: 'block'
             })
      
             // First grow the circle and change text color simultaneously
             gsap.to(growingSpanRef.current, {
              scale: 1000,
              duration: 1.2,
              ease: "power2.inOut",
              onComplete: () => {
                gsap.set(growingSpanRef.current, {
                  scale: 0,
                  opacity: 0,
                  clearProps: "all",
                });
              },
             })

             // Change background and text color together when circle grows
             gsap.to("body", {
              backgroundColor: "#fd2c2a",
              color: "#000",
              duration: 1.2,
              ease: "power2.inOut"
             });

           }else{
            // Revert colors on second click
            gsap.to("body", {
              backgroundColor: "#000",
              color: "#fff",
              duration: 1.2,
              ease: "power2.inOut",
            })
           }

           return !prevShowCanvas;
         });

        }
        const headingElement = headingRef.current;
        headingElement.addEventListener('click', handleClick);

        return () => {
         headingElement.removeEventListener('click', handleClick);
        }
  }, [])

  return (
    <div ref={containerRef} data-scroll-container>
      <span ref={growingSpanRef} className="growing rounded-full block fixed opacity-0 top-[-20px] left-[-20px] w-5 h-5 bg-[#fd2c2a]"></span>
      <div className="w-full relative min-h-screen font-[Helvetica_Now_Display]">

        {showCanvas && data[0].map((canvasDets, index) => {
          return <Canvas details={canvasDets} key={index} />
        })}
        <div className="w-full h-screen relative z-[1]">
          <nav className="w-full z-50">
            <div className="max-w-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <a href="/" className= "text-xl font-regular">
                    thirtysixstudios
                  </a>
                </div>
                <div className="hidden md:block">
                  <div className="flex items-baseline space-x-8">
                    {['Home', 'About', 'Projects', 'Contact'].map((link, index) => (
                      <a
                        key={index}
                        href={`#${link.toLowerCase()}`}
                        className="text-gray-300 hover px-3 py-2 rounded-md text-md font-medium transition-colors"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <div className="textContainer w-full px-[26%]">
            <div className="text w-[40%] ">
              <h3 className="text-4xl leading-[1.2]">At Thirtysixstudio, we build immersive digital experiences for brands with a purpose.</h3>
            </div>
            <p className="text-xl w-[50%] mt-10 font-light">
            We're a boutique production studio focused on design, motion, and creative technology, constantly reimagining what digital craft can do for present-time ads and campaigns.</p>
            <p className="text-xl mt-10 font-light">scroll</p>
          </div>
          <div className="overflow-x-hidden w-full">
            <div className="w-full absolute bottom-0 left-0">
              <h1 ref={headingRef} className="text-[17rem] font-normal tracking-tight leading-none pl-5">Thirtysixstudio</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full relative h-screen mt-32 px-10">
        {showCanvas && data[1].map((canvasDets, index) => {
          return <Canvas details={canvasDets} key={index} />
        })}
        <h1 className="text-8xl">About the brand</h1>
        <p className="text-4xl leading-[1.8] w-[80%] mt-10 font-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, deleniti? Aliquid doloremque iste aspernatur illo eaque similique dicta sunt incidunt nam officia! Nostrum aperiam reprehenderit dolorum, quia et libero expedita obcaecati? Aspernatur eveniet commodi provident, aliquam eius sequi similique asperiores optio placeat. Quam, fugit inventore, blanditiis minus dolore ipsam nostrum in repellat maxime illum sint itaque laudantium.</p>
        <img src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400" alt="" className="w-[80%] mt-10" />
        {showCanvas && data[2].map((canvasDets, index) => {
          return <Canvas details={canvasDets} key={index} />
        })}
        {showCanvas && data[3].map((canvasDets, index) => {
          return <Canvas details={canvasDets} key={index} />
        })}
      </div>
    </div>
  )
}

export default App;