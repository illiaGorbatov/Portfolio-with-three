import React, {useLayoutEffect, useRef} from 'react';
import * as THREE from 'three';
import {useDispatch} from "react-redux";
import {actions} from "../../../store/reducer";


const NewSun: React.FC = () => {

    const sun = useRef(new THREE.Mesh());
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        dispatch(actions.setSun(sun.current))
        return () => {
            dispatch(actions.setSun(null))
        }
    }, [])

    return (
        <group position={[0, 0, -40]}>
            <pointLight args={[0xffccaa, 3, 20]}/>
            <mesh ref={sun}>
                <meshBasicMaterial attach='material' color={0xffccaa} transparent={true}/>
                <sphereBufferGeometry attach='geometry' args={[5, 32, 32]}/>
            </mesh>
        </group>
    )
}

export default NewSun