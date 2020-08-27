import React from 'react';
import styled from 'styled-components/macro';
import {shallowEqual, useSelector} from "react-redux";
import {AppStateType} from "../../../store/store";
import AboutMe from './AboutMe';

const Logo = styled.div<{$isMainPageOnScreen: boolean}>`
  position: absolute;
  z-index: 999;
  color: white;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  font-family: "Anders";
  top: ${props => props.$isMainPageOnScreen ? -100 : 20}px;
  transition: top .2s .3s;
`;

const Interface: React.FC = () => {

    const scrollsCount = useSelector((state: AppStateType) => state.interface.scrollsCount, shallowEqual);

    return (
        <>
            <Logo $isMainPageOnScreen={scrollsCount === 0}>
                Gorbatov illia
            </Logo>
            <AboutMe/>
        </>
    )
};

export default React.memo(Interface);