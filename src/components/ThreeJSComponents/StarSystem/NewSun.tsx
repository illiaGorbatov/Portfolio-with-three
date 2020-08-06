import React, {useLayoutEffect, useRef} from 'react';
import * as THREE from 'three';
import {useStore} from "../../../utils/zustandStore";
import {shallow} from "zustand/shallow";


const NewSun: React.FC = () => {

    const sun = useRef(new THREE.Mesh());
    const setSun = useStore(state => state.setSun, shallow);


    useLayoutEffect(() => {
        setSun(sun.current)
        return () => {
            setSun(null)
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