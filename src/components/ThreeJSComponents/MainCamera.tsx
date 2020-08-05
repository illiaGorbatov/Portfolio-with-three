import React, {useEffect, useRef} from "react";
import {useFrame, useThree} from "react-three-fiber";
import {animated, useSpring} from "react-spring/three";
import {useStore} from "../../utils/zustandStore";
import isEqual from "react-fast-compare";

type Vector3Type = [number, number, number]

const cameraSettings = {
    landscape: [0, 10, 4] as Vector3Type,
    explosion: [0, 10, 30] as Vector3Type,
    lookAtCenter: [0, 0, 0] as Vector3Type,
    lookAtStars: [0, 1000, 30] as Vector3Type,
}

const MainCamera = () => {

    /*const scenes = useStore(state => state.scenes, isEqual);*/
    const scenes = {currentScene: '', previousScene: ''}

    const ref = useRef();
    const {setDefaultCamera, camera} = useThree();
    // Make the camera known to the system
    useEffect(() => void setDefaultCamera(ref.current!), []);

    const behavior = useRef('');
    const rotation = useRef(0);
    const setCameraBehavior = () => {
        if (scenes.currentScene === 'explosion' && scenes.previousScene === 'landscape') {
            behavior.current = 'radial';
        }
    };

    const [{position, lokAtArray}, setCameraPosition] = useSpring(() => ({
        position: cameraSettings.landscape,
        lokAtArray: cameraSettings.lookAtCenter,
        config: {
            tension: 100,
            friction: 50,
        },
        onRest: () => setCameraBehavior()
    }));

    useEffect(() => {
        if (scenes.currentScene === 'explosion' && scenes.previousScene === 'landscape') {
            behavior.current = 'radial';
            setCameraPosition({
                position: cameraSettings.explosion,
                lokAtArray: cameraSettings.lookAtStars,
                onRest: () => setCameraPosition({
                    position: cameraSettings.explosion,
                    lokAtArray: cameraSettings.lookAtCenter,
                    onRest: () => setCameraBehavior()
                })
            })
        }
        console.log(camera)
    })

    useFrame(() => {
        if (behavior.current === 'radial') {
            rotation.current += 0.001;
            camera.position.x = cameraSettings.explosion[0] + Math.sin(rotation.current) * 10;
            camera.position.z = cameraSettings.explosion[2] + Math.cos(rotation.current) * 30;
            camera.lookAt(...lokAtArray.get() as  Vector3Type)
        }

    })

    // @ts-ignore
    return <animated.perspectiveCamera ref={ref} position={position}/>
}

export default MainCamera