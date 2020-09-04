import React from 'react';
import styled from "styled-components/macro";

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

type PropsType = {
    visible: boolean
}

const Logo: React.FC<PropsType> = ({visible}) => {
    return (
        <LogoWrapper $visible={visible}>
            Gorbatov Illia
        </LogoWrapper>
    )
}

export default Logo