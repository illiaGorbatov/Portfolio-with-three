import React, {forwardRef, useEffect, useRef} from 'react';
import * as THREE from 'three';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {actions} from "../../../../store/InterfaceReducer";
import { animated, useSpring } from 'react-spring/three';
import {AppStateType} from "../../../../store/store";
import {Mesh} from "three";


const ControlSun = forwardRef<Mesh, {}>((props, forwardRef) => {

    const scrollsCount = useSelector((state: AppStateType) => state.interface.scrollsCount, shallowEqual);

    const {opacity} = useSpring({
        opacity: scrollsCount >= 1 ? 1 : 0,
        delay: scrollsCount >= 1 ? 1000 : 0,
    })

    return (
        <mesh ref={forwardRef} position={[0, 0, -150]}>
            <circleBufferGeometry attach="geometry" args={[30, 10]}/>
            <animated.meshBasicMaterial attach="material" color={"#FF0000"} opacity={opacity}/>
        </mesh>
    );
});

export default ControlSun