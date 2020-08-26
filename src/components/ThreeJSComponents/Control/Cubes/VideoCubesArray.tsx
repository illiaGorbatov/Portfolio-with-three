import React, {useMemo, useEffect, useState} from "react";
import * as THREE from 'three';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../store/store";
import {Vector3Type} from "../../../../utils/StringVariablesAndTypes";
import {useSprings, animated} from "react-spring/three";
import {actions} from "../../../../store/InterfaceReducer";


const change_uvs = (geometry: THREE.BoxBufferGeometry, unitX: number, unitY: number, offsetX: number, offsetY: number) => {
    let uvs = geometry.attributes.uv.array;
    for (let i = 0; i < uvs.length; i += 2) {
        // @ts-ignore
        uvs[i] = (uvs[i] + offsetX) * unitX;
        // @ts-ignore
        uvs[i + 1] = (uvs[i + 1] + offsetY) * unitY;
    }
};

const xGrid = 4, yGrid = 5;

const ux = 1 / xGrid;
const uy = 1 / yGrid;

const xSize = 58.3 / xGrid;
const ySize = 31.7 / yGrid;

const VideoCubesArray: React.FC = () => {

    const videos = useSelector((state: AppStateType) => state.interface.videos, shallowEqual);
    const isMainPageFocused = useSelector((state: AppStateType) => state.interface.isMainPageFocused, shallowEqual);
    const project = useSelector((state: AppStateType) => state.interface.currentlyLookedProject, shallowEqual);
    const isProjectsAvailable = useSelector((state: AppStateType) => state.interface.isProjectsAvailable, shallowEqual);

    const dispatch = useDispatch();

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

    const ordinaryMaterial = useMemo(() => new THREE.MeshStandardMaterial({color: "#333", roughness: 0.7}), []);

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
            const x = Math.random() * 35 - 17.5;
            const y = Math.random() * 16 - 8;
            const z = i * zDistance + 0.7 * zDistance * Math.random();
            positions.push([x, y, z])
        }
        return positions
    }, []);

    const rotationDirections = useMemo(() => {
        const rotationArray = []
        for (let i = 0; i < xGrid * yGrid; i++) {
            rotationArray.push([Math.PI*Math.random(), Math.PI*Math.random(), Math.PI*Math.random()])
        }
        return rotationArray
    }, [])

    const [animation, setAnimation] = useSprings(xGrid * yGrid, i => ({
        position: [0, 0, 170],
        scale: [0.3, 0.3, 0.3],
        rotation: rotationDirections[i],
        config: {
            mass: 100,
            tension: 400,
            friction: 400,
            clamp: true,
        }
    }));

    const [isVideoReadyToPlay, setReadyState] = useState<boolean>(false);

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
                position: projectsObservationPositions[i],
                scale: [0.3, 0.3, 0.3],
            })).then(() => {
                if (!isProjectsAvailable) dispatch(actions.setProjectsAvailability(true))
                if (isVideoReadyToPlay) setReadyState(false);
                setAnimation(i => ({
                    from: {rotation: rotationDirections[i]},
                    to: {rotation: rotationDirections[i].map(item => item + 2*Math.PI)},
                    loop: true,
                    config: {duration: 20000}
                }))
            })
        }
        if (isMainPageFocused) {
            setAnimation(i => ({
                cancel: true
            }));
            setAnimation(i => ({
                position: [0, 0, 170],
                rotation: rotationDirections[i],
                delay: 300
            })).then(() => dispatch(actions.setCrystalExplosionState(false)))
        }
    }, [project, isMainPageFocused]);

    console.log(isVideoReadyToPlay)

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

export default VideoCubesArray