import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';

function RotatingCube() {
    const meshRef = useRef();

    useFrame(() => {
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;
    });

    return (
        <mesh ref={meshRef}>
            <Box args={[2, 2, 2]}>
                <meshStandardMaterial attach="material" color="purple" />
            </Box>
        </mesh>
    );
}

export default function ThreeCanvas() {
    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 15, 10]} angle={0.3} />
            <RotatingCube />
        </Canvas>
    );
}
