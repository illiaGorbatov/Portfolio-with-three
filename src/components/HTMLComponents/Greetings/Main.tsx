import React from 'react';
import styled from 'styled-components/macro';
import TextTypingElement from "./TextTypingElement";
import Arrow from "./Arrow";
import {shallowEqual, useSelector} from "react-redux";
import {AppStateType} from "../../../store/store";

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
  color: black;
  transform: translateY(${props => props.$visible ? '0%' : '-100%'});
  transition: transform .5s cubic-bezier(.19,.78,.4,.84);
`;

const WrapperForAppearing = styled.div`
  overflow: hidden;
`;

const MainPage: React.FC = () => {

    const scrollsCount = useSelector((state: AppStateType) => state.interface.scrollsCount, shallowEqual);

    return (
        <MainPageWrapper>
            <MyInfoWrapper>
                <WrapperForAppearing>
                    <MyName $visible={scrollsCount === 0}>
                        Gorbatov Illia
                    </MyName>
                </WrapperForAppearing>
                <TextTypingElement/>
            </MyInfoWrapper>
            <Arrow/>
        </MainPageWrapper>

    )
}

export default MainPage