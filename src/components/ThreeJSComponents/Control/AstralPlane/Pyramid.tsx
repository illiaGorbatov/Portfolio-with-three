import React from 'react';
import {animated} from "@react-spring/three";
import {Vector3Type} from "../../../../utils/StringVariablesAndTypes";
import * as THREE from "three";
import {SpringValue} from 'react-spring/three';

type PropsType = {
    pyramidPosition: SpringValue<number[]>
}

const Pyramid: React.FC<PropsType> = ({pyramidPosition}) => {

    return (
        <animated.mesh scale={[10, 10, 10]} receiveShadow
                       position={pyramidPosition as unknown as Vector3Type}
                       rotation={[Math.PI, 0, 0]}>
            <coneBufferGeometry attach="geometry" args={[5, 10, 4]}/>
            <meshStandardMaterial attach="material" roughness={0.7} shadowSide={THREE.FrontSide} color={'white'} metalness={0.6}/>
        </animated.mesh>
    )

}

export default React.memo(Pyramid)