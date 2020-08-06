import React, {useEffect, useRef} from "react";
import {useFrame, useThree} from "react-three-fiber";
import {animated, useSpring} from "react-spring/three";
import {useStore} from "../../utils/zustandStore";
import {shallow} from "zustand/shallow";
import {
    EXPLOSION,
    TRANSITION_TO_EXPLOSION,
    TRANSITION_TO_LANDSCAPE,
    Vector3Type
} from "../../utils/StringVariablesAndTypes";

const cameraSettings = {
    landscape: [0, 10, 4] as Vector3Type,
    explosion: [0, 0, 20] as Vector3Type,
    transitionToExplosion: [0, 200, 20] as Vector3Type,
    lookAtCenter: [0, 0, 0] as Vector3Type,
    lookAtStars: [0, 1000, -40] as Vector3Type,
    lookAtLandscape: [0, 10, -1000] as Vector3Type
}

const MainCamera = () => {

    const cameraState = useStore(state => state.cameraState, shallow);

    const setCurrentScene = useStore(state => state.setCurrentScene, shallow);
    const setCameraState = useStore(state => state.setCameraState, shallow);

    const ref = useRef();
    const {setDefaultCamera, camera} = useThree();
    // Make the camera known to the system
    useEffect(() => void setDefaultCamera(ref.current!), []);

    const behavior = useRef('');
    const rotation = useRef(0);
    const setCameraBehavior = (state: string) => {
        if (state === TRANSITION_TO_EXPLOSION) {
            behavior.current = 'radial';
        }
        if (state === TRANSITION_TO_LANDSCAPE) {
            behavior.current = 'static';
            rotation.current = 0
        }
    };

    // camera state

    const [{position, lokAtArray}, setCameraPosition] = useSpring(() => ({
        position: cameraSettings.landscape,
        lokAtArray: cameraSettings.lookAtLandscape,
        config: {
            tension: 100,
            friction: 38,
            clamp: true
        }
    }));

    useEffect(() => {
        if (cameraState === TRANSITION_TO_EXPLOSION) {
            setCameraPosition({
                position: cameraSettings.transitionToExplosion,
                lokAtArray: cameraSettings.lookAtStars,
                onRest: () => {
                    setCurrentScene(EXPLOSION)
                    setCameraPosition({
                        position: cameraSettings.explosion,
                        lokAtArray: cameraSettings.lookAtCenter,
                        onRest: () => setCameraBehavior(cameraState)
                    })
                }
            })
        }
        if (cameraState === TRANSITION_TO_LANDSCAPE) {
            setCameraPosition({
                position: cameraSettings.landscape,
                lokAtArray: cameraSettings.lookAtStars,
                onRest: () => setCameraPosition({
                    lokAtArray: cameraSettings.lookAtLandscape,
                    onRest: () => setCameraBehavior(cameraState)
                })
            })
        }
    }, [cameraState]);



    useFrame(() => {
        /*console.log(camera.position)*/
        camera.lookAt(...lokAtArray.get() as  Vector3Type)
        if (behavior.current === 'radial') {
            rotation.current += 0.001;
            camera.position.x = Math.sin(rotation.current) * 20;
            camera.position.z =  Math.cos(rotation.current) * 20;
        }

    })

    // @ts-ignore
    return <animated.perspectiveCamera ref={ref} position={position}/>
}

export default MainCamera