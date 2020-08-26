import React, {forwardRef} from 'react';
import {Mesh} from 'three';
import {shallowEqual, useSelector} from "react-redux";
import {animated, useSpring} from 'react-spring/three';
import {AppStateType} from "../../../../store/store";


const ControlSun = forwardRef<Mesh, {}>((props, forwardRef) => {

    const isMainPageFocused = useSelector((state: AppStateType) => state.interface.isMainPageFocused, shallowEqual);

    const {opacity} = useSpring({
        opacity: !isMainPageFocused ? 1 : 0,
        delay: !isMainPageFocused ? 1000 : 0,
    })

    return (
        <mesh ref={forwardRef} position={[0, 0, -160]}>
            <circleBufferGeometry attach="geometry" args={[30, 10]}/>
            <animated.meshBasicMaterial attach="material" color={"#FF0000"} opacity={opacity}/>
        </mesh>
    );
});

export default ControlSun