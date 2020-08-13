import React, {useEffect, useMemo} from 'react';
import * as THREE from 'three';
import {extend, useFrame, useThree} from 'react-three-fiber';
import {
    BloomEffect,
    ColorAverageEffect,
    EffectComposer,
    EffectPass,
    GodRaysEffect,
    KernelSize,
    NoiseEffect,
    RenderPass,
    SepiaEffect,
    SMAAEffect,
    SMAAPreset,
    VignetteEffect,
    DotScreenEffect,
    BlendFunction,
    HueSaturationEffect
    //@ts-ignore
} from 'postprocessing';
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
import { useSelector, shallowEqual } from 'react-redux';
import { AppStateType } from '../../../store/store';

extend({ShaderPass})

type PropsType = { sun?: THREE.Mesh }

const Effects: React.FC = () => {

    const sun = useSelector((state: AppStateType) => state.interface.sun, shallowEqual);

    const {gl, scene, camera, size} = useThree();

    const composer = useMemo(() => {

        //SMAA
        const areaImage = new Image();
        areaImage.src = SMAAEffect.areaImageDataURL;
        const searchImage = new Image();
        searchImage.src = SMAAEffect.searchImageDataURL;
        const smaaEffect = new SMAAEffect(searchImage, areaImage, SMAAPreset.MEDIUM);

        //bloom
        const bloom = new BloomEffect({
            luminanceThreshold: 0.2,
            luminanceSmoothing: 0,
            resolutionScale: 1
        });
        bloom.blendMode.opacity.value = 2;

        //noise effect
        const noise = new NoiseEffect({premultiply: true, blendFunction: BlendFunction.ADD, opacity: 0.47});

        //sepia
        const sepia = new SepiaEffect({intensity: 1.0});

        const hue = new HueSaturationEffect({hue: 3.11, saturation: 2.05})

        //monochrome
        const monochrome = new ColorAverageEffect();

        const dotScreen = new DotScreenEffect({scale: 1});

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
            effectPass = new EffectPass(camera, smaaEffect, godRays, noise, hue, vignette);
            effectPass.renderToScreen = true;
        } else {
            effectPass = new EffectPass(camera, smaaEffect,  noise);
            effectPass.renderToScreen = true;
        }

        //composer
        const composer = new EffectComposer(gl);
        composer.addPass(new EffectPass(camera));
        composer.addPass(new RenderPass(scene, camera));
        composer.addPass(effectPass);

        return composer

    }, [camera, gl, scene, sun]);

    useEffect(() => void composer.setSize(size.width, size.height), [composer, size]);

    return useFrame((_, delta) => composer.render(delta), 1)
};

export default Effects;

