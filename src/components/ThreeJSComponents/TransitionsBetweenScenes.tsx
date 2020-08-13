import React, {Suspense, useLayoutEffect} from 'react';
import Model from "./Explosion/Model";
import Stars from "./StarSystem/stars";
import MainCamera from "./MainCamera";
import Land from './Landscape/Land';
import LandscapeSky from './Landscape/LandscapeSky';
import {useThree} from "react-three-fiber";
import NewSun from "./StarSystem/NewSun";
import Effects from "./posteffects/Effects";
import {EXPLOSION, LANDSCAPE} from "../../utils/StringVariablesAndTypes";
import {shallowEqual, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";

const TransitionsBetweenScenes: React.FC = () => {

    const currentScene = useSelector((state: AppStateType) => state.interface.scene, shallowEqual);

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