import React from 'react';
import styled from 'styled-components/macro';
import ProjectPresentation from "./SingleProject/ProjectPresentation";
import {projectsInfo} from "../../../textContent/TextContent";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../store/store";
import CloseLook from "./CloseLook/ProjectCloseLook";
import {actions} from "../../../store/InterfaceReducer";

const AllProjectsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ProjectsContainer: React.FC = () => {

    const druggingState = useSelector((state: AppStateType) => state.interface.druggingState, shallowEqual);
    const scrollingState = useSelector((state: AppStateType) => state.interface.scrollingState, shallowEqual);
    const project = useSelector((state: AppStateType) => state.interface.currentlyLookedProject, shallowEqual);

    const dispatch = useDispatch();

    const closeProject = () => {
        dispatch(actions.closeProject())
    }


    return (
        <>
            <AllProjectsWrapper>
                {projectsInfo.map((project, index) =>
                    <ProjectPresentation key={index} projectIndex={index} project={project}
                                         isDrugging={druggingState} isScrolling={scrollingState}/>)}
            </AllProjectsWrapper>
            <CloseLook closeProject={closeProject} project={project} visible={druggingState && scrollingState && project !== null}/>
        </>
    )
}

export default React.memo(ProjectsContainer)