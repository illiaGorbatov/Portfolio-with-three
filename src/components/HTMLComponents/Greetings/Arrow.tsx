import React from 'react';
import styled, {keyframes} from 'styled-components/macro';

const hoverAnimation = keyframes`
  0% {top: 0}
  50% {top: 100%}
  51% {top: -100%}
  100% {top: 0}
`;

const ArrowCenter = styled.div`
  position: absolute;
  height: 80px;
  width: 1px;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  background-color: white;
`;

const ArrowLeft = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 1px;
  height: 16px;
  transform-origin: 50% 100%;
  background-color: white;
  transform: rotate(45deg) translateX(-50%);
`;

const ArrowRight = styled(ArrowLeft)`
  transform: rotate(-45deg);
`;

const AnimatedWrapper = styled.div<{ $visible: boolean}>`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: top 0.3s ease-in-out;
  top: ${props => !props.$visible ? '100%' : 0}
`;

const ArrowWrapper = styled.div<{ $visible: boolean}>`
  position: absolute;
  left: 50%;
  width: 20px;
  height: 80px;
  bottom: 10px;
  overflow: hidden;
  transform: translateX(-50%);
  cursor: ${props => props.$visible ? 'pointer' : 'inherit'};
  &:hover ${ArrowCenter}, &:hover ${ArrowLeft} {
    width: 2px
  }
  &:hover ${AnimatedWrapper} {animation: .5s ${hoverAnimation} ease-in-out}
`;

type PropsType = {
    visible: boolean,
    onArrowClickHandler: () => void,
}

const Arrow: React.FC<PropsType> = ({visible, onArrowClickHandler}) => {

    return (
        <ArrowWrapper onClick={visible ? onArrowClickHandler : undefined} $visible={visible}>
            <AnimatedWrapper $visible={visible}>
                <ArrowLeft/>
                <ArrowCenter/>
                <ArrowRight/>
            </AnimatedWrapper>
        </ArrowWrapper>
    )
}

export default Arrow