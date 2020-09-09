import React, {useEffect} from 'react';
import Pyramid from "./Pyramid";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../store/store";
import Background from "./Background";
import AnimatedCubes from "./AnimatedCubes";
import {animated, useSpring} from 'react-spring/three';
import {
    GEOMETRIES_TRANSITION_FROM_ABOUT_SECTION,
    GEOMETRIES_TRANSITION_FROM_MAIN_PAGE,
    GEOMETRIES_TRANSITION_TO_ABOUT_SECTION,
    GEOMETRIES_TRANSITION_TO_MAIN_PAGE,
    Vector3Type
} from "../../../../utils/StringVariablesAndTypes";
import Crystal from "../../Explosion/Crystal";
import Sun from "../Lights/Sun";
import {actions} from "../../../../store/InterfaceReducer";

const AstralPlaneContainer: React.FC = () => {

    const project = useSelector((state: AppStateType) => state.interface.currentlyLookedProject, shallowEqual);
    const scrollsCount = useSelector((state: AppStateType) => state.interface.scrollsCount, shallowEqual);
    const geometriesTransition = useSelector((state: AppStateType) => state.interface.geometriesTransition, shallowEqual);
    const isInterfaceAvailable = useSelector((state: AppStateType) => state.interface.isInterfaceAvailable, shallowEqual);

    const dispatch = useDispatch();

    //group rotation
    const [{position, rotation}, setSpring] = useSpring(() => ({
        position: [0, 0, -310],
        rotation: [0, 0, 0],
    }));

    useEffect(() => {
        if (geometriesTransition === GEOMETRIES_TRANSITION_TO_ABOUT_SECTION && isInterfaceAvailable) {
            setSpring({
                position: [30, 0, -310]
            }).then(() => setSpring(() => {
                return {
                    to: async next => {
                        await next({
                            rotation: [0, 2 * Math.PI, 0],
                            config: {
                                duration: 20000
                            }
                        })
                        await next({rotation: [0, 0, 0], immediate: true})
                    },
                    loop: true
                }
            }))
        }
        if (geometriesTransition === GEOMETRIES_TRANSITION_FROM_ABOUT_SECTION) {
            setSpring({
                cancel: true,
                loop: false
            }).then(() => setSpring({
                position: [0, 0, -310],
                rotation: [0, 0, 0],
                config: {
                    mass: 1,
                    tension: 170,
                    friction: 30,
                    clamp: true,
                    duration: undefined
                }
            }))
        }
    }, [isInterfaceAvailable, geometriesTransition, setSpring]);

    //elements orchestra
    const [{progress, scale, color, intensity, distance, pyramidPosition}, setAnimation] = useSpring(() => ({
        progress: 0,
        scale: [0.1, 0.1, 0.1],
        color: '#000B11',
        intensity: 1,
        pyramidPosition: [0, 200, 0],
        distance: 500
    }));

    useEffect(() => {
        setAnimation({distance: project === null ? 500 : 300})
    }, [project, setAnimation])

    useEffect(() => {
        if (geometriesTransition === null) {
            setAnimation({
                to: async next => {
                    await next({
                        progress: 0.035,
                        delay: 1200,
                        config: {tension: 200, friction: 20}
                    });
                    await next({
                        progress: 0,
                        config: {tension: 200, friction: 25}
                    });
                    await next({
                        progress: 0.03,
                        config: {tension: 200, friction: 20}
                    });
                    await next({
                        progress: 0,
                        config: {tension: 200, friction: 40}
                    });
                },
                loop: true
            })
        }
        if (geometriesTransition === GEOMETRIES_TRANSITION_TO_MAIN_PAGE) {
            setAnimation(i => ({
                cancel: true,
                loop: false
            })).then(() => setAnimation({
                progress: 0,
                scale: [0.1, 0.1, 0.1],
                config: (prop) => prop === 'progress' ?
                    {tension: 150, friction: 40} : {mass: 1, tension: 200, friction: 30, clamp: true},
                delay: (prop) => prop === 'progress' ? 300 : 0,
            })).then(() => setAnimation({
                to: async next => {
                    await next({
                        progress: 0.035,
                        delay: 1200,
                        config: {tension: 200, friction: 20}
                    });
                    await next({
                        progress: 0,
                        config: {tension: 200, friction: 25}
                    });
                    await next({
                        progress: 0.03,
                        config: {tension: 200, friction: 20}
                    });
                    await next({
                        progress: 0,
                        config: {tension: 200, friction: 40}
                    });
                },
                loop: true
            }))
        }
        if (geometriesTransition === GEOMETRIES_TRANSITION_FROM_ABOUT_SECTION ||
            geometriesTransition === GEOMETRIES_TRANSITION_FROM_MAIN_PAGE) {
            setAnimation(i => ({
                cancel: true,
                loop: false
            })).then(() => setAnimation(i => ({
                progress: 0
            }))).then(() => setAnimation({
                progress: 2,
                pyramidPosition: [0, 200, 0],
                intensity: 1,
                distance: 500,
                scale: [15, 15, 15],
                config: (prop) => prop === 'progress' ?
                    {tension: 150, friction: 40} : {mass: 100, tension: 400, friction: 400, clamp: true},
                delay: (prop) => prop === 'scale' ? 300 : 0,
                onRest: () => dispatch(actions.setMainPageState(false))
            }))
        }
        if (geometriesTransition === GEOMETRIES_TRANSITION_TO_ABOUT_SECTION) {
            setAnimation({
                scale: [0.1, 0.1, 0.1],
                progress: 0,
                distance: 200,
                pyramidPosition: [0, 70, 0],
                intensity: 0.05,
                config: (prop) => prop === 'progress' ?
                    {tension: 150, friction: 40} : {mass: 1, tension: 200, friction: 30, clamp: true},
                delay: (prop) => prop === 'scale' ? 1000 : 1200
            }).then(() => setAnimation({
                to: async next => {
                    await next({
                        scale: [2, 2, 2],
                        progress: 0.5,
                        intensity: 2,
                        distance: 500,
                        config: {tension: 280, friction: 60, clamp: true}
                    })
                    await next({
                        scale: [0.1, 0.1, 0.1],
                        progress: 0,
                        intensity: 0.05,
                        distance: 200,
                        config: {tension: 280, friction: 100, clamp: true}
                    })
                },
                loop: true
            }))
        }
    }, [setAnimation, dispatch, geometriesTransition]);

    return (
        <animated.group position={position as unknown as Vector3Type} rotation={rotation as unknown as Vector3Type}>
            <AnimatedCubes/>
            <Background color={color}/>
            <Pyramid pyramidPosition={pyramidPosition}/>
            <Crystal progress={progress}/>
            <Sun scale={scale} intensity={intensity} distance={distance} scrollsCount={scrollsCount}/>
        </animated.group>
    )
}

export default React.memo(AstralPlaneContainer)