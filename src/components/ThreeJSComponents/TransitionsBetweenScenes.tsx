import React, {Suspense, useLayoutEffect} from 'react';
import Model from "./Explosion/Model";
import Stars from "./StarSystem/stars";
import {useStore} from "../../utils/zustandStore";
import MainCamera from "./MainCamera";
import Land from './Landscape/Land';
import LandscapeSky from './Landscape/LandscapeSky';
import {useThree} from "react-three-fiber";
import NewSun from "./StarSystem/NewSun";
import Effects from "./posteffects/Effects";
import {shallow} from "zustand/shallow";
import {EXPLOSION, LANDSCAPE} from "../../utils/StringVariablesAndTypes";

const TransitionsBetweenScenes: React.FC = () => {

    const currentScene = useStore(state => state.scene, shallow);

    const {scene, gl} = useThree();
    useLayoutEffect(() => {
        console.log(gl)
    }, [])


    return (
        <Suspense fallback={null}>
            <group visible={currentScene === LANDSCAPE}>
                <Land/>
                <LandscapeSky />
            </group>
            <group visible={currentScene === EXPLOSION}>
                <Model/>
                {currentScene === EXPLOSION && <NewSun/>}
            </group>
            <Stars/>
            <MainCamera/>
            <Effects/>
        </Suspense>
    )
}

export default TransitionsBetweenScenes;