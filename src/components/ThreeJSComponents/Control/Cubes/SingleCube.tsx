import React, {useRef, useMemo} from 'react';
import * as THREE from 'three';
import {useFrame} from "react-three-fiber";
import { animated } from 'react-spring/three';

type PropsType = {
    setLaunching: (index: number) => void;
    isLaunching: boolean
}

const SingleCube: React.FC<PropsType> = (props) => {
    const randomDelay = useMemo(() => Math.random() * 100, []);
    const direction = useMemo(() => new THREE.Vector3(Math.random(), Math.random(), Math.random()),[]);

    const ref = useRef(new THREE.Mesh());
    useFrame(({ clock }) => {
        ref.current.rotation.x += direction.x / 140;
        ref.current.rotation.y += direction.y / 140;
        ref.current.rotation.z += direction.z / 140;

        ref.current.position.y +=
            Math.sin(randomDelay + clock.getElapsedTime() / 2) / 400;
    });

    return (
        <animated.mesh {...props} castShadow receiveShadow ref={ref}>
            <boxBufferGeometry attach="geometry" args={[0.5, 1, 0.5]} />
            <meshStandardMaterial attach="material" color="#333" roughness={0.7} />
        </animated.mesh>
    );
}

export default SingleCube