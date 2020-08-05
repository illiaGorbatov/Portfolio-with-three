import React, {Suspense, useCallback, useEffect, useLayoutEffect, useState} from 'react';
import Model from "./Explosion/Model";
import Stars from "./StarSystem/stars";
import {useStore} from "../../utils/zustandStore";
import MainCamera from "./MainCamera";
import Trackball from "../controls/trackballControls";
import {useSpring, animated} from "react-spring/three";
import Land from './Landscape/Land';
import LandscapeSky from './Landscape/LandscapeSky';
import * as THREE from 'three';
import Controls from "../controls/controls";
import {useFrame, useThree} from "react-three-fiber";
import NewSun from "./StarSystem/NewSun";

const TransitionsBetweenScenes: React.FC = () => {

    const scenes = useStore(state => state.scenes);

    const {scene, gl} = useThree();
    useLayoutEffect(() => {
        console.log(gl)
    }, [])

    const [renderedScene, setRenderedScene] = useState('landscape');
    const changeRenderedScene = useCallback((scene) => {
        setRenderedScene(scene)
    }, []);

    return (
        <Suspense fallback={null}>
            <group visible={renderedScene === 'landscape' || renderedScene === 'landscape & explosion'}>
                <Land/>
                <LandscapeSky changeRenderedScene={changeRenderedScene}/>
            </group>
            <group visible={renderedScene === 'explosion' || renderedScene === 'landscape & explosion'}>
                <Stars/>
                <Model/>
                {renderedScene !== 'landscape' && <NewSun/>}
            </group>
          <MainCamera/>
        </Suspense>
    )
}

export default TransitionsBetweenScenes;