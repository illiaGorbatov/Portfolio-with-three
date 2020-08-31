import React, {Suspense} from 'react';
import BordersArray from "./Borders/BordersArray";
import ControlLights from "./Lights/ControlLights";
import Model from "../Explosion/Model";
import ControlCamera from "../ControlCamera";
import Postprocessing from "../posteffects/Postprocessing";
import AstralPlane from "./AstralPlane/AstralPlane";
import CubesArray from "./Cubes/CubesArray";
import VideoPanel from "./Videopanel/Videopanel";

//colors

const ControlLikeScene: React.FC = () => {

    return (
        <>
            <Suspense fallback={null}>
                <BordersArray/>
                <ControlLights/>
                <Model/>
                <Postprocessing/>
                <CubesArray/>
                <AstralPlane/>
                <VideoPanel/>
            </Suspense>
            <ControlCamera/>
        </>
    )
}

export default React.memo(ControlLikeScene)