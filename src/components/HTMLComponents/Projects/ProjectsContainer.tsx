import React from 'react';
import ProjectAnnotation from "./ProjectAnnotation";
import ProjectsCounter from "./ProjectsCounter";
import ProjectPresentation from "./ProjectPresentation";

const ProjectsContainer: React.FC = () => {
    return (
        <>
            <ProjectAnnotation/>
            <ProjectsCounter/>
            <ProjectPresentation/>
        </>
    )
}

export default ProjectsContainer