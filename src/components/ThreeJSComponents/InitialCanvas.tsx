import React, {Suspense} from 'react';
import {Canvas} from "react-three-fiber";
import * as THREE from "three";
import TransitionsBetweenScenes from "./TransitionsBetweenScenes";
import store from "../../store/store";
import {Provider} from "react-redux";
import CarLights from "./Road/CarLights";
import Effects from "./posteffects/Effects";
import ControlLikeScene from "./Control/Control";
import AstralPlane from "./Control/AstralPlane/AstralPlane";

const InitialCanvas = () => {

    return (
        <Canvas
            style={{background: '#EAE6E5'}}
            shadowMap
            colorManagement
            gl={{
                alpha: false,
                antialias: false,
                stencil: false,
                depth: false,
            }}
            concurrent={true}>
            <Provider store={store}>
                {/*<ambientLight color={'white'} intensity={1.0} />*/}
                {/*<fog attach="fog" args={[0x333333, 10, 400]}/>*/}
                {/*<TransitionsBetweenScenes/>*/}
                <ControlLikeScene/>
            </Provider>
        </Canvas>
    );
};

export default InitialCanvas;