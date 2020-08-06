import React, {useEffect, useMemo, useState} from "react"
import {ReactThreeFiber, useFrame} from "react-three-fiber"
import {TRANSITION_TO_EXPLOSION, TRANSITION_TO_LANDSCAPE, Vector3Type} from "../../../utils/StringVariablesAndTypes";
import {useStore} from "../../../utils/zustandStore";
import {shallow} from "zustand/shallow";
import {animated, useSpring} from "react-spring/three";

const Stars = ({count = 1000, xOff = 0, yOff = 0, zOff = 100}) => {

    const starsAndSkyState = useStore(state => state.starsAndSkyState, shallow);

    const [{opacity, position}, setSpring] = useSpring(() => ({
        opacity: 0,
        position: [0, 1000, 0],
        config: {tension: 100, friction: 38}
    }));
    useEffect(() => {
        if (starsAndSkyState === TRANSITION_TO_EXPLOSION) {
            setSpring({opacity: 1, position: [0, 0, 0]});
        }
        if (starsAndSkyState === TRANSITION_TO_LANDSCAPE) {
            setSpring({opacity: 0, position: [0, 1000, 0]});
        }
    }, [starsAndSkyState])

    const starPositionArray = useMemo(() => {
        const positions = []
        for (let i = 0; i < count; i++) {
            positions.push((xOff + Math.random() * 1000) * (Math.round(Math.random()) ? -1 : 1))
            positions.push((yOff + Math.random() * 1000) * (Math.round(Math.random()) ? -1 : 1))
            positions.push((zOff + Math.random() * 1000) * (Math.round(Math.random()) ? -1 : 1))
        }
        return new Float32Array(positions)
    }, [count, xOff, yOff, zOff]);

    return (
        <animated.points position={position as unknown as Vector3Type}>
            <bufferGeometry attach="geometry">
                <bufferAttribute attachObject={["attributes", "position"]} count={count} array={starPositionArray}
                                 itemSize={3}/>
            </bufferGeometry>
            <animated.pointsMaterial attach="material" size={2.0} sizeAttenuation color="white" transparent fog={false}
                            opacity={opacity}/>
        </animated.points>
    )
}

export default Stars
