import React, {useCallback} from 'react';
import styled from 'styled-components/macro';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../store/store";
import AboutMe from './AboutMe/AboutMeButton';
import {actions} from "../../../store/InterfaceReducer";
import CloseLook from "../Projects/CloseLook/ProjectCloseLook";

const LogoWrapper = styled.div<{ $visible: boolean }>`
  position: absolute;
  z-index: 999;
  color: white;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  font-family: "Anders";
  top: ${props => props.$visible ? 20 : -100}px;
  transition: top .2s .3s;
`;

const InterfaceContainer: React.FC = () => {

    const isInterfaceAvailable = useSelector((state: AppStateType) => state.interface.isInterfaceAvailable, shallowEqual);
    const isNavMenuOpened = useSelector((state: AppStateType) => state.interface.isAboutMenuOpened, shallowEqual);

    const dispatch = useDispatch();

    const openInformation = useCallback(() => {
        dispatch(actions.openAboutMeSection());
    }, [dispatch]);

    const closeInformation = useCallback(() => {
        dispatch(actions.closeAboutMeSection());
    }, [dispatch]);

    return (
        <>
            {isInterfaceAvailable &&
            <>
                <LogoWrapper $visible={isInterfaceAvailable}>
                    Gorbatov illia
                </LogoWrapper>
                <AboutMe closeInformation={closeInformation} openInformation={openInformation}
                         isNavMenuOpened={isNavMenuOpened}/>
            </>
            }
        </>
    )
};

export default React.memo(InterfaceContainer)