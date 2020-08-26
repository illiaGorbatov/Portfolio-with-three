import React, {useEffect, useRef} from 'react';
import styled from 'styled-components/macro';
import {useHover} from "react-use-gesture";
import ProjectAnnotation from "./ProjectAnnotation";
import {useDispatch} from "react-redux";
import {actions} from "../../../store/InterfaceReducer";
import {ProjectType} from "../TextContent";
import CloseLookButton from "./CloseLookButton";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`

const VideoWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 70%;
  max-width: 1000px;
  height: auto;
  display: grid;
  place-items: center;
`;

const Video = styled.video`
  position: relative;
  width: 100%;
  height: auto;
`;

type PropsType = {
    projectIndex: number,
    project: ProjectType
}

const ProjectPresentation: React.FC<PropsType> = ({projectIndex}) => {

    const dispatch = useDispatch();

    const videoRef = useRef<HTMLVideoElement>(null);

    const regulation = useHover(({hovering}) => {
        if (hovering) videoRef.current!.play();
        if (!hovering) videoRef.current!.pause()
    });

    useEffect(() => {
        dispatch(actions.setVideo(videoRef.current!, projectIndex))
    }, [])

    return (
        <Wrapper>
            <VideoWrapper {...regulation()}>
                <Video muted loop ref={videoRef}>
                    <source src='/videos/testVid.mp4' type="video/mp4"/>
                </Video>
                <ProjectAnnotation/>
                <CloseLookButton projectIndex={projectIndex}/>
            </VideoWrapper>
        </Wrapper>
    )
}

export default ProjectPresentation