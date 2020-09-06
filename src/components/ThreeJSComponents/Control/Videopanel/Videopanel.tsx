import React, {useEffect, useMemo, useRef, useState} from "react";
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

    const [projectMemo, setProjectMemo] = useState<number>(0);

    const videoMaterial = useMemo(() => {
        const texture = new THREE.VideoTexture(videos.find(item => item.projectIndex === projectMemo)!.video);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.format = THREE.RGBFormat;
        const material = new THREE.MeshBasicMaterial({color: 0xffffff, map: texture});
        material.transparent = false;
        return material
    }, [videos, projectMemo]);

    const [{position}, setAnimation] = useSpring(() => ({
        position: [20, 2.5, 60]
    }));

    useEffect(() => {
        if (project !== null) setProjectMemo(project)
    }, [project])

    useEffect(() => {
        if (videoPlayerState) {
            setAnimation({position: [3, 2.5, 45]}).then(() => {
                videos[projectMemo!].video.play();
            })
        }
        if (!videoPlayerState && projectMemo !== null) {
            setAnimation({position: [20, 2.5, 60]})
            videos[projectMemo!].video.pause()
        }
    }, [videoPlayerState, setAnimation, videos, projectMemo]);

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