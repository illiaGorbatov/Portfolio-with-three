import React from 'react';
import styled from "styled-components/macro";
import {useStore} from "../../utils/zustandStore";
import {TRANSITION_TO_EXPLOSION} from "../../utils/StringVariablesAndTypes";

const ButtonsWrapper = styled.div`
  position: absolute;
  top: 200px;
  left: 200px;
  z-index: 1000;
`;

const Button = styled.div<{ $color: string }>`
  width: 50px;
  height: 50px;
  background-color: ${props => props.$color};
`;

const TestButton = () => {

    const setCameraState = useStore(state => state.setCameraState);
    const setExploded = useStore(state => state.setExploded);
    const setStarsAndSkyState = useStore(state => state.setStarsAndSkyState);

    const test = () => {
        setCameraState(TRANSITION_TO_EXPLOSION);
        setStarsAndSkyState(TRANSITION_TO_EXPLOSION)
    }

    const setProgress = () => {
        setExploded(true)
    }

    return (
        <ButtonsWrapper>
            <Button onClick={test} $color={'red'}/>
            <Button onClick={setProgress} $color={'green'}/>
        </ButtonsWrapper>
    )
}

export default TestButton