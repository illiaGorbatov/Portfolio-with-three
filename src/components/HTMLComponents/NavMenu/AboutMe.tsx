import React from 'react';
import styled from 'styled-components/macro';
import {animated} from 'react-spring'
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../store/store";
import {actions} from "../../../store/InterfaceReducer";
import {
    TRANSITION_TO_INFO,
    PROJECTS_STATIC,
    TRANSITION_FROM_INFO_TO_PROJECTS_STATIC
} from "../../../utils/StringVariablesAndTypes";

const AboutMeWrapper = styled.div`
  position: absolute;
  top: 0;
  color: white;
  width: 100vw;
  height: 100vh;
  font-family: 'Poppins', sans-serif;
  box-sizing: border-box;
  z-index: 997;
`;

const Menu = styled(animated.div)`
  position: absolute;
  z-index: 999;
  top: 50%;
  transform: rotate(-90deg) translateY(-50%);
  left: 10px;
  color: white;
  font-size: 15px;
  display: flex;
  font-family: 'Relative-Book';
  cursor: pointer;
`;

const AboutMe: React.FC = () => {

    const isNavMenuOpened = useSelector((state: AppStateType) => state.interface.isAboutMenuOpened, shallowEqual);
    const dispatch = useDispatch();


    const openInformation = () => {
        dispatch(actions.setAboutMenuState(true));
        dispatch(actions.setCameraState(TRANSITION_TO_INFO))
    };

    const closeInformation = () => {
        dispatch(actions.setAboutMenuState(false));
        dispatch(actions.setCameraState(TRANSITION_FROM_INFO_TO_PROJECTS_STATIC))
    };


    return (
        <>
            <Menu onClick={!isNavMenuOpened ? openInformation : closeInformation}>
                {isNavMenuOpened ? 'Close' : 'About Me'}
            </Menu>
            {isNavMenuOpened  &&
            <AboutMeWrapper>

            </AboutMeWrapper>}
        </>
    )
};

export default React.memo(AboutMe);