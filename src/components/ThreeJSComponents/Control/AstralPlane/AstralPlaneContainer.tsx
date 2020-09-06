import React, {useEffect} from 'react';
import Pyramid from "./Pyramid";
import {shallowEqual, useSelector} from "react-redux";
import {AppStateType} from "../../../../store/store";
import Background from "./Background";
import AnimatedCubes from "./AnimatedCubes";
import {animated, useSpring} from 'react-spring/three';
import {Vector3Type} from "../../../../utils/StringVariablesAndTypes";
import Crystal from "../../Explosion/Crystal";
import Lights from "../Lights/Lights";
import Sun from "../Lights/Sun";

const AstralPlaneContainer: React.FC = () => {

    const isAboutMenuOpened = useSelector((state: AppStateType) => state.interface.isAboutMenuOpened, shallowEqual);
    const isInterfaceAvailable = useSelector((state: AppStateType) => state.interface.isInterfaceAvailable, shallowEqual);

    const [{position, rotation}, setSpring] = useSpring(() => ({
        position: [0, 0, -310],
        rotation: [0, 0, 0],
    }));


    useEffect(() => {
        if (isAboutMenuOpened && isInterfaceAvailable) {
            setSpring({
                position: [20, 0, -310]
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
        if (!isAboutMenuOpened && !isInterfaceAvailable) {
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
    }, [isAboutMenuOpened, isInterfaceAvailable, setSpring]);

    return (
        <animated.group position={position as unknown as Vector3Type} rotation={rotation as unknown as Vector3Type}>
            <AnimatedCubes/>
            <Background opened={isAboutMenuOpened}/>
            <Pyramid opened={isAboutMenuOpened}/>
            <Crystal/>
            <Lights/>
            <Sun/>
        </animated.group>
    )
}

export default React.memo(AstralPlaneContainer)