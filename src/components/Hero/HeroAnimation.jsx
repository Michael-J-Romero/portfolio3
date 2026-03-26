import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion } from "motion/react";
import styled, { keyframes } from "styled-components";

const logoRotation = -40;
const s1 = 120;
const ratio = 6;
const ti = (s1 / 1.25) * ratio;
const sceneRotationDurationSeconds = 90;

// Move keyframes outside component for reuse
const rotate2 = keyframes`
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
`;

const rotateScene = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const counterRotateScene = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
`;

// Styled components defined once outside component
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  flex-shrink: 0;
`;

const ScrollSceneLayer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: center;
  will-change: transform;
`;

const SceneLayer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${rotateScene} ${props => props.$durationSeconds}s linear infinite;
  transform-origin: center;
  will-change: transform;
`;

const BallImageScrollCounter = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: center;
  will-change: transform;
`;

const CenterImageScrollCounter = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: center;
  will-change: transform;
`;

const BallImage = styled.img`
  user-select: none;
  pointer-events: none;
  animation: ${counterRotateScene} ${props => props.$durationSeconds}s linear infinite;
  transform-origin: center;
  will-change: transform;
`;

const StyledReact = styled.img`
  animation: ${rotate2} 75s linear infinite;
  z-index: 10;
  width: ${props => props.$size / 5.5}px;
  height: ${props => props.$size / 5.5}px;
  margin: auto;
  will-change: transform;
`;

const StyledRing = styled.div`
  z-index: 10;
  opacity: 0.6;
  box-sizing: border-box;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  border-radius: 50%;
  position: absolute;
  border-style: double;
  border-left-width: 0px;
  border-bottom-width: ${props => props.$size / 25}px;
  border-top-width: ${props => props.$size / 22}px;
  border-right-width: ${props => props.$plainCircles ? 0 : props.$size / 18}px;
  border-color: ${props => props.$color};
  box-shadow: inset 4px 2px 1px 2px ${props => props.$color};
  border-bottom-color: transparent;
  transition: transform ${s1 * ratio}ms linear;
  will-change: transform;
  
  &:hover {
    cursor: pointer;
  }
`;

const StyledBall = styled.div`
  z-index: 10;
  opacity: 0.9;
  position: absolute;
  border-radius: 50%;
  display: flex;
  transition: transform ${s1 * ratio}ms linear, scale 180ms ease;
  will-change: transform;
  
  &:hover {
    cursor: pointer;
    scale: 1.05;
  }
`;

// Memoized ring component
const AnimatedRing = React.memo(({ c, i, ss, color, size, plainCircles }) => {
  const si = Math.sin((c / 400) * 10 + (ss * Math.PI) / 6) * 5 + 5;
  const transform = `translate3d(0,0,0) rotateY(90deg) rotateX(${120 * i + 90}deg) rotateY(${si + 20}deg) rotateZ(${(c / 2) * ratio}deg)`;
  
  return <StyledRing $color={color} $size={size} $plainCircles={plainCircles} style={{ transform }} />;
});

AnimatedRing.displayName = 'AnimatedRing';

// Memoized ball component
const AnimatedBall = React.memo(({ plainCircles, image, w, c, i, ss, color, size, counterScrollRotation, sceneRotationDuration }) => {
  const si = Math.sin((c / 400) * 10 + (ss * Math.PI) / 6) * 5.5 + 5;
  const nn = 0.5 + (Math.sin(c / 20 + 1.9 * i) + 1) * 0.4;
  const s = nn * 50 - 25;
  
  const transform = `translate3d(0,0,0) rotateY(90deg) rotateX(${120 * i + 90}deg) rotateY(${si + 20}deg) rotateZ(${(c / 2) * ratio}deg) rotateZ(${logoRotation}deg) translateY(${size / 2 - 7}px) rotateZ(${-logoRotation}deg) rotateZ(-${(c / 2) * ratio}deg) rotateY(-${si + 20}deg) rotateX(-${120 * i + 90}deg) rotateY(-90deg)`;
  
  return (
    <StyledBall style={plainCircles ? {} : { transform }}>
      {plainCircles ? (
        <div
          style={{
            transition: "all 1000ms",
            opacity: s / 50,
            width: s + "px",
            height: s + "px",
            borderRadius: "50%",
            backgroundColor: color,
            border: "2px solid " + color,
          }}
        />
      ) : (
        <BallImageScrollCounter style={counterScrollRotation ? { rotate: counterScrollRotation } : undefined}>
          <BallImage src={image} width={w} alt="" draggable="false" $durationSeconds={sceneRotationDuration} />
        </BallImageScrollCounter>
      )}
    </StyledBall>
  );
});

