import React from 'react';
import {Canvas} from "react-three-fiber";
import store from "../../store/store";
import {Provider} from "react-redux";
import MainScene from "./Control/MainScene";
import {RectAreaLightUniformsLib} from "three/examples/jsm/lights/RectAreaLightUniformsLib";

const InitialCanvas = () => {

    return (
        <Canvas
            style={{background: '#EAE6E5'}}
            shadowMap
            colorManagement
            onCreated={RectAreaLightUniformsLib.init}
            gl={{
                alpha: false,
                antialias: false,
                stencil: false,
                depth: false,
            }}
            concurrent={true}>
            <Provider store={store}>
                {/*<fog attach="fog" args={[0x333333, 10, 400]}/>*/}
                <MainScene/>
            </Provider>
        </Canvas>
    );
};

export default InitialCanvas;