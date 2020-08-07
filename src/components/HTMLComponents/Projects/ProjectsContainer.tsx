import React from 'react';
import styled from 'styled-components/macro';
import SingleProject from "./SingleProject";

const AllProjectsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ProjectsContainer: React.FC = () => {
    return (
        <AllProjectsWrapper>
            <SingleProject/>
            <SingleProject/>
            <SingleProject/>
        </AllProjectsWrapper>
    )
}

export default ProjectsContainer