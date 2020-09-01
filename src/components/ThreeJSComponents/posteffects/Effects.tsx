import React, {useEffect, useMemo} from 'react';
import {extend, useFrame, useThree} from 'react-three-fiber';
import {
    EffectComposer,
    EffectPass,
    GodRaysEffect,
    KernelSize,
    NoiseEffect,
    RenderPass,
    VignetteEffect,
    BlendFunction,
    HueSaturationEffect
    //@ts-ignore
} from 'postprocessing';
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
import { useSelector, shallowEqual } from 'react-redux';
import { AppStateType } from '../../../store/store';

extend({ShaderPass})

const Effects: React.FC = () => {

    const sun = useSelector((state: AppStateType) => state.interface.sun, shallowEqual);

    const {gl, scene, camera, size} = useThree();

    const composer = useMemo(() => {
        //noise effect
        const noise = new NoiseEffect({premultiply: true, blendFunction: BlendFunction.ADD, opacity: 0.6});

        const hue = new HueSaturationEffect({hue: 3.11, saturation: 2.05})

        const vignette = new VignetteEffect()
        //all effects pass
        let effectPass

        if (sun !== null) {
            const godRays = new GodRaysEffect(
                camera, sun, {
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
            effectPass = new EffectPass(camera, godRays, noise, hue, vignette);
            effectPass.renderToScreen = true;
        } else {
            effectPass = new EffectPass(camera, noise, hue, vignette);
            effectPass.renderToScreen = true;
        }

        //composer
        const composer = new EffectComposer(gl, {multisampling: 3});
        composer.addPass(new EffectPass(camera));
        composer.addPass(new RenderPass(scene, camera));
        composer.addPass(effectPass);

        return composer

    }, [camera, gl, scene, sun]);

    useEffect(() => composer.setSize(size.width, size.height), [composer, size]);

    return useFrame((_, delta) => composer.render(delta), 1)
};

export default React.memo(Effects);

