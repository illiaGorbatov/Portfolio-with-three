import React, {useEffect, useState} from 'react';
import {createGlobalStyle} from "styled-components";
import styled from "styled-components/macro";
import InitialCanvas from "./components/ThreeJSComponents/InitialCanvas";
import Interface from "./components/HTMLComponents/NavMenu/Interface";
import {getState} from "./utils/zustandStore";
import HTMLElementsContainer from "./components/HTMLComponents/HTMLElementsContainer";
import {library} from "@fortawesome/fontawesome-svg-core";
import {far} from "@fortawesome/free-regular-svg-icons";
import {fas} from "@fortawesome/free-solid-svg-icons";

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
        const onMouseMoveHandler = (e: MouseEvent) => {
            getState().mouseMove([e.clientX, e.clientY])
        }
        window.addEventListener('mousemove', onMouseMoveHandler);
        return (() => window.removeEventListener('mousemove', onMouseMoveHandler))
    }, []);

    return (
        <>
            <GlobalStyles/>
            <HTMLElementsContainer/>
            <Wrapper>
                <InitialCanvas/>
            </Wrapper>
        </>
    );
};

export default App;

