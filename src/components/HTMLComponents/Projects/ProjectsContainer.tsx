import React from 'react';
import styled from 'styled-components/macro';
import ProjectPresentation from "./ProjectPresentation";
import {projectsInfo} from "../TextContent";

const AllProjectsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ProjectsContainer: React.FC = () => {
    return (
        <AllProjectsWrapper>
            {projectsInfo.map((project, index) =>
            <ProjectPresentation key={index} projectIndex={index} project={project}/>)}
        </AllProjectsWrapper>
    )
}

export default ProjectsContainer