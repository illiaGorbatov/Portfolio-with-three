import React, {useCallback, useEffect, useRef} from 'react';
import * as THREE from 'three';
import {SkyShader} from "./shaders/SkyShader";
import {useFrame} from "react-three-fiber";
import {getState, subscribe, useStore} from "../../../utils/zustandStore";
import {useSpring, animated} from "react-spring/three";
import {shallow} from "zustand/shallow";
import {TRANSITION_TO_EXPLOSION, TRANSITION_TO_LANDSCAPE} from '../../../utils/StringVariablesAndTypes';


const LandscapeSky: React.FC = () => {

    const scrolled = useRef(getState().scrolled);
    const starsAndSkyState = useStore(state => state.starsAndSkyState, shallow);

    useEffect(() => subscribe(scr => scrolled.current = scr as number, state => state.scrolled), []);

    const material = useRef(new THREE.ShaderMaterial());

    const [{opacity}, setOpacity] = useSpring(() => ({
        opacity: 1,
        config: {tension: 100, friction: 38}
    }));

    useEffect(() => {
        if (starsAndSkyState === TRANSITION_TO_EXPLOSION) {
            setOpacity({opacity: 0, delay: 400});
        }
        if (starsAndSkyState === TRANSITION_TO_LANDSCAPE) {
            setOpacity({opacity: 1, delay: 400});
        }
    }, [starsAndSkyState]);

    const render = useCallback(() => {
        const theta = Math.PI * (-0.002 - 0.048 * scrolled.current);
        const phi = 2 * Math.PI * (-.25);
        const sunPosition = [
            225000 * Math.cos(phi),
            2500 + 200000 * scrolled.current,
            225000 * Math.sin(phi) * Math.cos(theta)
        ];
        material.current.uniforms.turbidity.value = 13 - scrolled.current * 12;
        material.current.uniforms.rayleigh.value = 1.2 - scrolled.current * 1.19;
        material.current.uniforms.mieCoefficient.value = 0.1 - scrolled.current * 0.09997;
        material.current.uniforms.mieDirectionalG.value = 0.58 - 0.1 * scrolled.current;
        material.current.uniforms.sunPosition.value = sunPosition;
    }, []);

    useEffect(() => {
        render()
    }, []);

    useFrame(() => {
        render();
    });

    return (
        <>
            <mesh>
                <boxBufferGeometry attach="geometry" args={[450000, 450000, 450000]}/>
                <animated.shaderMaterial ref={material} attach="material" args={[SkyShader]} side={THREE.BackSide}
                                         uniforms-opacity-value={opacity} transparent={true}/>
            </mesh>
        </>
    )
};
export default LandscapeSky