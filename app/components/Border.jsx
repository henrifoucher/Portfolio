import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './../styles/Border.css';
import InnerBorder from './InnerBorder.jsx';
import ScrambleText from './ScrambleText.jsx';

function Border({ activeItem, children }) {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleBackToOrigin = () => {
    navigate('/Portfolio/');
  };

  const handleOverlayClick = () => {
    if (activeItem && activeItem.link) {
      window.open(activeItem.link, '_blank');
    }
  };

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div>
      <InnerBorder width={width} height={height} activeItem={activeItem} onClick={activeItem?.link} />
      <svg
        width="100vw"
        height="100vh"
        viewBox={`0 0 ${width} ${height}`}
        style={{ position: 'fixed', top: 0, left: 0, overflow: 'hidden' }}
      >
        <g>
          <polygon
            points={`${width},${height - 272} ${width - 232},${height - 272} ${width - 252},${height - 244} ${width - 448},${height - 244} ${width - 460},${height - 232} ${width - 460},${height - 76} ${width - 480},${height - 56} ${width / 2},${height - 56} ${width / 2},${height} ${width},${height}`}
            fill="#fff"
            stroke='#000'
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            filter="url(#dropShadow)"
          />
          <path
            d={`M${width - 243},${height - 256}
             L${(width - 224)},${height - 236}
             L${(width)},${height - 236}`}
            fill="none"
            stroke="#000"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Purple path: Orange rectangle minus Green border shape */}
          <path
            d={`M0,0 
             L${width},0
             L${width},${height}
             L0,${height}
             Z`}
            fill="#000"
            mask="url(#subtractGreenMask)"
            filter="url(#dropShadow)"
          />
        </g>
        <defs>
          {/* Optimized drop shadow filter */}
          <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="8" floodOpacity="0.15"/>
          </filter>

          {/* Mask for subtracting green path from orange rectangle */}
          <mask id="subtractGreenMask">
            {/* White rectangle (visible area) */}
            <rect x="0" y="0" width={width} height={height} fill="white" />
            {/* Black green shape (invisible/subtracted area) */}
            <path d={`M32,32 
                   L32,80 
                   L56,108 
                   L56,${height - 152} 
                   L152,${height - 56} 
                   L432,${height - 56} 
                   L460,${height - 32} 
                   L${(width / 2) - 220},${height - 32} 
                   L${(width / 2) - 180},${height - 72} 
                   L${(width / 2) + 180},${height - 72} 
                   L${(width / 2) + 220},${height - 32} 
                   L${width - 60},${height - 32} 
                   L${width - 32},${height - 56} 
                   L${width - 32},80 
                   L${width - 232},80 
                   L${width - 252},32 
                   L${(width / 2) + 160},32 
                   L${(width / 2) + 136},56 
                   L${(width / 2) - 136},56 
                   L${(width / 2) - 160},32 
                   Z`} fill="black"
              strokeLinejoin="round"
              strokeLinecap="round" />
          </mask>

          <clipPath id="clip0_201_672">
            <path fill="#fff" d={`M0 0 ${width} ${height}H0z`}></path>
          </clipPath>

          {/* Clip path for green border shape */}
          <clipPath id="greenBorderClip">
            <path d={`M32,32 
                   L32,80 
                   L56,108 
                   L56,${height - 152} 
                   L152,${height - 56} 
                   L432,${height - 56} 
                   L460,${height - 32} 
                   L${(width / 2) - 220},${height - 32} 
                   L${(width / 2) - 180},${height - 72} 
                   L${(width / 2) + 180},${height - 72} 
                   L${(width / 2) + 220},${height - 32} 
                   L${width - 60},${height - 32} 
                   L${width - 32},${height - 56} 
                   L${width - 32},80 
                   L${width - 232},80 
                   L${width - 252},32 
                   L${(width / 2) + 160},32 
                   L${(width / 2) + 136},56 
                   L${(width / 2) - 136},56 
                   L${(width / 2) - 160},32 
                   Z`}
              strokeLinejoin="round"
              strokeLinecap="round" />
          </clipPath>

          {/* Clip path for orange/yellow corner rectangle */}
          <clipPath id="orangeCornerClip">
            <path d={`M0,0 
                   L${width},0
                   L${width},${height}
                   L0,${height}
                   Z`}
              strokeLinejoin="round"
              strokeLinecap="round" />
          </clipPath>

          {/* Combined clip path using both green and orange shapes */}
          <clipPath id="combinedClip">
            <path d={`M32,32 
                   L32,80 
                   L56,108 
                   L56,${height - 152} 
                   L152,${height - 56} 
                   L432,${height - 56} 
                   L460,${height - 32} 
                   L${(width / 2) - 220},${height - 32} 
                   L${(width / 2) - 180},${height - 72} 
                   L${(width / 2) + 180},${height - 72} 
                   L${(width / 2) + 220},${height - 32} 
                   L${width - 60},${height - 32} 
                   L${width - 32},${height - 56} 
                   L${width - 32},80 
                   L${width - 232},80 
                   L${width - 252},32 
                   L${(width / 2) + 160},32 
                   L${(width / 2) + 136},56 
                   L${(width / 2) - 136},56 
                   L${(width / 2) - 160},32 
                   Z`}
              strokeLinejoin="round"
              strokeLinecap="round" />
            <rect x="0" y="0" width={width} height={height} />
          </clipPath>
        </defs>
        {/* Shape connecting L4a->L4b->L5b->L5a */}
        <polygon
          points={`${width / 2 - 92},8 ${width / 2 - 284 / 3},12 ${width / 2 + 284 / 3},12 ${width / 2 + 92},8`}
          fill={activeItem.color}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Shape connecting L10a->L10b->L11b->L11a */}
        <polygon
          points={`20,${height / 2 - 252} 16,${height / 2 - 246} 16,${height / 2 + 146} 20,${height / 2 + 152}`}
          fill={activeItem.color}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Shape connecting L14a->L14b->L15b->L16b->L16a->L15a */}
        <polygon
          points={`${width / 2 - 120},${height - 16} ${width / 2 - 114},${height - 12} ${width / 2 + 422},${height - 12} ${width / 2 + 446},${height - 32} ${width / 2 + 440},${height - 32} ${width / 2 + 420},${height - 16}`}
          fill={activeItem.color}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Red path connecting red points */}
        <path
          d={`M${(width / 2) - 140},${height - 80} 
             L${(width / 2) - 148},${height - 72}
             L${(width / 2) + 148},${height - 72}
             L${(width / 2) + 140},${height - 80}
             Z`}
          fill="#fff"
          stroke="#000"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Path connecting L1->L2->L3->L4->L5->L6->L7->L8 */}
        <path
          className="svg-top-line"
          d={`M112,0 
           L128,20 
           L${width / 2 - 100},20 
           L${width / 2 - 92},8 
           L${width / 2 + 92},8 
           L${width / 2 + 100},20 
           L${width - 128},20 
           L${width - 112},0`}
          fill="none"
          stroke="#fff"
          strokeWidth="1"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Path connecting L9->L10->L11->L12 */}
        <path
          className="svg-left-line"
          d={`M0,${height / 2 - 360} 
           L20,${height / 2 - 340} 
           L20,${height / 2 + 276} 
           L56,${height / 2 + 312}`}
          fill="none"
          stroke="#fff"
          strokeWidth="1"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Path connecting L13->L14->L15->L16 */}
        <path
          className="svg-bottom-line"
          d={`M${width / 2 - 376},${height} 
           L${width / 2 - 360},${height - 16} 
           L${width / 2 + 420},${height - 16} 
           L${width / 2 + 440},${height - 32}`}
          fill="none"
          stroke="#fff"
          strokeWidth="1"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Path connecting L17->L18 */}
        <path
          className="svg-right-vertical-line"
          d={`M${width - 24},${height - 40} 
           L${width - 24},${height - 8}`}
          fill="none"
          stroke="#fff"
          strokeWidth="1"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Path connecting L19->L20 */}
        <path
          className="svg-right-horizontal-line"
          d={`M${width - 40},${height - 24} 
           L${width - 8},${height - 24}`}
          fill="none"
          stroke="#fff"
          strokeWidth="1"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>

      <div className="text-overlay">
        <div>
          <ScrambleText as="h1" className="info__title" style={{ color: activeItem.color }}>
            Info Project
          </ScrambleText>
          <ScrambleText as="p" className="info__description">
            {activeItem.description}
          </ScrambleText>
        </div>
        <ScrambleText as="p" className='title'>Portfolio</ScrambleText>
        <ScrambleText 
          as="button" 
          className='status' 
          onClick={handleBackToOrigin}
          duration={0.6}
        >
          &lt;&lt;&lt;&lt;Projects&gt;&gt;&gt;&gt;
        </ScrambleText>
        <ScrambleText as="p" className='japanese'>한국에서 교환</ScrambleText>
        <div className='year'>
          <div className='year__number'>{activeItem.year}</div>
          <div className='year__2'></div>
          <div className='year__3'></div>
          <div className='year__4'></div>
          <div className='year__5'></div>
          <div className='year__6'></div>
        </div>
        <div className='lines'>
          <div className='line__1'></div>
          <div className='line__2'></div>
          <div className='line__3'></div>
          <div className='line__4'></div>
          <div className='line__5'></div>
          <div className='line__6'></div>
          <div className='line__7'></div>
        </div>
        <div className='pattern'></div>
        <div className='class'>
          <p className='class__name'>{activeItem.class}</p>
          <div className='class__detail'></div>
        </div>
        <p className='name'>Henri Foucher</p>
      </div>
      
      {/* Transparent clickable overlay */}
      <div 
        onClick={handleOverlayClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100vw',
          height: '75%',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          zIndex: 9999
        }}
      />
      
      {/* Mouse follower circular text */}
      {isHovering && (
        <div
          className="circular-text-follower"
          style={{
            position: 'fixed',
            left: mousePos.x - 75,
            top: mousePos.y - 75,
            width: '150px',
            height: '150px',
            pointerEvents: 'none',
            zIndex: 10000
          }}
        >
          <svg width="150" height="150" viewBox="0 0 150 150">
            <defs>
              <path
                id="circle-path"
                d="M 75, 75 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
              />
              <filter id="textDropShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.25"/>
              </filter>
            </defs>
            <text
              fontSize="13"
              fill={activeItem.color}
              fontFamily="var(--font-thedus-wide)"
              fontWeight="900"
              letterSpacing="1.5px"
              filter="url(#textDropShadow)"
            >
              <textPath href="#circle-path">
                SEE THE END RESULT • SEE THE END RESULT • 
              </textPath>
            </text>
          </svg>
        </div>
      )}
    </div >
  );
}

export default Border;