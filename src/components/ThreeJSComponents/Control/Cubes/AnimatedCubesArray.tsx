import React, {useEffect, useMemo, useRef} from "react";
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

const AnimatedCubesArray: React.FC = () => {

    const transition = useSelector((state: AppStateType) => state.interface.geometriesTransition, shallowEqual);

    const closeLookPositions = useMemo(() => {
        let positions: Vector3Type[] = [];
        for (let i = 0; i < xGrid; i++)
            for (let j = 0; j < yGrid; j++) {
                const position: Vector3Type = [
                    (i - xGrid / 2) * xSize,
                    (j - yGrid / 2) * ySize + 2,
                    30 - Math.random()*2
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
            const z = i * zDistance + 0.7 * zDistance * Math.random();
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
            const z = THREE.MathUtils.lerp(-431.25, -488.75, column / 4);
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

    const cancelsForAnimations = useRef<(() => void)[]>([]);

    useEffect(() => {
        if (transition === GEOMETRIES_TRANSITION_TO_ABOUT_SECTION) {
            cancelsForAnimations.current.forEach(cancel => cancel());
            cancelsForAnimations.current = [];
            setAnimation(i => ({
                cancel: true
            })).then(() => setAnimation(i => ({
                to: async (next) => {
                    await next({
                        position: [projectsObservationPositions[i][0],projectsObservationPositions[i][1], -170],
                        config: {duration: 400 + Math.random()*300}
                    });
                    await next({
                        position: [i, -100, -200],
                        rotation: [0, 0, Math.PI / 2],
                        config: config.default
                    });
                    await next({
                        position: positionsInAstralPlane[i],
                        immediate: true
                    });
                    await next({
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

                let cancelled = false;
                const cancel = () => cancelled = true;
                cancelsForAnimations.current.push(cancel)

                return {
                    to: async (next) => {
                        !cancelled && await next({
                            scale: [scaleInAstralPlane[i][0], scaleInAstralPlane[i][1], scaleInAstralPlane[i][2]],
                            config: {duration: 1600 + Math.random() * 2000},
                            delay: 500 + Math.random() * 1000,

                        });
                        !cancelled && await next({
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
            cancelsForAnimations.current.forEach(cancel => cancel());
            cancelsForAnimations.current = [];
            setAnimation(i => ({
                cancel: true,
            })).then(() => setAnimation(i => ({
                position: projectsObservationPositions[i],
                scale: [0.7, 0.7, 0.7],
                rotation: rotationDirections[i],
            }))).then(() => setAnimation(i => {
                let cancelled = false;
                const cancel = () => cancelled = true;
                cancelsForAnimations.current.push(cancel)
                return {
                    to: async next => {
                        !cancelled && await next ({rotation: rotationDirections[i]})
                        !cancelled && await next ({rotation: rotationDirections[i].map(item => item + 2*Math.PI)})
                        !cancelled && await next ({rotation: rotationDirections[i], immediate: true})
                    },
                    loop: true,
                    config: (prop) =>
                        prop === 'rotation' ? {duration: 10000} : {}
                }
            }))
        }
        if (transition === GEOMETRIES_TRANSITION_FROM_ABOUT_SECTION) {
            cancelsForAnimations.current.forEach(cancel => cancel());
            cancelsForAnimations.current = [];
            setAnimation(i => ({
                cancel: true,
            })).then(() => setAnimation(i => ({
                scale: [0.7, scaleInAstralPlane[i][1], scaleInAstralPlane[i][2]],
                config: config.default
            }))).then(() => setAnimation(i => ({
                scale: [0.7, 0.7, 0.7],
                config: config.default
            }))).then(() => setAnimation(i => ({
                to: async (next) => {
                    await next({
                        position: [projectsObservationPositions[i][0], projectsObservationPositions[i][1], -170],
                        scale: [0.7, 0.7, 0.7],
                        rotation: rotationDirections[i],
                        config: {duration: 400 + Math.random() * 300}
                    });
                    await next({
                        position: projectsObservationPositions[i],
                        config: {duration: 400 + Math.random() * 300}
                    });
                }
            }))).then(() => setAnimation(i => ({
                position: projectsObservationPositions[i],
                rotation: rotationDirections[i],
            }))).then(() => setAnimation(i => {
                let cancelled = false;
                const cancel = () => cancelled = true;
                cancelsForAnimations.current.push(cancel)
                return {
                    to: async next => {
                        !cancelled && await next ({rotation: rotationDirections[i]})
                        !cancelled && await next ({rotation: rotationDirections[i].map(item => item + 2*Math.PI)})
                        !cancelled && await next ({rotation: rotationDirections[i], immediate: true})
                    },
                    loop: true,
                    config: (prop) =>
                        prop === 'rotation' ? {duration: 10000} : {}
                }
            }))
        }
        if (transition === GEOMETRIES_TRANSITION_TO_CLOSE_LOOK) {
            cancelsForAnimations.current.forEach(cancel => cancel());
            cancelsForAnimations.current = [];
            setAnimation(i => ({
                cancel: true
            })).then(() => setAnimation(i => ({
                position: closeLookPositions[i],
                scale: [1, 1, 1],
                rotation: [0, 0, 0],
                config: (prop) =>
                    prop !== 'rotation' ? {
                        mass: 1,
                        tension: 214,
                        friction: 120,
                        clamp: true,
                    } : {
                        mass: 1,
                        tension: 70 + 50 * Math.random(),
                        friction: 40,
                        clamp: true,
                    }
            }))).then(() => {

                setAnimation(i => ({
                    to: async (next) => {
                        let cancelled = false;
                        const cancel = () => cancelled = true;
                        cancelsForAnimations.current.push(cancel)
                        !cancelled && await next({
                            position: [closeLookPositions[i][0], closeLookPositions[i][1], closeLookPositions[i][2] + Math.random()*3],
                            config: {duration: 200 + Math.random() * 300},
                            delay: Math.random() * 500
                        });
                        !cancelled && await next({
                            position: [closeLookPositions[i][0], closeLookPositions[i][1], closeLookPositions[i][2] +Math.random()*3],
                            config: {duration: 200 + Math.random() * 300},
                            delay: Math.random() * 500
                        })
                    },
                    loop: true
                }))
            });
        }
        if (transition === null) {
            setAnimation(i => {
                let cancelled = false;
                const cancel = () => cancelled = true;
                cancelsForAnimations.current.push(cancel)
                return {
                    to: async next => {
                        !cancelled && await next ({rotation: rotationDirections[i]})
                        !cancelled && await next ({rotation: rotationDirections[i].map(item => item + 2*Math.PI)})
                        !cancelled && await next ({rotation: rotationDirections[i], immediate: true})
                    },
                    loop: true,
                    config: (prop) =>
                        prop === 'rotation' ? {duration: 10000} : {}
                }
            })
        }
    }, [transition]);

    return (
        <>
            {animation.map(({scale, position, rotation}, i) =>
                <animated.mesh key={i} position={position as unknown as Vector3Type} castShadow receiveShadow
                               scale={scale as unknown as Vector3Type}
                               rotation={rotation as unknown as Vector3Type}>
                    <boxBufferGeometry attach="geometry" args={[xSize, ySize, ySize, 5, 5, 5]}/>
                    <meshStandardMaterial attach="material" color="#6a040f" roughness={0.7} shadowSide={THREE.FrontSide}/>
                </animated.mesh>
            )}
        </>
    )
}

export default React.memo(AnimatedCubesArray)