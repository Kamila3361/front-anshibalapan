"use client";

import Image from "next/image";
import FBXViewer from "./components/FBXViewer";
import Songs from "./components/songlist";
import {TextareaWithButton} from "./components/text";
import ThreeScene from "./components/GLBViewer";
import * as THREE from 'three';
import { useEffect, useRef } from "react";
import MusicBlock from "./components/musicBlock";
import GLBViewer from "./components/GLBViewer2";
import { Experience } from "./components/Experience";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// import { useState } from "react";

export default function Home() {
  // const animations = [
  //   "https://3dmodelskam.s3.eu-north-1.amazonaws.com/Standing+Greeting.fbx",
  //   "https://3dmodelskam.s3.eu-north-1.amazonaws.com/Pointing+Gesture.fbx",
  //   "https://3dmodelskam.s3.eu-north-1.amazonaws.com/Happy.fbx",
  //   "https://3dmodelskam.s3.eu-north-1.amazonaws.com/Singing.fbx"
  // ];

  // const animations = [
  //   "/model/Standing Greeting.fbx",
  //   "/model/Pointing Gesture.fbx",
  //   "/model/Happy.fbx",
  //   "/model/Singing.fbx"
  // ]

  // const width = window.innerWidth; // Specify the width in numbers
  // const height = window.innerHeight;

  // const mountRef = useRef<HTMLDivElement>(null);
  // const scene = new THREE.Scene();
  // const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  // const camera = new THREE.PerspectiveCamera(45, 2, 1, 1000);

  // useEffect(() => {
  //   // const width = 800; // Specify the width in numbers
  //   // const height = 600; // Specify the height in numbers

  //   // const scene = new THREE.Scene();
  //   scene.background = null; // Make the scene background transparent

  //   // const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  //   renderer.setSize(width, height);
  //   renderer.setPixelRatio(window.devicePixelRatio);

  //   // const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  //   camera.position.z = 4;
  //   camera.position.y = 0.5;

  //   const ambientLight = new THREE.AmbientLight('#ffffff', 1);
  //   scene.add(ambientLight);

  //   if (mountRef.current) {
  //     mountRef.current.appendChild(renderer.domElement);
  //   }

  //   const handleResize = () => {
  //     const width = mountRef.current ? mountRef.current.clientWidth : window.innerWidth;
  //     const height = mountRef.current ? mountRef.current.clientHeight : window.innerHeight;
  //     renderer.setSize(width, height);
  //     camera.aspect = width / height;
  //     camera.updateProjectionMatrix();
  //   };

  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //     if (mountRef.current) {
  //       mountRef.current.removeChild(renderer.domElement);
  //     }
  //   };
  // }, []);

  return (
    <div className="relative flex items-center justify-center w-full h-screen bg-cover bg-center bg-[url('/model/stage2.png')]">
      <div className="absolute top-0 left-0 w-full h-full bg-transparent">
        {/* <ThreeScene scene={scene} camera={camera} renderer={renderer} /> */}
        <Canvas shadows camera={{ position: [0, 0, 3], fov: 30 }} style={{ pointerEvents: 'none' }}>
          <color attach="background" args={['#ececec']} />
          <Experience />
        </Canvas>
      </div>
      {/* <GLBViewer urls={animations}/> */}
      <div className="absolute top-0 left-0 pointer-events-none h-screen">
        <Songs />
      </div>
      <div className="absolute top-0 right-0 pointer-events-none h-screen">
        <TextareaWithButton />
      </div>
    </div>
  );
}