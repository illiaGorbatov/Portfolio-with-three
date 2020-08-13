import React, { Suspense, forwardRef, useMemo } from "react";

import {
  EffectComposer,
  Noise,
  Vignette,
  HueSaturation,
} from "react-postprocessing";
import { useResource, useThree } from "react-three-fiber";

import { GodRaysEffect, KernelSize, BlendFunction } from "postprocessing";


export const GodRays = forwardRef((props, ref) => {
  const { camera } = useThree();
  const { sun } = props;

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

  return <primitive ref={ref} object={effect} dispose={null} />;
});

const Sun = forwardRef(function sun(props, forwardRef){
  const sunColor = "#FF0000";

  return (
    <mesh position={[0, 0, -16]} ref={forwardRef}>
      <circleBufferGeometry attach="geometry" args={[10, 10]}/>
      <meshBasicMaterial attach="material" color={sunColor} />
    </mesh>
  );
});

function Effects2() {
  const [$sun, sun] = useResource();

  const hue =  3.11;
  const saturation = 2.05;
  const noise = 0.47;

  return (
    <Suspense fallback={null}>
      <Sun ref={$sun} />

      {sun && (
        <EffectComposer >
          <GodRays sun={$sun} />

          <Noise
            opacity={noise}
            premultiply // enables or disables noise premultiplication
            blendFunction={BlendFunction.ADD} // blend mode
          />

          <HueSaturation hue={hue} saturation={saturation} />

          <Vignette />
        </EffectComposer>
      )}
    </Suspense>
  );
}

export default Effects2;
