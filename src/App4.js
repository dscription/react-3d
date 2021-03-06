import * as THREE from 'three';
import React, { useState, useRef, useEffect, Suspense } from 'react';
import { OrbitControls } from 'drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas, useFrame, useLoader } from 'react-three-fiber';
import './App.css';

// https://sketchfab.com/3d-models/indoorflower-241421729f38400cad10e6905bbb0de5
function Plant() {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, '/scene.gltf');

  useFrame(() => {
    // ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });
  return <primitive ref={ref} object={gltf.scene} position={[0, 0, 0]} />;
}

function Scene() {
  return (
    <>
      <ambientLight />
      <pointLight intensity={0.6} position={[0, 10, 4]} />
      <Suspense fallback={null}>
        <Plant />
      </Suspense>
      <OrbitControls />
    </>
  );
}

function App() {
  return (
    <>
      <Canvas
        camera={{
          position: [0, 0, 15],
          near: 1,
          far: 40,
        }}
      >
        <Scene />
      </Canvas>
    </>
  );
}

export default App;
