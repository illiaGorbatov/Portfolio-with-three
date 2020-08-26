import React from 'react';
import {animated} from "@react-spring/three";

type PropsType = {
    isBlack: boolean
}

const Pyramid: React.FC<PropsType> = ({isBlack}) => {

    //white =



    return (
        <animated.mesh scale={isBlack ? [40, 40, 40] : [80, 80, 80]} position={[0, 0, -300]} rotation={[0, Math.PI/2, 0]}>
            <coneBufferGeometry attach="geometry" args={[5, 10, 4]}/>
            <meshBasicMaterial attach="material" color={'black'} />
        </animated.mesh>
    )

}

export default Pyramid