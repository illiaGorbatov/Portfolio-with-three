import React, {useCallback, useEffect, useMemo, useState, useRef} from "react";
import * as THREE from 'three';
import {shallowEqual, useSelector} from "react-redux";
import {AppStateType} from "../../../../store/store";
import {Vector3Type} from "../../../../utils/StringVariablesAndTypes";
import {animated, useSprings, SpringStartFn} from "react-spring/three";
import {AnimationResult} from "@react-spring/core";


type AsyncResult<T = any> = Promise<AnimationResult<T>>

const change_uvs = (geometry: THREE.BoxBufferGeometry, unitX: number, unitY: number, offsetX: number, offsetY: number) => {
    let uvs = geometry.attributes.uv.array;
    for (let i = 0; i < uvs.length; i += 2) {
        // @ts-ignore
        uvs[i] = (uvs[i] + offsetX) * unitX;
        // @ts-ignore
        uvs[i + 1] = (uvs[i + 1] + offsetY) * unitY;
    }
};

const xGrid = 5, yGrid = 5;

const ux = 1 / xGrid;
const uy = 1 / yGrid;

const xSize = 58.3 / xGrid;
const ySize = 31.7 / yGrid;

const VideoCubesArray: React.FC = () => {

    const videos = useSelector((state: AppStateType) => state.interface.videos, shallowEqual);
    const isMainPageFocused = useSelector((state: AppStateType) => state.interface.isMainPageFocused, shallowEqual);
    const isAboutMenuOpened = useSelector((state: AppStateType) => state.interface.isAboutMenuOpened, shallowEqual);
    const project = useSelector((state: AppStateType) => state.interface.currentlyLookedProject, shallowEqual);

    const geometries = useMemo(() => {
        let geometries = [];
        for (let i = 0; i < xGrid; i++)
            for (let j = 0; j < yGrid; j++) {
                const ox = i;
                const oy = j;
                let geometry = new THREE.BoxBufferGeometry(xSize, ySize, ySize, 5, 5, 5);
                change_uvs(geometry, ux, uy, ox, oy);
                geometries.push(geometry)
            }
        return geometries
    }, []);

    const videoMaterial = useMemo(() => {
        if (project !== null) {
            const texture = new THREE.VideoTexture(videos.find(item => item.projectIndex === project)!.video);
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.format = THREE.RGBFormat;
            let materials = [];
            for (let i = 0; i < xGrid; i++)
                for (let j = 0; j < yGrid; j++) {
                    let material = new THREE.MeshBasicMaterial({color: 0xffffff, map: texture});
                    material.transparent = false;
                    material.depthWrite = true
                    materials.push(material)
                }
            return materials
        }
    }, [project]);

    const ordinaryMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: "#333",
        roughness: 0.7,
    }), []);

    const closeLookPositions = useMemo(() => {
        let positions: Vector3Type[] = [];
        for (let i = 0; i < xGrid; i++)
            for (let j = 0; j < yGrid; j++) {
                const position: Vector3Type = [
                    (i - xGrid / 2) * xSize,
                    (j - yGrid / 2) * ySize,
                    0
                ];
                positions.push(position)
            }
        return positions
    }, []);

    const projectsObservationPositions = useMemo(() => {
        const zDistance = (150 - 4) / (xGrid * yGrid);
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
            const z = THREE.MathUtils.lerp(-281.25, -338.75, column / 4);
            positionsInAstralPlane.push([x, -125, z]);
            console.log(row, column)
            const scaleX = Math.random() * 2 + (column === 2 && row === 2 ? 18 :
                (row === 0 || row === 4) || (column === 0 || column === 4) ? 8 : 12);
            const scaleY = 2.3 + Math.random() * 0.5;
            const scaleZ = 2.3 + Math.random() * 0.5;
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
        scale: [0.3, 0.3, 0.3],
        rotation: rotationDirections[i],
        config: {
            mass: 100,
            tension: 400,
            friction: 400,
            clamp: true,
        }
    }));

    const cancelsForAnimations = useRef<(() => void)[]>([]);
    const [isVideoReadyToPlay, setReadyState] = useState<boolean>(false);

    useEffect(() => {
        if (isAboutMenuOpened) {
            setAnimation(i => ({
                cancel: true
            })).then(() => setAnimation(i => ({
                to: async (next) => {
                    await next({
                        position: positionsInAstralPlane[i],
                        rotation: [0, 0, Math.PI / 2],
                        config: {
                            friction: 200,
                        }
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
                const scaleX = scaleInAstralPlane[i][0] + Math.random() * 2.5;
                const scaleY = scaleInAstralPlane[i][1] + Math.random() * 1.3;
                const scaleZ = scaleInAstralPlane[i][2] + Math.random() * 1.3;
                return {
                    to: async (next) => {
                        let cancelled = false;
                        const cancel = () => cancelled = true;
                        cancelsForAnimations.current.push(cancel)
                        !cancelled && await next({
                            scale: [scaleInAstralPlane[i][0], scaleInAstralPlane[i][1], scaleInAstralPlane[i][2]],
                            config: {duration: 1000},
                            delay: 300 + Math.random() * 500
                        });
                        !cancelled && await next({
                            scale: [scaleX,
                                scaleInAstralPlane[i][1],
                                scaleInAstralPlane[i][2]],
                            config: {duration: 800 + Math.random() * 2000},
                            delay: Math.random() * 500
                        });
                        !cancelled && await next({
                            scale: [scaleX,
                                scaleY,
                                scaleInAstralPlane[i][2]],
                            config: {duration: 500 + Math.random() * 500},
                            delay: Math.random() * 500
                        });
                        !cancelled && await next({
                            scale: [scaleX,
                                scaleY,
                                scaleZ],
                            config: {duration: 500 + Math.random() * 500},
                            delay: Math.random() * 500
                        });
                        !cancelled && await next({
                            scale: [scaleX,
                                scaleY,
                                scaleInAstralPlane[i][2]],
                            config: {duration: 500 + Math.random() * 500},
                            delay: Math.random() * 500
                        });
                        !cancelled && await next({
                            scale: [scaleX,
                                scaleInAstralPlane[i][1],
                                scaleInAstralPlane[i][2]],
                            config: {duration: 500 + Math.random() * 500},
                            delay: Math.random() * 500
                        });
                    },
                    loop: true,
                }
            }))
        }
        if (!isAboutMenuOpened && project === null) {
            cancelsForAnimations.current.forEach(cancel => cancel())
            setAnimation(i => ({
                cancel: true,
            })).then(() => !isAboutMenuOpened ? setAnimation(i => ({
                position: projectsObservationPositions[i],
                scale: [0.3, 0.3, 0.3],
                rotation: rotationDirections[i]
            })) : undefined).then(() => !isAboutMenuOpened && setAnimation(i => ({
                to: {rotation: rotationDirections[i].map(item => item + 2 * Math.PI)},
                loop: true,
                config: (prop) =>
                    prop === 'rotation' ? {duration: 20000} : {}
            })))
        }
        console.log(isAboutMenuOpened)
    }, [isAboutMenuOpened]);

    useEffect(() => {
        if (project !== null) {
            setAnimation(i => ({
                cancel: true
            })).then(() => setAnimation(i => ({
                position: closeLookPositions[i],
                scale: [1, 1, 1],
                rotation: [0, 0, 0],
                config: (prop) =>
                    prop !== 'rotation' ? {
                        mass: 100,
                        tension: 400,
                        friction: 400,
                        clamp: true,
                    } : {
                        mass: 1,
                        tension: 100,
                        friction: 40,
                        clamp: true,
                    }
            }))).then(() => {
                setReadyState(true);
                videos[project].video.play()
            });
        }
        if (!isMainPageFocused && project === null) {
            setAnimation(i => ({
                cancel: true
            })).then(() => !isAboutMenuOpened ? setAnimation(i => ({
                position: projectsObservationPositions[i],
                scale: [0.3, 0.3, 0.3],
                rotation: rotationDirections[i]
            })): undefined).then(() => {
                if (isVideoReadyToPlay) setReadyState(false);
                if (!isAboutMenuOpened) setAnimation(i => ({
                    to: {rotation: rotationDirections[i].map(item => item + 2 * Math.PI)},
                    loop: true,
                    config: (prop) =>
                        prop === 'rotation' ? {duration: 20000} : {}
                }))
            })
        }
        console.log(project, isMainPageFocused)
    }, [project, isMainPageFocused]);

    return (
        <group position={[0, 0, -150]}>
            {animation.map(({scale, position, rotation}, i) =>
                <animated.mesh key={i} position={position as unknown as Vector3Type} castShadow={true}
                               scale={scale as unknown as Vector3Type}
                               geometry={geometries[i]}
                               material={isVideoReadyToPlay ? videoMaterial![i] : ordinaryMaterial}
                               rotation={rotation as unknown as Vector3Type}/>
            )}
        </group>
    )
}

export default React.memo(VideoCubesArray)