import React from "react";
import {EffectComposer, GodRays, HueSaturation, Vignette} from "react-postprocessing";
/*@ts-ignore*/
import {KernelSize} from 'postprocessing';
import {useSelector} from "react-redux";
import {AppStateType} from "../../../store/store";
import isEqual from "react-fast-compare";
import {isMobile} from "react-device-detect";

const Postprocessing: React.FC = () => {

    const sun = useSelector((state: AppStateType) => state.interface.sun, isEqual);

    return (
        <>
            {sun &&
            <EffectComposer multisampling={isMobile ? 4 : 8}>
                <GodRays sun={sun} height={300} width={300} kernelSize={KernelSize.SMALL}
                         density={0.96} decay={0.92} weight={0.3} exposure={0.34} samples={50} clampMax={1}/>
                <HueSaturation hue={3.11} saturation={2.05}/>
                <Vignette/>
            </EffectComposer>}
        </>
    );
}

export default React.memo(Postprocessing)