import React, {useEffect} from 'react';
import {useSpring, animated} from "@react-spring/three";
import {Vector3Type} from "../../../../utils/StringVariablesAndTypes";

type PropsType = {
    isBlack: boolean,
    opened: boolean
}

const Pyramid: React.FC<PropsType> = ({isBlack, opened}) => {

    const [{position}, setSpring] = useSpring(() => ({
        position: isBlack ? [0, 400, -300] : [0, -340, -300],
        config: {
            mass: 100,
            tension: 400,
            friction: 400,
            clamp: true,
        }
    }))

    useEffect(() => {
        if (opened) setSpring({position: isBlack ? [0, 210, -300] : [0, -160, -300]});
        if (!opened) setSpring({position: isBlack ? [0, 400, -300] : [0, -340, -300]});
    }, [opened])

    return (
        <animated.mesh scale={isBlack ? [40, 40, 40] : [30, 30, 30]}
                       position={position as unknown as Vector3Type}
                       rotation={isBlack ? [Math.PI, 0, 0] : [0, 0, 0]}>
            <coneBufferGeometry attach="geometry" args={[5, 10, 4]}/>
            <meshBasicMaterial attach="material" color={isBlack ? '#000B11' : '#7B776E'} />
        </animated.mesh>
    )

}

export default React.memo(Pyramid)