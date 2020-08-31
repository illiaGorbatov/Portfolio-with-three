import React, {forwardRef, useLayoutEffect, useRef} from 'react';
import * as THREE from 'three';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {animated, useSpring} from 'react-spring/three';
import {AppStateType} from "../../../../store/store";
import {Vector3Type} from "../../../../utils/StringVariablesAndTypes";
import {actions} from "../../../../store/InterfaceReducer";


const ControlSun = () => {

    const isCrystalExploded = useSelector((state: AppStateType) => state.interface.isCrystalExploded, shallowEqual);
    const dispatch = useDispatch();

    const sunRef  = useRef<THREE.Mesh>(new THREE.Mesh())

    const {scale} = useSpring({
        scale: isCrystalExploded ? [15, 15, 15] : [0.1, 0.1, 0.1],
        config: {
            mass: 100,
            tension: 400,
            friction: 400,
            clamp: true,
        }
    });

    useLayoutEffect(() => {
        dispatch(actions.setSun(sunRef.current))
    }, [])

    return (
        <animated.mesh ref={sunRef} position={[0, 0, -310]} scale={scale as unknown as Vector3Type}>
            <sphereBufferGeometry attach="geometry" args={[5, 10, 10]}/>
            <meshBasicMaterial attach="material" color={"#FF0000"} />
        </animated.mesh>
    );
};

export default React.memo(ControlSun)