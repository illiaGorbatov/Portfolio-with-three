import React from 'react';
import styled from 'styled-components/macro';
import TextTypingElement from "./TextTypingElement";

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

const MyName = styled.div`
  font-size: 50px;
  font-family: "Anders";
  color: white;
`;

const MainPage: React.FC = () => {

    return(
        <MainPageWrapper>
            <MyInfoWrapper>
                <MyName>
                    Gorbatov Illia
                </MyName>
                <TextTypingElement/>
            </MyInfoWrapper>
        </MainPageWrapper>

    )
}

export default MainPage