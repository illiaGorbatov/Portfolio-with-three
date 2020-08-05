import React from 'react';
import MainPage from "./Greetings/Main";
import Interface from "./NavMenu/Interface";
import ProjectsContainer from "./Projects/ProjectsContainer";
import SingleProject from "./Projects/SingleProject";

const HTMLElementsContainer: React.FC = () => {
    return (
        <>
            {/*<MainPage/>*/}
            <Interface/>
            <SingleProject/>
        </>
    )
}

export default HTMLElementsContainer