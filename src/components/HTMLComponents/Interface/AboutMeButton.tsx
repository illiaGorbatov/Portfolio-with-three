import React from 'react';
import styled from 'styled-components/macro';
import {animated} from 'react-spring'

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
  transform: rotateZ(-90deg) translateX(-50%);
  transform-origin: 0 50%;
  left: 10px;
  color: white;
  font-size: 15px;
  display: flex;
  font-family: 'Relative-Book';
  cursor: pointer;
`;

type PropsType = {
    isNavMenuOpened: boolean,
    openInformation: () => void,
    closeInformation: () => void
}

const AboutMeButton: React.FC<PropsType> = ({isNavMenuOpened, openInformation, closeInformation}) => {

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

export default React.memo(AboutMeButton)