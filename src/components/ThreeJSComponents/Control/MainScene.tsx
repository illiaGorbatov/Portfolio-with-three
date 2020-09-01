import React, {Suspense} from 'react';
import BordersArray from "./Borders/BordersArray";
import Lights from "./Lights/Lights";
import Model from "../Explosion/Model";
import ControlCamera from "../ControlCamera";
import AstralPlane from "./AstralPlane/AstralPlane";
import CubesArray from "./Cubes/CubesArray";
import VideoPanel from "./Videopanel/Videopanel";
import Sun from "./Lights/Sun";
import AnimatedLight from "./Lights/AnimatedLight";
import Room from "./Room/Room";
import Postprocessing from "../posteffects/Postprocessing";

//colors

const MainScene: React.FC = () => {

    return (
        <>
            <Suspense fallback={null}>
                <BordersArray/>
                <Lights/>
                <Sun/>
                <Model/>
                <CubesArray/>
                <AstralPlane/>
                <VideoPanel/>
                <Postprocessing/>
                <AnimatedLight/>
                <Room/>
            </Suspense>
            <ControlCamera/>
        </>
    )
}

export default React.memo(MainScene)