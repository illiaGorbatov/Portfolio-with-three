import React, {useEffect} from 'react';
import styled from 'styled-components/macro';
import {animated} from 'react-spring';
import {errorMessage} from "../../../textAndPrijectsInfo/TextAndProjectsSettings";

const Wrapper = styled(animated.div)`
  background-color: #353535;
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: grid;
  place-items: center;
  z-index: 999;
  overflow: hidden;
`;

const LettersWrapper = styled.div`
  width: 50%;
  max-width: 500px;
  color: white;
  font-size: 40px;
  font-family: 'Made Evolve Sans Light';
  text-align: center;
`;


const Error: React.FC = () => {

    useEffect(() => {
    }, [])

    return (
        <Wrapper>
            <LettersWrapper>
                {errorMessage}
            </LettersWrapper>
        </Wrapper>

    )
}

export default Error