AnimatedBall.displayName = 'AnimatedBall';

export default function HeroAnimation({
  size = 300,
  speed = 1,
  orbitSpeed = speed,
  spinSpeed = speed,
  plainCircles = false,
  scrollRotation,
  counterScrollRotation,
  reactLogoAlt = "React logo",
}) {
  const [c, setC] = useState(10000);
  const orbitSpeedRef = useRef(orbitSpeed);
  const rafRef = useRef();
  const lastUpdateRef = useRef(Date.now());
  const effectiveSceneRotationDuration = sceneRotationDurationSeconds / Math.max(spinSpeed, 0.1);
  
  // Keep orbital motion independent from full-scene spin.
  useEffect(() => {
    orbitSpeedRef.current = orbitSpeed;
  }, [orbitSpeed]);

  // Animation loop with proper cleanup
  useEffect(() => {
    let isRunning = true;
    
    const animate = () => {
      if (!isRunning) return;
      
      const now = Date.now();
      const elapsed = now - lastUpdateRef.current;
      
      if (elapsed >= ti) {
        setC(prevC => prevC + 6 * orbitSpeedRef.current);
        lastUpdateRef.current = now;
      }
      
      rafRef.current = requestAnimationFrame(animate);
    };
    
    rafRef.current = requestAnimationFrame(animate);
    
    return () => {
      isRunning = false;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Memoize static values
  const colors = useMemo(() => ["#c86c36", "#56a3da", "#c9b652"], []);
  const reactImg = "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png";
  const ff = 1;

  return (
    <Container $size={size} className="animatedReact">
      <ScrollSceneLayer style={scrollRotation ? { rotate: scrollRotation } : undefined}>
        <SceneLayer $durationSeconds={effectiveSceneRotationDuration}>
          <AnimatedRing color="#c86c36" c={c + ff} i={1} ss={3} size={size} plainCircles={plainCircles} />
          <AnimatedRing color="#56a3da" c={c} i={2} ss={3} size={size} plainCircles={plainCircles} />
          <AnimatedRing color="#c9b652" c={c + ff / 2} i={3} ss={3} size={size} plainCircles={plainCircles} />

          <AnimatedBall
            plainCircles={plainCircles}
            color={colors[0]}
            w={size / 7}
            image="/animationImgs/HTML.png"
            c={c + ff}
            i={1}
            ss={3}
            size={size}
            counterScrollRotation={counterScrollRotation}
            sceneRotationDuration={effectiveSceneRotationDuration}
          />

          <AnimatedBall
            plainCircles={plainCircles}
            color={colors[1]}
            w={size / 6}
            image="/animationImgs/css.png"
            c={c}
            i={2}
            ss={3}
            size={size}
            counterScrollRotation={counterScrollRotation}
            sceneRotationDuration={effectiveSceneRotationDuration}
          />

          <AnimatedBall
            plainCircles={plainCircles}
            color={colors[2]}
            w={size / 7}
            image="/animationImgs/JavaScript.png"
            c={c + ff / 2}
            i={3}
            ss={3}
            size={size}
            counterScrollRotation={counterScrollRotation}
            sceneRotationDuration={effectiveSceneRotationDuration}
          />

          {!plainCircles && (
            <CenterImageScrollCounter style={counterScrollRotation ? { rotate: counterScrollRotation } : undefined}>
              <StyledReact $size={size} src={reactImg} alt={reactLogoAlt} draggable="false" />
            </CenterImageScrollCounter>
          )}
        </SceneLayer>
      </ScrollSceneLayer>
    </Container>
  );
}
