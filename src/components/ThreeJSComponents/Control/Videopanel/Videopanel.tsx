import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import * as THREE from 'three';
import {shallowEqual, useSelector} from "react-redux";
import {AppStateType} from "../../../../store/store";
import {animated, useSpring} from "react-spring/three";
import {Vector3Type} from "../../../../utils/StringVariablesAndTypes";
import VideoPlaneLight from "./VideoPlaneLight";
import {useFrame} from "react-three-fiber";
import isEqual from "react-fast-compare";


const VideoPanel: React.FC = () => {

    const videos = useSelector((state: AppStateType) => state.interface.videos, isEqual);
    const project = useSelector((state: AppStateType) => state.interface.currentlyLookedProject, shallowEqual);
    const videoPlayerState = useSelector((state: AppStateType) => state.interface.videoPlayerState, shallowEqual);

    const ref = useRef<THREE.Group>(new THREE.Group());

    const [projectMemo, setProjectMemo] = useState<number>(0);

    const videoMaterial = useMemo(() => {
        const texture = new THREE.VideoTexture(videos.find(item => item.projectIndex === projectMemo)!.video);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.format = THREE.RGBFormat;
        texture.encoding = THREE.sRGBEncoding;
        texture.anisotropy = 16;
        return new THREE.MeshBasicMaterial({map: texture, transparent: false})
    }, [videos, projectMemo]);

    const [{position, lookAtPosition, scale}, setAnimation] = useSpring(() => ({
        position: [20, 2.5, 60],
        lookAtPosition: [-10, 7, 65],
        scale: [1, 1, 1]
    }));

    const mouseMoveHandler = useCallback((e: MouseEvent) => {
        const mouseXPercentage = e.clientX / window.innerWidth;
        const mouseYPercentage = e.clientY / window.innerHeight;
        const x = THREE.MathUtils.lerp(-10, 3, mouseXPercentage);
        const y = THREE.MathUtils.lerp(7, -3, mouseYPercentage);
        setAnimation({lookAtPosition: [x, y, 65]})
    }, [setAnimation]);

    const memoizedDeltaY = useRef<number>(0);
    const wheelHandler = useCallback((e: WheelEvent) => {
        if (e.deltaY > 0 && memoizedDeltaY.current < 500) {
            memoizedDeltaY.current = memoizedDeltaY.current + e.deltaY;
            setAnimation({scale: new Array(3).fill(memoizedDeltaY.current/1000 + 1)})
        }
        if (e.deltaY < 0 && memoizedDeltaY.current > 0) {
            memoizedDeltaY.current = memoizedDeltaY.current + e.deltaY;
            setAnimation({scale: new Array(3).fill(memoizedDeltaY.current/1000 + 1)})
        }
    }, [setAnimation])

    useEffect(() => {
        if (project !== null) {
            setProjectMemo(project);
            window.addEventListener('mousemove', mouseMoveHandler);
            window.addEventListener('wheel', wheelHandler);
        }
        return () => {
            window.removeEventListener('mousemove', mouseMoveHandler)
            window.removeEventListener('wheel', wheelHandler)
        }
    }, [project, mouseMoveHandler, wheelHandler]);

    useEffect(() => {
        if (videoPlayerState) {
            setAnimation({position: [3, 2.5, 45]}).then(() => {
                videos[projectMemo!].video.play();
            })
        }
        if (!videoPlayerState && projectMemo !== null) {
            setAnimation({position: [20, 2.5, 60], scale: [1, 1, 1]})
            videos[projectMemo!].video.pause()
        }
    }, [videoPlayerState, setAnimation, videos, projectMemo]);

    useFrame(() => {
        if (project !== null) {
            ref.current.lookAt(...lookAtPosition.get() as unknown as Vector3Type);
        }

    })

    return (
        <animated.group position={position as unknown as Vector3Type} ref={ref}
                        scale={scale as unknown as Vector3Type}>
            {videoPlayerState && <VideoPlaneLight/>}
            <mesh material={videoMaterial} scale={[1.2, 1.2, 1.2]}>
                <planeBufferGeometry attach="geometry" args={[12.2, 7.40]}/>
            </mesh>
        </animated.group>
    )
}

export default React.memo(VideoPanel)