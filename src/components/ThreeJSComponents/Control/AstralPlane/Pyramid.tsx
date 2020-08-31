import React, {useEffect} from 'react';
import {useSpring, animated} from "@react-spring/three";
import {Vector3Type} from "../../../../utils/StringVariablesAndTypes";
import * as THREE from "three";

type PropsType = {
    opened: boolean
}

const Pyramid: React.FC<PropsType> = ({opened}) => {

    const [{position}, setSpring] = useSpring(() => ({
        position: [0, 400, -300],
        config: {
            mass: 100,
            tension: 400,
            friction: 400,
            clamp: true,
        }
    }))

    useEffect(() => {
        if (opened) setSpring({position: [0, 205, -300]});
        if (!opened) setSpring({position: [0, 400, -300]});
    }, [opened])

    return (
        <animated.mesh scale={[40, 40, 40]}
                       position={position as unknown as Vector3Type}
                       rotation={[Math.PI, 0, 0]}>
            <coneBufferGeometry attach="geometry" args={[5, 10, 4]}/>
            <meshStandardMaterial attach="material" roughness={0.7} shadowSide={THREE.FrontSide} color={'#000B11'} metalness={0.6}/>
        </animated.mesh>
    )

}

export default React.memo(Pyramid)