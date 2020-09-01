import React, {useEffect, useRef, useState} from "react";
import * as THREE from 'three';
import {useFrame, useThree} from "react-three-fiber";
import {animated, useSpring} from "react-spring/three";
import {
    Vector3Type,
    MAIN_SCENE_STATIC,
    PROJECTS_STATIC,
    PROJECTS_SCROLLING,
    CLOSE_LOOK,
    TRANSITION_FROM_MAIN_TO_PROJECTS,
    TRANSITION_ABOUT_SECTION,
    TRANSITION_FROM_ABOUT_SECTION_TO_PROJECTS_STATIC,
    RETURNING_FROM_CLOSE_LOOK
} from "../../utils/StringVariablesAndTypes";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {actions} from "../../store/InterfaceReducer";

export const cameraPosition = {
    mainDisplay: [0, 0, -300] as Vector3Type,
    staticProjects: [0, 0, 15] as Vector3Type,
    scrollProjects: [0, 0, 35] as Vector3Type,
    closeLook: [-10, 5, 65] as Vector3Type,
    aboutMe: [0, 0, -240] as Vector3Type
};

const cameraLookAt = {
    ordinaryPos: [0, 0, -500],
    lookAtProject: [10, 0, 0]
}


const ControlCamera: React.FC = () => {

    const cameraState = useSelector((state: AppStateType) => state.interface.cameraState, shallowEqual);

    const dispatch = useDispatch();

    const ref = useRef(new THREE.PerspectiveCamera());
    const {setDefaultCamera, camera} = useThree();

    useEffect(() => {
        setDefaultCamera(ref.current!);
    }, []);

    const [{position, lookAt}, setCameraPosition] = useSpring(() => ({
        position: cameraPosition.mainDisplay,
        fov: 50,
        lookAt: cameraLookAt.ordinaryPos,
        config: {
            tension: 100, friction: 25, clamp: true
        }
    }));

    useEffect(() => {
        if (cameraState === MAIN_SCENE_STATIC) {
            setCameraPosition({position: cameraPosition.mainDisplay});
            setTimeout(() => dispatch(actions.setCrystalExplosionState(false)), 300)
        }
        if (cameraState === PROJECTS_STATIC) setCameraPosition({position: cameraPosition.staticProjects});
        if (cameraState === PROJECTS_SCROLLING) setCameraPosition({
            position: cameraPosition.scrollProjects,
            fov: 80,
            onRest: () => setCameraPosition({fov: 50})
        });
        if (cameraState === CLOSE_LOOK) setCameraPosition({
            position: cameraPosition.closeLook,
            lookAt: cameraLookAt.lookAtProject,
            config: {
                mass: 100,
                tension: 300,
                friction: 300,
                clamp: true,
            }
        }).then(() => {
            dispatch(actions.setVideoPlayerState(true));
            dispatch(actions.setInterfaceAvailability(true))
        });
        if (cameraState === RETURNING_FROM_CLOSE_LOOK) setCameraPosition({
            position: cameraPosition.staticProjects,
            lookAt: cameraLookAt.ordinaryPos,
            config: {
                mass: 100,
                tension: 400,
                friction: 400,
                clamp: true,
            }
        }).then(() => dispatch(actions.setInterfaceAvailability(true)));
        if (cameraState === TRANSITION_FROM_MAIN_TO_PROJECTS) setCameraPosition({
            position: cameraPosition.staticProjects,
            config: {
                mass: 100,
                tension: 400,
                friction: 400,
                clamp: true,
            }
        }).then(() => {
            dispatch(actions.setInterfaceAvailability(true));
            dispatch(actions.setMainPageState(false))
        });
        if (cameraState === TRANSITION_ABOUT_SECTION) {
            setCameraPosition({
                position: cameraPosition.aboutMe,
                config: {
                    mass: 100,
                    tension: 400,
                    friction: 400,
                    clamp: true,
                }
            }).then(() => dispatch(actions.setInterfaceAvailability(true)));
            setTimeout(() => dispatch(actions.setCrystalExplosionState(false)), 300)
        }
        if (cameraState === TRANSITION_FROM_ABOUT_SECTION_TO_PROJECTS_STATIC) {
            setCameraPosition({position: cameraPosition.staticProjects})
                .then(() => dispatch(actions.setInterfaceAvailability(true)))
            setTimeout(() => dispatch(actions.setCrystalExplosionState(true)), 300)
        }
        console.log(cameraState)
    }, [cameraState]);

    useFrame(() => {
        camera.lookAt(...lookAt.get() as Vector3Type)
    })

    // @ts-ignore
    return <animated.perspectiveCamera ref={ref} position={position}/>
}

export default React.memo(ControlCamera)