import React, {Suspense, useEffect, useRef} from 'react';
import * as THREE from 'three';
import BordersArray from "./Borders/BordersArray";
import ControlLights from "./Lights/ControlLights";
import ControlSun from './Lights/ControlSun';
import Effects from "../posteffects/Effects";
import {useResource, useThree} from "react-three-fiber";
import Controls from "../../controls/controls";
import CubeArray from "./Cubes/CubesArray";
import Model from "../Explosion/Model";
import ControlCamera from "../ControlCamera";
import Postprocessing from "../posteffects/Postprocessing";
import Effects2 from "../posteffects/Effects2";
import VideoCubesArray from "./Cubes/VideoCubesArray";
import Trackball from "../../controls/trackballControls";

const ControlLikeScene: React.FC = () => {

    return (
        <>
            <Suspense fallback={null}>
                <BordersArray/>
                <ControlLights/>
                <Model/>
                <Postprocessing/>
                <VideoCubesArray/>
            </Suspense>
            <ControlCamera/>
        </>
    )
}

export default ControlLikeScene