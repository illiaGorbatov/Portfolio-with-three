import React, {useEffect, useRef} from "react";
import {useFrame, useThree} from "react-three-fiber";
import {animated, useSpring} from "react-spring/three";
import {
    Vector3Type,
    MAIN_SCENE_STATIC,
    PROJECTS_STATIC,
    PROJECTS_SCROLLING,
    CLOSE_LOOK, TRANSITION_FROM_MAIN_TO_PROJECTS, TRANSITION_TO_INFO
} from "../../utils/StringVariablesAndTypes";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {actions} from "../../store/InterfaceReducer";

const cameraPosition = {
    mainDisplay: [0, 0, -300] as Vector3Type,
    staticProjects: [0, 0, 15] as Vector3Type,
    scrollProjects: [0, 0, 35] as Vector3Type,
    closeLook: [-10, -8, -100] as Vector3Type,
    aboutMe: [0, 0, -240] as Vector3Type
};


const ControlCamera: React.FC = () => {

    const cameraState = useSelector((state: AppStateType) => state.interface.cameraState, shallowEqual);

    const dispatch = useDispatch();

    const ref = useRef();
    const {setDefaultCamera, camera} = useThree();
    // Make the camera known to the system
    useEffect(() => void setDefaultCamera(ref.current!), []);

    // camera state

    const [{position}, setCameraPosition] = useSpring(() => ({
        position: cameraPosition.mainDisplay,
        fov: 50,
        config: {
            tension: 100, friction: 25, clamp: true
        }
    }));

    useEffect(() => {
        if (cameraState === MAIN_SCENE_STATIC) setCameraPosition({position: cameraPosition.mainDisplay});
        if (cameraState === PROJECTS_STATIC) setCameraPosition({position: cameraPosition.staticProjects});
        if (cameraState === PROJECTS_SCROLLING) setCameraPosition({
            position: cameraPosition.scrollProjects,
            fov: 80,
            onRest: () => setCameraPosition({fov: 50})
        });
        if (cameraState === CLOSE_LOOK) setCameraPosition({
            position: cameraPosition.closeLook,
            config: {
                mass: 100,
                tension: 400,
                friction: 400,
                clamp: true,
            }
        });
        if (cameraState === TRANSITION_FROM_MAIN_TO_PROJECTS) setCameraPosition({
            position: cameraPosition.staticProjects,
            config: {
                mass: 100,
                tension: 400,
                friction: 400,
                clamp: true,
            }
        }).then(() => {
            dispatch(actions.setMainPageState(false));
            dispatch(actions.setProjectsAvailability(true))
        });
        if( cameraState === TRANSITION_TO_INFO) setCameraPosition({
            position: cameraPosition.aboutMe,
            config: {
                mass: 100,
                tension: 400,
                friction: 400,
                clamp: true,
            }
        })
    }, [cameraState]);

    // @ts-ignore
    return <animated.perspectiveCamera ref={ref} position={position}/>
}

export default React.memo(ControlCamera)