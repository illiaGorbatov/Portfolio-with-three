import React, {Suspense} from 'react';
import BordersArray from "./Borders/BordersArray";
import ControlLights from "./Lights/ControlLights";
import Model from "../Explosion/Model";
import ControlCamera from "../ControlCamera";
import Postprocessing from "../posteffects/Postprocessing";
import VideoCubesArray from "./Cubes/VideoCubesArray";
import AstralPlane from "./AstralPlane/AstralPlane";

//colors

const ControlLikeScene: React.FC = () => {

    return (
        <>
            <Suspense fallback={null}>
                <BordersArray/>
                <ControlLights/>
                <Model/>
                <Postprocessing/>
                <VideoCubesArray/>
                <AstralPlane/>
            </Suspense>
            <ControlCamera/>
        </>
    )
}

export default React.memo(ControlLikeScene)