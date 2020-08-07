import React from 'react';
import styled from "styled-components/macro";
import {useStore} from "../../utils/zustandStore";
import {TRANSITION_TO_EXPLOSION} from "../../utils/StringVariablesAndTypes";
import {useDispatch} from "react-redux";
import {actions} from "../../store/reducer";

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

    const dispatch = useDispatch();

    const test = () => {
        dispatch(actions.setCameraState(TRANSITION_TO_EXPLOSION));
        dispatch(actions.setStarsAndSkyState(TRANSITION_TO_EXPLOSION));
    }

    const setProgress = () => {
        dispatch(actions.setExploded(true));
    }
    console.log('buttonRender')

    return (
        <ButtonsWrapper>
            <Button onClick={test} $color={'red'}/>
            <Button onClick={setProgress} $color={'green'}/>
        </ButtonsWrapper>
    )
}

export default TestButton