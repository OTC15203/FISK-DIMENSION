import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';

function GuardianAvatar() {
  const { scene } = useGLTF('/assets/avatars/guardian.glb', true);
  return <primitive object={scene} scale={2.4} position={[0, -1.2, 0]} />;
}

useGLTF.preload('/assets/avatars/guardian.glb');

export default function AvatarScene() {
  return (
    <div className="h-[70vh] w-full">
      <Canvas camera={{ position: [0, 1.5, 5], fov: 45 }} dpr={[1, 1.5]}>
        <color attach="background" args={[0, 0, 0]} />
        <ambientLight intensity={0.4} />
        <spotLight position={[4, 6, 4]} intensity={1.2} angle={0.6} penumbra={0.5} castShadow />
        <spotLight position={[-5, 3, -3]} intensity={0.6} color="#4dd0ff" />
        <Suspense fallback={null}>
          <GuardianAvatar />
          <Environment preset="night" />
        </Suspense>
        <OrbitControls enablePan={false} minDistance={3} maxDistance={6} />
      </Canvas>
    </div>
  );
}
