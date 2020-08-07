import React from 'react';
import styled from 'styled-components/macro';
import ProjectAnnotation from "./ProjectAnnotation";
import ProjectsCounter from "../NavMenu/ProjectsCounter";
import ProjectPresentation from "./ProjectPresentation";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const SingleProject: React.FC = () => {
    return (
        <Wrapper>
            <ProjectAnnotation/>
            <ProjectPresentation/>
        </Wrapper>
    )
}

export default SingleProject