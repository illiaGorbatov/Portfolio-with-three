import React from 'react';
import styled from 'styled-components/macro';
import TextTypingElement from "./TextTypingElement";
import Arrow from "./Arrow";
import BigLogo from './BigLogo';

const MainPageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: grid;
  place-items: center;
`;

const MyInfoWrapper = styled.div`
  position: relative;
`;

type PropsType = {
    loadedState: boolean,
    isMainPageFocused: boolean,
    onArrowClickHandler: () => void
}

const MainPageContainer: React.FC<PropsType> = ({loadedState, isMainPageFocused, onArrowClickHandler}) => {

    return (
        <MainPageWrapper>
            <MyInfoWrapper>
                <BigLogo visible={isMainPageFocused && loadedState}/>
                <TextTypingElement visible={isMainPageFocused && loadedState}/>
            </MyInfoWrapper>
            <Arrow visible={isMainPageFocused && loadedState} onArrowClickHandler={onArrowClickHandler}/>
        </MainPageWrapper>

    )
}

export default React.memo(MainPageContainer)