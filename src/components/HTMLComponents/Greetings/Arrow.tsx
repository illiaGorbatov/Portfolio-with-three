import React from 'react';
import styled from 'styled-components/macro';

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

const ArrowWrapper = styled.div`
  position: absolute;
  left: 50%;
  width: 20px;
  height: 80px;
  bottom: 10px;
  transform: translateX(-50%);
  cursor: pointer;
  &:hover ${ArrowCenter}, &:hover ${ArrowLeft} {
    width: 2px
  }
`;

const Arrow: React.FC = () => {
    return(
        <ArrowWrapper>
            <ArrowLeft/>
            <ArrowCenter/>
            <ArrowRight/>
        </ArrowWrapper>
    )
}

export default Arrow