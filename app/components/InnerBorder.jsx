import React, { useEffect, useRef } from 'react';
import ScrambleText from './ScrambleText.jsx';
import '../styles/InnerBorder.css';

function InnerBorder({ width, height, activeItem }) {
    const containerRef = useRef(null);
    const layer1Ref = useRef(null);
    const layer2Ref = useRef(null);
    const layer3Ref = useRef(null);
    const layer4Ref = useRef(null);
    const layer5Ref = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const halfW = window.innerWidth / 2;
            const halfH = window.innerHeight / 2;
            const x = e.clientX;
            const y = e.clientY;

            // Calculate rotation based on mouse position
            const rotX = (y - halfH) / halfH * 15; // Max 15 degrees
            const rotY = (x - halfW) / halfW * -15; // Max 15 degrees

            // Apply different depths to different layers
            if (layer1Ref.current) {
                layer1Ref.current.style.transform = `rotateX(${rotX * 0.1}deg) rotateY(${rotY * 0.1}deg) translateZ(0px)`;
            }
            if (layer2Ref.current) {
                layer2Ref.current.style.transform = `rotateX(${rotX * 0.3}deg) rotateY(${rotY * 0.3}deg) translateZ(20px)`;
            }
            if (layer3Ref.current) {
                layer3Ref.current.style.transform = `rotateX(${rotX * 0.5}deg) rotateY(${rotY * 0.5}deg) translateZ(40px)`;
            }
            if (layer4Ref.current) {
                layer4Ref.current.style.transform = `rotateX(${rotX * 0.7}deg) rotateY(${rotY * 0.7}deg) translateZ(60px)`;
            }
            if (layer5Ref.current) {
                layer5Ref.current.style.transform = `rotateX(${rotX * 1}deg) rotateY(${rotY * 1}deg) translateZ(80px)`;
            }
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="inner-border-3d-container" ref={containerRef}>
            {/* Layer 1 - Background SVG */}
            <div className="layer-1" ref={layer1Ref}>
                <svg
                    width="100vw"
                    height="100vh"
                    viewBox={`0 0 ${width} ${height}`}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        overflow: 'hidden'
                    }}
                >
                    <defs>
                        <linearGradient id="pathGradientMask" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(51, 51, 51, 0)" />
                            <stop offset="5%" stopColor="rgba(51, 51, 51, 0)" />
                            <stop offset="100%" stopColor="rgba(51, 51, 51, 1)" />
                        </linearGradient>
                    </defs>
                    <g transform={`translate(${width / 2}, ${height / 2})`}>
                        <path
                            fill={activeItem?.color || '#000000'}
                            d="M722.016 1084h-722l288-400h63l-32 340.5h84l-32-340.5h63.5zM351 684h-63V0h63zm83 0h-63V0h63z"
                            transform="translate(-361, -542)"
                        ></path>
                    </g>
                    <g>
                        {/* Background Lines - aligned at bottom */}
                        <g transform={`translate(${(width / 2) - 250}, ${height})`}>
                            <path
                                stroke="url(#pathGradientMask)"
                                // strokeDasharray="1 5"
                                d="M500.984 0-22415 340M507.766 0-5188.29 340M514.543 0-2727.34 340M521.324 0-1735.48 340M528.104 0-1195.18 340M534.883 0-852.336 340M541.664 0-613.357 340M548.441 0l-984.162 340M555.223 0l-852.53 340M562.002 0l-747.483 340M568.781 0-92.492 340M575.562 0-13.319 340M582.34 0 55.424 340M589.121 0 116.126 340M595.9 0 170.499 340M602.68 0 219.82 340M609.459 0 265.055 340M616.238 0 306.951 340M623.02 0 346.099 340M629.797 0 382.964 340M636.578 0l-218.64 340M643.357 0 451.331 340M650.137 0 483.411 340M656.918 0 514.404 340M663.695 0 544.502 340M670.477 0l-96.595 340M677.256 0l-74.564 340M684.035 0l-52.962 340M690.816 0l-31.659 340M697.594 0 687.06 340M704.375 0l10.534 340M711.154 0l31.66 340M717.934 0l52.962 340M724.715 0l74.564 340M731.492 0l96.595 340M738.273 0l119.194 340M745.053 0l142.513 340M751.832 0l166.726 340M758.613 0 950.64 340M765.391 0l218.64 340M772.172 0 1019 340M778.951 0l276.919 340M785.73 0l309.29 340M792.51 0l344.4 340M799.289 0l382.861 340M806.07 0l425.4 340M812.85 0l473 340M819.629 0l526.911 340M826.408 0l588.882 340M833.188 0l661.272 340M839.969 0l747.481 340M846.746 0l852.534 340M853.527 0l984.163 340M860.307 0 2015.33 340M867.086 0 2254.3 340M873.867 0 2597.15 340M880.645 0 3137.44 340M887.426 0 4129.31 340M894.205 0 6590.26 340M900.984 0 23817 340M500.984 0h400M500.984 0h400M500.984 0h400M500.984 0h400M500.984 0h400M500.984 0h400M500.984 0h400M500.984 0h400M500.984 0h400M500.984 0h400.001M500.984 0h400.001M500.984 0h400.003M500.98 0h400.007M500.977 0h400.014M500.969 0h400.03M500.955 0h400.059M500.93 0h400.112M500.883.002h400.205M500.805.004h400.36M500.676.004h400.616M500.473.008h401.023M500.156.012h401.659M499.672.02H902.3M498.945.031h404.082M497.875.047h406.22M496.324.07h409.319M494.115.102h413.74M491.004.148h419.963M486.676.213h428.615M480.734.3h440.502M472.656.42h456.655M461.793.582h478.382M447.32.797h507.33M428.207 1.08H973.76M403.184 1.451h595.602M370.676 1.934H1031.3M328.758 2.555h744.452M275.094 3.352h851.786M206.84 4.363h988.29M120.582 5.645H1281.39M12.223 7.252H1389.75M-123.129 9.262H1525.1M-291.281 11.754H1693.25M-499.109 14.84H1901.08M-754.713 18.629H2156.68M-1067.6 23.273h3537.17M-1448.89 28.93h4299.75M-1911.54 35.795h5225.05M-2470.62 44.09H3872.6M-3143.57 54.074h7689.11M-3950.52 66.047h9303.01M-4914.64 80.352H6316.61M-6062.53 97.383H7464.5M-7424.66 117.592H8826.63M-9035.8 141.496h19473.6M-10935.5 169.682h23273M-13168.9 202.818h27739.8M-15786.9 241.66h32975.8M-18847.2 287.066h39096.4M-22415 340h46232"
                                transform="translate(-450, -340)"
                            ></path>
                        </g>
                        {/* Filled path - fully centered */}
                        {/* Background perspective Lines */}
                    </g>
                </svg>
            </div>

            {/* Layer 2 - Text */}
            <div className="layer-2" ref={layer2Ref}>
                {activeItem && (
                    <div className='text'>
                        <ScrambleText as="div" duration={1.2}>{activeItem.title}</ScrambleText>
                        <ScrambleText as="div" duration={1.0}>{activeItem.title}</ScrambleText>
                        <ScrambleText as="div" duration={0.8}>{activeItem.title}</ScrambleText>
                        <ScrambleText as="div" duration={1.1}>{activeItem.title}</ScrambleText>
                        <ScrambleText as="div" className='text__normal' duration={1.3}>{activeItem.title}</ScrambleText>
                    </div>
                )}
            </div>

            {/* Layer 3 - Video */}
            <div className="layer-3" ref={layer3Ref}>
                {activeItem && activeItem.video && (
                    <div className='video-mask-container'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="724"
                            height="541"
                            fill="none"
                            viewBox="0 0 724 541"
                            className='video-mask-svg'
                        >
                            <defs>
                                <mask
                                    id="video-mask"
                                    width="724"
                                    height="541"
                                    x="0"
                                    y="0"
                                    fill="#fff"
                                    maskUnits="userSpaceOnUse"
                                >
                                    <path fill="#000" d="M0 0h724v541H0z"></path>
                                    <path fill="#fff" d="M723 64.892v474.832h-.135L651 533.436V58.593zm-85 467.407-92-8.05V267.724h92zm-105-9.187-362-31.671V365.724h362zm-375-32.808L1 476.568V197.724h157zM533 48.269v307.455H276V25.784zM263 354.724h-92v-157h92zM638 57.455v198.269h-92V49.406zM263 24.647v156.077H1V1.726z"></path>
                                </mask>
                            </defs>
                        </svg>
                        <video 
                            className='masked-video' 
                            src={activeItem.video}
                            autoPlay
                            loop
                            muted
                            preload="auto"
                            playsInline
                            style={{
                                imageRendering: 'high-quality'
                            }}
                        ></video>
                    </div>
                )}
            </div>

            {/* Layer 4 - Image */}
            <div className="layer-4" ref={layer4Ref}>
                {activeItem && activeItem.image && (
                    <img className='image' src={activeItem.image} alt="" />
                )}
            </div>

            {/* Layer 5 - Additional decorative elements if needed */}
            <div className="layer-5" ref={layer5Ref}>
                {/* Can add more decorative elements here */}
            </div>
        </div>
    );
}

export default InnerBorder;
