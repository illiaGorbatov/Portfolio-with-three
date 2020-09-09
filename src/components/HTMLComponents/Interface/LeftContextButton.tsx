import React, {useEffect, useState} from 'react';
import styled, {css, keyframes} from 'styled-components/macro';


const hoverAnimation = keyframes`
  0% {left: 0}
  50% {left: -100%}
  51% {left: 100%}
  100% {left: 0}
`;

const MenuButton = styled.div<{$visible: boolean}>`
  position: relative;
  transform-origin: 0 50%;
  color: white;
  font-size: 20px;
  left: ${props => props.$visible ? '0' : '100%'};
  transition: left .4s;
  font-family: 'Relative-Book';
`;

const complexMixin = css`&:hover ${MenuButton}{animation: .4s ${hoverAnimation} ease-in-out }`

const MenuButtonWrapper = styled.div<{$visible: boolean}>`
  position: absolute;
  z-index: 999;
  top: 50%;
  cursor: ${props => props.$visible ? 'pointer' : 'inherit'};
  overflow: hidden;
  transform: rotateZ(-90deg);
  ${props => props.$visible && complexMixin}
`;

type PropsType = {
    isAboutBlockOpened: boolean,
    openInformation: () => void,
    closeInformation: () => void,
    currentProject: null | number,
    closeProject: () => void,
    visible: boolean
}

const LeftContextButton: React.FC<PropsType> = ({
                                                    isAboutBlockOpened, openInformation, closeInformation,
                                                    closeProject, currentProject, visible
                                                }) => {

    const [memoizedText, setText] = useState<string>('About Me');

    useEffect(() => {
        if (isAboutBlockOpened && visible) setText('Close');
        if (currentProject !== null && visible) setText('Back');
        if (!isAboutBlockOpened && visible && currentProject === null) setText('About Me');
    }, [visible, isAboutBlockOpened, currentProject]);

    return (
        <MenuButtonWrapper $visible={visible}
            onClick={!visible ? undefined : currentProject !== null ? closeProject : !isAboutBlockOpened ? openInformation : closeInformation}>
            <MenuButton $visible={visible}>
                {memoizedText}
            </MenuButton>
        </MenuButtonWrapper>
    )
};

export default React.memo(LeftContextButton)