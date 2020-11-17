import './App.css';
import React, { useState, useRef } from 'react';
import { OrbitControls, Torus } from 'drei';
import { Canvas, useThree, extend, useFrame } from 'react-three-fiber';
import { a, useSpring } from 'react-spring/three';

function Cube(props) {
  const [isBig, setIsBig] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.02;
  });

  const { size, x } = useSpring({
    size: isBig ? [2, 2, 2] : [1, 1, 1],
    x: isBig ? 2 : 0,
  });

  const color = isHovered ? 'pink' : 'red';

  return (
    <a.mesh
      {...props}
      ref={ref}
      scale={size}
      position-x={x}
      castShadow={true}
      receiveShadow={true}
      onClick={() => setIsBig(!isBig)}
      onPointerOut={() => setIsHovered(false)}
      onPointerOver={() => setIsHovered(true)}
    >
      <sphereBufferGeometry attach="geometry" args={[1, 8, 6]} />
      <meshPhysicalMaterial
        roughness={1}
        metalness={0.5}
        clearcoat={1}
        attach="material"
        color={color}
        shineyness={100}
      />
    </a.mesh>
  );
}

function Plane() {
  return (
    <mesh
      receiveShadow={true}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -2, -5]}
    >
      <planeBufferGeometry attach="geometry" args={[20, 20]} />
      <meshPhongMaterial attach="material" color="#D3D3D3" />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight />
      <spotLight castShadow={true} intensity={0.6} position={[0, 10, 4]} />
      <Cube rotation={[10, 10, 0]} position={[0, 0, 0]} />
      <Cube rotation={[10, 20, 0]} position={[2, 2, 0]} />
      <Torus args={[1, 0.2, 10, 30]} position={[-2, 1, 0]}>
        <meshPhongMaterial
          roughness={1}
          metalness={0.5}
          shininess={100}
          attach="material"
          color={'gold '}
        />
      </Torus>
      <Plane />
      <OrbitControls />
    </>
  );
}

function App() {
  return (
    <Canvas shadowMap={true}>
      <Scene />
    </Canvas>
  );
}

export default App;
