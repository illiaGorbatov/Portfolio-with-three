import React, {useEffect, useRef} from 'react';
import styled from 'styled-components/macro';
import ProjectAnnotation from "./ProjectAnnotation";
import {useDispatch} from "react-redux";
import {actions} from "../../../../store/InterfaceReducer";
import CloseLookButton from "./CloseLookButton";
import {projectsInfo} from "../../../../textAndPrijectsInfo/TextContent";


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
  width: 60%;
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
    isDrugging: boolean,
    isScrolling: boolean,
    scrollsCount: number,
    currentlyLookedProject: number | null
}

const ProjectPresentation: React.FC<PropsType> = ({projectIndex, isDrugging, isScrolling,
                                                      scrollsCount, currentlyLookedProject}) => {

    const dispatch = useDispatch();

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        dispatch(actions.setVideo(videoRef.current!, projectIndex))
    }, [dispatch, projectIndex]);

    useEffect(() => {
        if (scrollsCount-1 === projectIndex && (isScrolling || isDrugging) && currentlyLookedProject === null) {
            videoRef.current!.currentTime = 0;
        }
        if (scrollsCount-1 === projectIndex && !isScrolling && !isDrugging && currentlyLookedProject === null){
            videoRef.current!.play()
        }
        if (scrollsCount-1 !== projectIndex || (isScrolling || isDrugging) || currentlyLookedProject !== null){
            videoRef.current!.pause()
        }
    }, [scrollsCount, isDrugging, isScrolling, projectIndex, currentlyLookedProject]);

    return (
        <Wrapper>
            <VideoWrapper>
                <Video muted loop ref={videoRef}>
                    <source src={projectsInfo[projectIndex].video} type="video/mp4"/>
                </Video>
                <ProjectAnnotation isDrugging={isDrugging} isScrolling={isScrolling} projectIndex={projectIndex}/>
                <CloseLookButton projectIndex={projectIndex} visible={!isScrolling && !isDrugging}/>
            </VideoWrapper>
        </Wrapper>
    )
}

export default React.memo(ProjectPresentation)