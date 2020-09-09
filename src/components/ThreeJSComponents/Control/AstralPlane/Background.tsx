import React from 'react';
import {animated, useSpring, SpringValue} from "react-spring/three";
import * as THREE from 'three';

type PropsType = {
    color: SpringValue<string>
}

const Background: React.FC<PropsType> = ({color}) => {

   /* const {color} = useSpring({
        color: /!*opened ? '#EAE6E5' :*!/ '#000B11',
        config: {
            mass: 100,
            tension: 400,
            friction: 400,
            clamp: true
        },
        delay: opened ? 1000 : 0
    })*/

    return(
        <mesh position={[0, 0, 0]}>
            <boxBufferGeometry attach="geometry" args={[700, 700, 700]}/>
            <animated.meshBasicMaterial attach="material" color={color} side={THREE.BackSide}/>
        </mesh>
    )
}

export default React.memo(Background)