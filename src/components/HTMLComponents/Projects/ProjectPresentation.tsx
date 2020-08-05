import React, {useRef} from 'react';
import styled from 'styled-components/macro';
import {useHover} from "react-use-gesture";

const VideoWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 70%;
  height: auto;
  display: grid;
  place-items: center;
`;

const Video = styled.video`
  position: relative;
  width: 100%;
  height: auto;
`;

const ProjectPresentation: React.FC = () => {

    const videoRef = useRef<HTMLVideoElement>(null);

    const regulation = useHover(({hovering}) => {
        if (hovering) videoRef.current!.play();
        if (!hovering) videoRef.current!.pause()
        console.log(hovering, videoRef.current)
    })

    return(
        <VideoWrapper {...regulation()}>
            <Video muted loop ref={videoRef}>
                <source src='/videos/testVid.mp4' type="video/mp4"/>
            </Video>
        </VideoWrapper>
    )
}

export default ProjectPresentation