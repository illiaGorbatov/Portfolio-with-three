import React, {forwardRef, useMemo} from "react";
//@ts-ignore
import {GodRaysEffect, KernelSize,} from 'postprocessing';
import {useThree} from "react-three-fiber";
import {Mesh} from "three";

type PropsType = {
    sun: Mesh | null
}

const GodRays = forwardRef<null, PropsType>(({ sun }, forwardRef) => {

    const { camera } = useThree();
    console.log('render', sun)
    const effect = useMemo(() => {
        return new GodRaysEffect(camera, sun, {
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
    }, [camera, sun]);

    return <primitive ref={forwardRef} object={effect} dispose={null} />;
});

export default React.memo(GodRays)