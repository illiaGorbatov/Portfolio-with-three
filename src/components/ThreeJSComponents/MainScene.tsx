import React, {Suspense} from 'react';
import BordersArray from "./Control/Borders/BordersArray";
import ControlCamera from "./Camera";
import AstralPlaneContainer from "./Control/AstralPlane/AstralPlaneContainer";
import VideoPanel from "./Control/Videopanel/Videopanel";
import AnimatedLight from "./Control/Lights/AnimatedLight";
import Room from "./Control/Room/Room";
import Postprocessing from "./posteffects/Postprocessing";

//colors

const MainScene: React.FC = () => {

    return (
        <>
            <Suspense fallback={null}>
                <BordersArray/>
                <AstralPlaneContainer/>
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