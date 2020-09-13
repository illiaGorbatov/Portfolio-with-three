import React from 'react';
import {animated, SpringValue} from "react-spring/three";
import * as THREE from 'three';

type PropsType = {
    color: SpringValue<string>
}

const Background: React.FC<PropsType> = ({color}) => {

    return(
        <mesh position={[0, 0, 0]}>
            <boxBufferGeometry attach="geometry" args={[700, 700, 700]}/>
            <animated.meshBasicMaterial attach="material" color={color} side={THREE.BackSide}/>
        </mesh>
    )
}

export default React.memo(Background)