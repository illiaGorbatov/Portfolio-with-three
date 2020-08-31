import React from "react";
import {EffectComposer, HueSaturation, Noise, Vignette} from "react-postprocessing";
import GodRays from "./CustomGodRays";
/*@ts-ignore*/
import {BlendFunction} from 'postprocessing';
import ControlSun from "../Control/Lights/ControlSun";
import {shallowEqual, useSelector} from "react-redux";
import {AppStateType} from "../../../store/store";
import isEqual from "react-fast-compare";

const Postprocessing: React.FC = () => {

    const sun = useSelector((state: AppStateType) => state.interface.sun, isEqual);

    return (
        <>
            <ControlSun/>
            {sun &&
            <EffectComposer>
                <GodRays sun={sun}/>
                {/*@ts-ignore*/}
                <Noise premultiply blendFunction={BlendFunction.ADD} opacity={0.47}/>
                <HueSaturation hue={3.11} saturation={2.05}/>
                <Vignette/>
            </EffectComposer>}
        </>
    );
}

export default React.memo(Postprocessing)