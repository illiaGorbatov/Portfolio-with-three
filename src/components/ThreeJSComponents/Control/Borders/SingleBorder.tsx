import React, {useMemo} from 'react';
import * as THREE from 'three';
import {animated, SpringValue} from 'react-spring/three';
import {Vector3Type} from "../../../../utils/StringVariablesAndTypes";

type PropsType = {
    scale: [number, number, number],
    position:  SpringValue<number[]>,
    rotation: SpringValue<number>
}

const SingleBorder: React.FC<PropsType> = ({rotation, position, ...props}) => {
    const {extrudeShape, extrudeSettings} = useMemo(() => {

        let extrudeShape = new THREE.Shape();
        extrudeShape.moveTo(-51.2, -19.2);
        extrudeShape.lineTo(51.2, -19.2);
        extrudeShape.lineTo(51.2, 19.2);
        extrudeShape.lineTo(-51.2, 19.2);

        let hole = new THREE.Path();
        hole.moveTo(-32, -12.8);
        hole.lineTo(32, -12.8);
        hole.lineTo(32, 12.8);
        hole.lineTo(-32, 12.8);
        extrudeShape.holes.push(hole);
        //width: 64, height: 25,6

        const extrudeSettings = {
            steps: 1,
            depth: 20,
            bevelEnabled: false,
        }

        return {extrudeShape, extrudeSettings};
    }, []);

    return (
        <animated.mesh {...props} rotation-z={rotation} position={position as unknown as Vector3Type} castShadow receiveShadow>
            <extrudeBufferGeometry attach="geometry" args={[extrudeShape, extrudeSettings]}/>
            <meshStandardMaterial attach="material" color="white" roughness={0.7} shadowSide={THREE.FrontSide}/>
        </animated.mesh>
    );
}

export default SingleBorder