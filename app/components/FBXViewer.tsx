"use client"; // Указываем, что это клиентский компонент

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useFBX, OrbitControls, useTexture, Plane } from '@react-three/drei';
import * as THREE from 'three';
import { useSinging } from '../context/sing';
import { is } from '@react-three/fiber/dist/declarations/src/core/utils';

type FBXModelProps = {
  urls: string[];
};

const FBXModel: React.FC<FBXModelProps> = ({ urls }) => {
  const fbxRefs = useRef(urls.map(url => useFBX(encodeURI(url))));
  const mixer = useRef<THREE.AnimationMixer | null>(null);
  const [currentAnimation, setCurrentAnimation] = useState(0);
  const [prevAction, setPrevAction] = useState<THREE.AnimationAction | null>(null);
  const {isPlaying} = useSinging();

  const animationChange = () => {
    setCurrentAnimation((prev) => (prev + 1) % urls.length);
  }

  useEffect(() => {
    const fbx = fbxRefs.current[currentAnimation];
    if (fbx.animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(fbx);
      const action = mixer.current.clipAction(fbx.animations[0]);
      action.play();

      if (prevAction) {
        prevAction.crossFadeTo(action, 0.8, false); // Cross-fade to the new action over 1 second
      } else {
        action.play();
      }

      action.clampWhenFinished = true;
      if(isPlaying){
        action.loop = currentAnimation === urls.length - 1 ? THREE.LoopRepeat : THREE.LoopOnce;
      } else {
        action.loop = currentAnimation === urls.length - 2 ? THREE.LoopRepeat : THREE.LoopOnce;
      }
      mixer.current.addEventListener('finished', animationChange);
      setPrevAction(action);

      return () => {
        if (mixer.current) {
          mixer.current.stopAllAction();
          mixer.current.uncacheClip(fbx.animations[0]);
          mixer.current.removeEventListener('finished', animationChange);
        }
      };
    }
  }, [currentAnimation, urls]);

  useEffect(() => {
    if(isPlaying){  
      setCurrentAnimation(3);
    } else {    
      setCurrentAnimation(2);
    }
  }, [isPlaying]);

  useFrame((state, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

  return <primitive object={fbxRefs.current[currentAnimation]} scale={[0.045, 0.045, 0.045]} position={[0, -1, 0]}/>;
};

// type PlatformProps = {
//   url: string;
// };

// const Platform: React.FC<PlatformProps> = ({ url }) => {
//   const platform = useFBX(encodeURI(url));

//   return <primitive object={platform} scale={[5, 5, 5]} position={[0, -2, -3]} rotation={[-Math.PI / 13, 0, 0]}/>;
// };


type FBXViewerProps = {
  urls: string[];
  // platformUrl: string;
};

const FBXViewer: React.FC<FBXViewerProps> = ({ urls }) => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 6, 10], fov: 75}} // Настройка камеры: начальная позиция и угол обзора (fov)
      style={{ height: '100%', width: '100%'}} // Стили для контейнера с 3D-сценой
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[0, 0, 1]} intensity={1} castShadow />
      <FBXModel urls={urls} />
      {/* <Platform url={platformUrl} /> */}
      <OrbitControls
        target={[0, 5, 0]}
        minDistance={1}
        maxDistance={20}
        enableRotate={false}
        enableZoom={false}
        enableDamping={true}
      />
    </Canvas>
  );
};

export default FBXViewer;