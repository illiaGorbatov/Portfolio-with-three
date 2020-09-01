import React from 'react';
import styled from 'styled-components/macro';
import {animated} from 'react-spring';

const Wrapper = styled.div`
  position: absolute;
  width: 50vw;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const InnerCentralWrapper = styled.div`
  text-align: left;
  color: black;
`;

const Headers = styled.div<{ $big: boolean }>`
  font-size: ${props => props.$big ? '50px' : '25px'};
  font-family: 'MADE Evolve Bold';
`;

const InfoBlock:React.FC = () => {
    return(
        <Wrapper>
            <InnerCentralWrapper>
                <Headers $big={true}>
                    Hello
                </Headers>
                <Headers $big={false}>
                    Is it me you're looking for?
                </Headers>
            </InnerCentralWrapper>
        </Wrapper>
    )
}

export default React.memo(InfoBlock)