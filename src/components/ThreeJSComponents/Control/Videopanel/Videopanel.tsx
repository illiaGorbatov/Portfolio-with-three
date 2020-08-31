import React, {useEffect, useMemo, useRef} from "react";
import * as THREE from 'three';
import {shallowEqual, useSelector} from "react-redux";
import {AppStateType} from "../../../../store/store";
import {animated, useSpring} from "react-spring/three";
import {Vector3Type} from "../../../../utils/StringVariablesAndTypes";
import VideoPlaneLight from "./VideoPlaneLight";
import {useFrame} from "react-three-fiber";


const VideoPanel: React.FC = () => {

    const videos = useSelector((state: AppStateType) => state.interface.videos, shallowEqual);
    const project = useSelector((state: AppStateType) => state.interface.currentlyLookedProject, shallowEqual);
    const videoPlayerState = useSelector((state: AppStateType) => state.interface.videoPlayerState, shallowEqual);

    const ref = useRef<THREE.Group>(new THREE.Group());

    const videoMaterial = useMemo(() => {
        if (project !== null) {
            const texture = new THREE.VideoTexture(videos.find(item => item.projectIndex === project)!.video);
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.format = THREE.RGBFormat;
            const material = new THREE.MeshBasicMaterial({color: 0xffffff, map: texture});
            material.transparent = false;
            return material
        } else return new THREE.MeshBasicMaterial({color: 0xffffff})
    }, [project]);

    const [{position}, setAnimation] = useSpring(() => ({
        position: [80, 0, -150]
    }));

    useEffect(() => {
        console.log(videoPlayerState)
        if (videoPlayerState && project !== null) {
            setAnimation({position: [0, 0, -130]})
            videos[project].video.play()
        }
    }, [videoPlayerState]);

    useFrame(() => {
        ref.current.lookAt(...[-10, -8, -100] as Vector3Type)
    })

    return (
        <animated.group position={position as unknown as Vector3Type} ref={ref}>
            <VideoPlaneLight/>
            <mesh material={videoMaterial}>
                <planeBufferGeometry attach="geometry" args={[20, 10]}/>
            </mesh>
        </animated.group>
    )
}

export default React.memo(VideoPanel)