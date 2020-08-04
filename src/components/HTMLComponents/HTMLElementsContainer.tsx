import React from 'react';
import MainPage from "./Greetings/Main";
import Interface from "./NavMenu/Interface";
import ProjectsContainer from "./Projects/ProjectsContainer";

const HTMLElementsContainer: React.FC = () => {
    return (
        <>
            {/*<MainPage/>*/}
            <Interface/>
            <ProjectsContainer/>
        </>
    )
}

export default HTMLElementsContainer