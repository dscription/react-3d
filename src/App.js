import './App.css';
import React, { useState, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Canvas, useThree, extend, useFrame } from 'react-three-fiber';
import { a, useSpring } from 'react-spring/three';

extend({ OrbitControls });

function Cube(props) {
  const [isBig, setIsBig] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef();

  useFrame(() => {
    // Use useRef in order to prevent a re-render and still get access to the mesh component.
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.02;
    // do not change state inside of useFrame(), it will cause a re-render at 60FPS which will crash your computer
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
      {/* <cylinderBufferGeometry attach="geometry" args={[1,1,3,12]} /> */}
      <sphereBufferGeometry attach="geometry" args={[1, 8, 6]} />
      {/* // A mesh needs a geometry, args= [width, height, depth] */}
      {/* <boxBufferGeometry attach="geometry" args={[1, 1, 1]} /> */}
      {/* // A mesh also needs a material */}
      {/* <meshStandardMaterial roughness={1} metalness={0.5} attach="material" color={color} /> */}
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
      <planeBufferGeometry attach="geometry" args={[20,20]} />
      <meshPhongMaterial attach="material" color="#D3D3D3" />
    </mesh>
  );
}

function Scene() {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  return (
    <>
      <ambientLight />
      <spotLight castShadow={true} intensity={0.6} position={[0,10,4]} />
      {/* <pointLight castShadow={true} intensity={0.6} position={[0,5,2]} /> */}
      <Cube rotation={[10, 10, 0]} position={[0, 0, 0]} />
      <Cube rotation={[10, 20, 0]} position={[2, 2, 0]} />
      <Plane />
      <orbitControls args={[camera, domElement]} />
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
