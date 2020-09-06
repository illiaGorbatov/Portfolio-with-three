import React from 'react';
import styled, {css, keyframes} from "styled-components/macro";

const hoverAnimation = keyframes`
  0% {right: 0}
  50% {right: 100%}
  51% {right: -100%}
  100% {right: 0}
`;

const AnimatedLogo = styled.div<{ $visible: boolean }>`
   position: relative;
   right: ${props => props.$visible ? '0' : '-100%'};
   transition: right .4s;
`;

const complexMixin = css`&:hover ${AnimatedLogo}{animation: .4s ${hoverAnimation} ease-in-out}`;

const LogoWrapper = styled.div<{ $visible: boolean }>`
  position: absolute;
  z-index: 999;
  color: white;
  left: 50%;
  top: 10px;
  transform: translateX(-50%);
  font-size: 20px;
  overflow: hidden;
  font-family: "Anders";
  cursor: ${props => props.$visible ? 'pointer' : 'inherit'};
  ${props => props.$visible && complexMixin}
`;

type PropsType = {
    visible: boolean
}

const Logo: React.FC<PropsType> = ({visible}) => {

    return (
        <LogoWrapper $visible={visible}>
            <AnimatedLogo $visible={visible}>
                Gorbatov Illia
            </AnimatedLogo>
        </LogoWrapper>
    )
}

export default Logo