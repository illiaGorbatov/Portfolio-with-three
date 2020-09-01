import React, {useCallback} from 'react';
import styled from 'styled-components/macro';
import TextTypingElement from "./TextTypingElement";
import Arrow from "./Arrow";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../store/store";
import {actions} from "../../../store/InterfaceReducer";

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

const MyName = styled.div<{ $visible: boolean }>`
  font-size: 50px;
  font-family: "Anders";
  color: white;
  transform: translateY(${props => props.$visible ? '0%' : '-100%'});
  transition: transform .5s cubic-bezier(.19,.78,.4,.84);
`;

const WrapperForAppearing = styled.div`
  overflow: hidden;
`;

const MainPageContainer: React.FC = () => {

    const isCrystalExploded = useSelector((state: AppStateType) => state.interface.isCrystalExploded, shallowEqual);

    const dispatch = useDispatch();

    const onArrowClickHandler = useCallback(() => {
        dispatch(actions.transitionFromMainPaige())
    }, []);

    return (
        <MainPageWrapper>
            <MyInfoWrapper>
                <WrapperForAppearing>
                    <MyName $visible={!isCrystalExploded}>
                        Gorbatov Illia
                    </MyName>
                </WrapperForAppearing>
                <TextTypingElement visible={!isCrystalExploded}/>
            </MyInfoWrapper>
            <Arrow visible={!isCrystalExploded} onArrowClickHandler={onArrowClickHandler}/>
        </MainPageWrapper>

    )
}

export default MainPageContainer