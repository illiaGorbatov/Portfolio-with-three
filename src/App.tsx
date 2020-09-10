import React, { useEffect } from 'react';
import {createGlobalStyle} from "styled-components";
import styled from "styled-components/macro";
import InitialCanvas from "./components/ThreeJSComponents/InitialCanvas";
import HTMLElementsContainer from "./components/HTMLComponents/HTMLElementsContainer";
import {library} from "@fortawesome/fontawesome-svg-core";
import {far} from "@fortawesome/free-regular-svg-icons";
import {fas} from "@fortawesome/free-solid-svg-icons";
import Preloader from "./components/HTMLComponents/preloaderAndErrorScreen/Preloader";
import {isMobile} from "react-device-detect";
import Error from "./components/HTMLComponents/preloaderAndErrorScreen/Error";

library.add(far, fas);


const GlobalStyles = createGlobalStyle`
    * {
      box-sizing: border-box;
    };
    body {
      margin: 0;
      padding: 0;
      user-select: none;
      outline: none;
      
    };
    &::-webkit-scrollbar { 
        display: none;
        };
    html {
        -ms-overflow-style: none; 
    }
`;

const Wrapper = styled.div`
    position: absolute;
    z-index: -1;
    background-color: black;
    width: 100vw;
    height: 100vh;
`;

const App = () => {

    useEffect(() => {
        const reloadFunction = () => document.location.reload()
        window.addEventListener("orientationchange", reloadFunction)
        return () => window.removeEventListener("orientationchange", reloadFunction)
    }, []);

    let orientation = window.screen.orientation.type;
    if (isMobile && (orientation === "portrait-secondary" || orientation === "portrait-primary")) return(<Error/>)

    return (
        <>
            <GlobalStyles/>
            <Preloader/>
            <HTMLElementsContainer/>
            <Wrapper>
                <InitialCanvas/>
            </Wrapper>
        </>
    );
};

export default App;

