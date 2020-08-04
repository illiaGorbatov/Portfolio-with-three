import React from 'react';
import Project from "./Project";
import ProjectsCounter from "./ProjectsCounter";

const ProjectsContainer: React.FC = () => {
    return (
        <>
            <Project/>
            <ProjectsCounter/>
        </>
    )
}

export default ProjectsContainer