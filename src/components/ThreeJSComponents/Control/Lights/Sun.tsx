import React, {useLayoutEffect, useRef} from 'react';
import * as THREE from 'three';
import {useDispatch} from "react-redux";
import {animated, SpringValue, useSpring} from 'react-spring/three';
import {Vector3Type} from "../../../../utils/StringVariablesAndTypes";
import {actions} from "../../../../store/InterfaceReducer";
import {projectsInfo} from "../../../../textAndPrijectsInfo/TextAndProjectsSettings";

type PropsType = {
    scale: SpringValue<number[]>,
    intensity: SpringValue<number>,
    distance: SpringValue<number>,
    scrollsCount: number
}

const Sun: React.FC<PropsType> = ({scale, distance, intensity, scrollsCount}) => {

    const dispatch = useDispatch();

    const {color} = useSpring({
        color: scrollsCount === 0 ? "#ff0000" : projectsInfo[scrollsCount-1].color
    })

    const sunRef = useRef<THREE.Mesh>(new THREE.Mesh());

    useLayoutEffect(() => {
        setTimeout(() => dispatch(actions.setSun(sunRef.current)), 80)
    }, [dispatch]);

    return (
        <>
            <animated.mesh ref={sunRef} scale={scale as unknown as Vector3Type}>
                <sphereBufferGeometry attach="geometry" args={[5, 10, 10]}/>
                <animated.meshBasicMaterial attach="material" color={color}/>
            </animated.mesh>
            <animated.pointLight color={color} intensity={intensity} distance={distance} decay={0.5}/>
        </>
    );
};

export default React.memo(Sun)