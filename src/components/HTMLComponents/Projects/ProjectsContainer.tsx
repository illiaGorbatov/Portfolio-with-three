import React from 'react';
import styled from 'styled-components/macro';
import ProjectPresentation from "./SingleProject/ProjectPresentation";
import {projectsInfo} from "../../../textContent/TextContent";
import {shallowEqual, useSelector} from "react-redux";
import {AppStateType} from "../../../store/store";

const AllProjectsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ProjectsContainer: React.FC = () => {

    const druggingState = useSelector((state: AppStateType) => state.interface.druggingState, shallowEqual);
    const scrollingState = useSelector((state: AppStateType) => state.interface.scrollingState, shallowEqual);
    const scrollsCount = useSelector((state: AppStateType) => state.interface.scrollsCount, shallowEqual);
    const currentlyLookedProject = useSelector((state: AppStateType) => state.interface.currentlyLookedProject, shallowEqual);


    return (
        <AllProjectsWrapper>
            {projectsInfo.map((project, index) =>
                <ProjectPresentation key={index} projectIndex={index} scrollsCount={scrollsCount} currentlyLookedProject={currentlyLookedProject}
                                     isDrugging={druggingState} isScrolling={scrollingState}/>)}
        </AllProjectsWrapper>
    )
}

export default React.memo(ProjectsContainer)