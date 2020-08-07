import React from 'react';
import {Canvas} from "react-three-fiber";
import * as THREE from "three";
import TransitionsBetweenScenes from "./TransitionsBetweenScenes";
import store from "../../store/store";
import {Provider} from "react-redux";
import CarLights from "./Road/CarLights";

const InitialCanvas = () => {

    return (
        <Canvas
            style={{background: 'black'}}
            shadowMap
            onCreated={({scene}) => {
                scene.background = new THREE.Color('black');
            }}
            concurrent={true}>
            <Provider store={store}>
                {/*<ambientLight color={0x404040} intensity={5.0} />*/}
                <fog attach="fog" args={[0x333333, 10, 400]}/>
                {/*<TransitionsBetweenScenes/>*/}
                <CarLights/>
            </Provider>
        </Canvas>
    );
};

export default InitialCanvas;