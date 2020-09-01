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
        position: [80, 0, 100]
    }));

    const projectMemo = useRef<null | number>(null);

    useEffect(() => {
        if (videoPlayerState && project !== null) {
            setAnimation({position: [3, 0, 45]})
            videos[project].video.play();
            projectMemo.current = project
        }
        if (videoPlayerState && project === null) {
            setAnimation({position: [80, 0, 100]})
            videos[projectMemo.current!].video.pause()
        }
    }, [videoPlayerState, project]);

    useFrame(() => {
        ref.current.lookAt(...[-10, 5, 65] as Vector3Type)
    })

    return (
        <animated.group position={position as unknown as Vector3Type} ref={ref}>
            {videoPlayerState && <VideoPlaneLight/>}
            <mesh material={videoMaterial}>
                <planeBufferGeometry attach="geometry" args={[14, 7]}/>
            </mesh>
        </animated.group>
    )
}

export default React.memo(VideoPanel)