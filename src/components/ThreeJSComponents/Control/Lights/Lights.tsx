import React from 'react';
import {shallowEqual, useSelector} from "react-redux";
import {AppStateType} from "../../../../store/store";
import { useSpring, animated } from 'react-spring/three';

const Lights: React.FC = () => {

    const project = useSelector((state: AppStateType) => state.interface.currentlyLookedProject, shallowEqual);

    const {distance} = useSpring({distance: project === null ? 500 : 300})

    return (
        <>
            <spotLight shadow-mapSize-width={2048} shadow-mapSize-height={2048} distance={200} angle={0.4}
                       penumbra={0.3} castShadow color={"#ff0000"} position={[0, 0, -310]}/>
            <animated.pointLight color={"#ff0000"} position={[0, 1, -310]} intensity={1}
                                 distance={distance} decay={0.5}/>
        </>
    );
}

export default React.memo(Lights);