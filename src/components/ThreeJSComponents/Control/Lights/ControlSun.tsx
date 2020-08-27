import React, {forwardRef} from 'react';
import {Mesh} from 'three';
import {shallowEqual, useSelector} from "react-redux";
import {animated, useSpring} from 'react-spring/three';
import {AppStateType} from "../../../../store/store";
import {Vector3Type} from "../../../../utils/StringVariablesAndTypes";


const ControlSun = forwardRef<Mesh, {}>((props, forwardRef) => {

    const isCrystalExploded = useSelector((state: AppStateType) => state.interface.isCrystalExploded, shallowEqual);

    const {scale} = useSpring({
        scale: isCrystalExploded ? [15, 15, 15] : [0.1, 0.1, 0.1],
        config: {
            mass: 100,
            tension: 400,
            friction: 400,
            clamp: true,
        }
    })

    return (
        <animated.mesh ref={forwardRef} position={[0, 0, -310]} scale={scale as unknown as Vector3Type}>
            <sphereBufferGeometry attach="geometry" args={[5, 10, 10]}/>
            <meshBasicMaterial attach="material" color={"#FF0000"} />
        </animated.mesh>
    );
});

export default ControlSun