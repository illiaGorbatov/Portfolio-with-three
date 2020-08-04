import React, {useState} from 'react';
import styled from 'styled-components/macro';
import AboutMe from "./AboutMe";
import {useStore} from "../../../utils/zustandStore";
import Arrow from "../Greetings/Arrow";

const Logo = styled.div`
  position: absolute;
  z-index: 999;
  top: 20px;
  color: white;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  font-family: "Anders";
`;

const Interface: React.FC = () => {

    return (
        <>
            <Logo>
                Gorbatov illia
            </Logo>
            <AboutMe/>
            <Arrow/>
        </>
    )
};

export default Interface;