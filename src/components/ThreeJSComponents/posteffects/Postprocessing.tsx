import React, {createRef} from "react";
import {EffectComposer, HueSaturation, Noise, Vignette} from "react-postprocessing";
import GodRays from "./CustomGodRays";
/*@ts-ignore*/
import {BlendFunction} from 'postprocessing';
import {useResource, useThree} from "react-three-fiber";
import ControlSun from "../Control/Lights/ControlSun";
import {Mesh} from "three";

const Postprocessing: React.FC = () => {

    const [sunRef, sun] = useResource<Mesh>()

    return (
        <>
            <ControlSun ref={sunRef}/>
            {sun &&
            <EffectComposer>
                <GodRays sun={sunRef}/>
                {/*@ts-ignore*/}
                <Noise premultiply blendFunction={BlendFunction.ADD} opacity={0.47}/>
                <HueSaturation hue={3.11} saturation={2.05}/>
                <Vignette/>
            </EffectComposer>}
        </>
    );
}

export default Postprocessing