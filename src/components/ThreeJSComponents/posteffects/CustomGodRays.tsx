import React, {useMemo, forwardRef, RefObject} from "react";
import {
    GodRaysEffect,
    KernelSize,
    //@ts-ignore
} from 'postprocessing';
import {useThree} from "react-three-fiber";
import { Mesh } from "three";

type PropsType = {
    sun: RefObject<Mesh>
}

const GodRays = forwardRef<null, PropsType>(({ sun }, forwardRef) => {

    const { camera } = useThree();

    const effect = useMemo(() => {
        const godRaysEffect = new GodRaysEffect(camera, sun.current, {
            height: 300,
            width: 300,
            kernelSize: KernelSize.SMALL,
            density: 0.96,
            decay: 0.92,
            weight: 0.3,
            exposure: 0.34,
            samples: 50,
            clampMax: 1,
        });
        return godRaysEffect;
    }, [camera, sun]);

    return <primitive ref={forwardRef} object={effect} dispose={null} />;
});

export default GodRays