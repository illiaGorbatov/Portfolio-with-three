import React, {useCallback} from 'react';
import styled from 'styled-components/macro';
import TextTypingElement from "./TextTypingElement";
import Arrow from "./Arrow";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../store/store";
import {actions} from "../../../store/InterfaceReducer";
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


const MainPageContainer: React.FC = () => {

    const isMainPageFocused = useSelector((state: AppStateType) => state.interface.isMainPageFocused, shallowEqual);

    const dispatch = useDispatch();

    const onArrowClickHandler = useCallback(() => {
        dispatch(actions.transitionFromMainPaige())
    }, [dispatch]);

    return (
        <MainPageWrapper>
            <MyInfoWrapper>
                <BigLogo visible={isMainPageFocused}/>
                <TextTypingElement visible={isMainPageFocused}/>
            </MyInfoWrapper>
            <Arrow visible={isMainPageFocused} onArrowClickHandler={onArrowClickHandler}/>
        </MainPageWrapper>

    )
}

export default MainPageContainer