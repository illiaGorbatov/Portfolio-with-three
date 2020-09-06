import React, {useEffect, useMemo} from "react";
import * as THREE from 'three';
import {shallowEqual, useSelector} from "react-redux";
import {AppStateType} from "../../../../store/store";
import {
    GEOMETRIES_TRANSITION_FROM_ABOUT_SECTION,
    GEOMETRIES_TRANSITION_FROM_CLOSE_LOOK,
    GEOMETRIES_TRANSITION_TO_ABOUT_SECTION,
    GEOMETRIES_TRANSITION_TO_CLOSE_LOOK,
    Vector3Type
} from "../../../../utils/StringVariablesAndTypes";
import {animated, config, useSprings} from "react-spring/three";


const xGrid = 5, yGrid = 5;
const xSize = 19.2 / xGrid;
const ySize = 12.8 / yGrid;

const AnimatedCubes: React.FC = () => {

    const transition = useSelector((state: AppStateType) => state.interface.geometriesTransition, shallowEqual);

    const closeLookPositions = useMemo(() => {
        let positions: Vector3Type[] = [];
        for (let i = 0; i < xGrid; i++)
            for (let j = 0; j < yGrid; j++) {
                const position: Vector3Type = [
                    (i - xGrid / 2) * xSize,
                    (j - yGrid / 2) * ySize + 2,
                    30 - Math.random() * 2 + 310
                ];
                positions.push(position)
            }
        return positions
    }, []);

    const projectsObservationPositions = useMemo(() => {
        const zDistance = -160 / (xGrid * yGrid);
        let positions: Vector3Type[] = [];
        for (let i = 0; i < xGrid * yGrid; i++) {
            const x = Math.random() * 20 - 10;
            const y = Math.random() * 13 - 6.5;
            const z = i * zDistance + 0.7 * zDistance * Math.random() + 310;
            positions.push([x, y, z])
        }
        return positions
    }, []);

    const {positionsInAstralPlane, scaleInAstralPlane} = useMemo(() => {
        let positionsInAstralPlane: Vector3Type[] = [];
        let scaleInAstralPlane: Vector3Type[] = [];
        for (let i = 1; i <= xGrid * yGrid; i++) {
            const row = i % 5;
            const column = Math.ceil(i / 5) - 1;
            const x = THREE.MathUtils.lerp(-28.75, 28.75, row / 4);
            const z = THREE.MathUtils.lerp(-29, 29, column / 4);
            positionsInAstralPlane.push([x, -200, z]);

            const scaleX = Math.random() * 4 + (column === 2 && row === 2 ? 95 :
                (row === 0 || row === 4) || (column === 0 || column === 4) ? 65 : 80);
            const scaleY = 5 + Math.random();
            const scaleZ = 5 + Math.random();
            scaleInAstralPlane.push([scaleX, scaleY, scaleZ])
        }
        return {positionsInAstralPlane, scaleInAstralPlane}
    }, []);

    const rotationDirections = useMemo(() => {
        const rotationArray = []
        for (let i = 0; i < xGrid * yGrid; i++) {
            rotationArray.push([Math.PI * Math.random(), Math.PI * Math.random(), Math.PI * Math.random()])
        }
        return rotationArray
    }, []);

    const [animation, setAnimation] = useSprings(xGrid * yGrid, i => ({
        position: projectsObservationPositions[i],
        scale: [0.7, 0.7, 0.7],
        rotation: rotationDirections[i],
        config: {
            mass: 100,
            tension: 400,
            friction: 400,
            clamp: true,
        }
    }));

    useEffect(() => {
        if (transition === GEOMETRIES_TRANSITION_TO_ABOUT_SECTION) {
            setAnimation(i => ({
                cancel: true,
                loop: false
            })).then(() => setAnimation(i => ({
                to: async (next) => {
                    await next({
                        position: [projectsObservationPositions[i][0], projectsObservationPositions[i][1], 50],
                        config: config.default,
                        delay: 300
                    });
                    await next({
                        position: positionsInAstralPlane[i],
                        rotation: [0, 0, Math.PI / 2],
                        scale: [0.3, scaleInAstralPlane[i][1], scaleInAstralPlane[i][2]],
                        immediate: true
                    });
                    await next({
                        scale: scaleInAstralPlane[i],
                    });
                }
            }))).then(() => setAnimation(i => {
                const row = (i + 1) % 5;
                const column = Math.ceil((i + 1) / 5) - 1;
                if (row === 2 && column === 2) return {to: false};

                const scaleX = scaleInAstralPlane[i][0] + Math.random() * 8;

                return {
                    to: async (next) => {
                        await next({
                            scale: [scaleInAstralPlane[i][0], scaleInAstralPlane[i][1], scaleInAstralPlane[i][2]],
                            config: {duration: 1600 + Math.random() * 2000},
                            delay: 500 + Math.random() * 1000,

                        });
                        await next({
                            scale: [scaleX, scaleInAstralPlane[i][1], scaleInAstralPlane[i][2]],
                            config: {duration: 1600 + Math.random() * 2000},
                            delay: Math.random() * 500
                        });
                    },
                    loop: true,
                }
            }))
        }
        if (transition === GEOMETRIES_TRANSITION_FROM_CLOSE_LOOK) {
            setAnimation(i => ({
                cancel: true,
                loop: false
            })).then(() => setAnimation(i => ({
                position: projectsObservationPositions[i],
                scale: [0.7, 0.7, 0.7],
                rotation: rotationDirections[i],
                config: {
                    tension: 90,
                    friction: 45
                },
            }))).then(() => setAnimation(i => {
                return {
                    to: async next => {
                        await next({rotation: rotationDirections[i]})
                        await next({rotation: rotationDirections[i].map(item => item + 2 * Math.PI)})
                        await next({rotation: rotationDirections[i], immediate: true})
                    },
                    loop: true,
                    config: (prop) =>
                        prop === 'rotation' ? {duration: 10000} : {}
                }
            }))
        }
        if (transition === GEOMETRIES_TRANSITION_FROM_ABOUT_SECTION) {
            setAnimation(i => ({
                cancel: true,
                loop: false
            })).then(() => setAnimation(i => ({
                scale: [0.7, scaleInAstralPlane[i][1], scaleInAstralPlane[i][2]],
                config: config.default
            }))).then(() => setAnimation(i => ({
                scale: [0.7, 0.7, 0.7],
                config: config.default
            }))).then(() => setAnimation(i => ({
                to: async (next) => {
                    await next({
                        position: [projectsObservationPositions[i][0], projectsObservationPositions[i][1], 0],
                        scale: [0.7, 0.7, 0.7],
                        rotation: rotationDirections[i],
                        config: {duration: 400 + Math.random() * 300}
                    });
                    await next({
                        position: projectsObservationPositions[i],
                        rotation: rotationDirections[i],
                        config: {
                            mass: 1,
                            tension: 150,
                            friction: 40
                        }
                    });
                }
            }))).then(() => setAnimation(i => {
                return {
                    to: async next => {
                        await next({rotation: rotationDirections[i]})
                        await next({rotation: rotationDirections[i].map(item => item + 2 * Math.PI)})
                        await next({rotation: rotationDirections[i], immediate: true})
                    },
                    loop: true,
                    config: (prop) =>
                        prop === 'rotation' ? {duration: 10000} : {}
                }
            }))
        }
        if (transition === GEOMETRIES_TRANSITION_TO_CLOSE_LOOK) {
            setAnimation(i => ({
                cancel: true,
                loop: false
            })).then(() => setAnimation(i => ({
                position: closeLookPositions[i],
                scale: [1, 1, 1],
                rotation: [0, 0, 0],
                config: (prop) =>
                    prop === 'rotation' ? {
                        mass: 1,
                        tension: 100,
                        friction: 40 + (xGrid * yGrid - i),
                        clamp: true,
                    } : {
                        mass: 1,
                        tension: 170,
                        friction: 30,
                        clamp: true,
                    },
                delay: (prop) =>
                    prop === 'rotation' ? 0 : 1000 + (xGrid * yGrid - i) * 100
            }))).then(() => {
                setAnimation(i => {
                    return {
                        to: async (next) => {
                            await next({
                                position: [closeLookPositions[i][0], closeLookPositions[i][1], closeLookPositions[i][2] + Math.random() * 3],
                                config: {duration: 200 + Math.random() * 300},
                                delay: Math.random() * 500
                            });
                            await next({
                                position: [closeLookPositions[i][0], closeLookPositions[i][1], closeLookPositions[i][2] + Math.random() * 3],
                                config: {duration: 200 + Math.random() * 300},
                                delay: Math.random() * 500
                            })
                        },
                        loop: true
                    }
                })
            });
        }
        if (transition === null) {
            setAnimation(i => {
                return {
                    to: async next => {
                        await next({rotation: rotationDirections[i]});
                        await next({rotation: rotationDirections[i].map(item => item + 2 * Math.PI)});
                        await next({rotation: rotationDirections[i], immediate: true});
                    },
                    loop: true,
                    config: (prop) =>
                        prop === 'rotation' ? {duration: 10000} : {}
                }
            })
        }
    }, [transition, setAnimation, closeLookPositions, positionsInAstralPlane, rotationDirections,
        scaleInAstralPlane, projectsObservationPositions]);

    return (
        <>
            {animation.map(({scale, position, rotation}, i) =>
                <animated.mesh key={i} position={position as unknown as Vector3Type} castShadow receiveShadow
                               scale={scale as unknown as Vector3Type}
                               rotation={rotation as unknown as Vector3Type}>
                    <boxBufferGeometry attach="geometry" args={[xSize, ySize, ySize, 5, 5, 5]}/>
                    <meshStandardMaterial attach="material" color="#6a040f" roughness={0.7}
                                          shadowSide={THREE.FrontSide}/>
                </animated.mesh>
            )}
        </>
    )
}

export default React.memo(AnimatedCubes)