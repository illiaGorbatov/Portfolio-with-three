import React from 'react';
import styled from 'styled-components/macro';

const MyName = styled.div<{ $visible: boolean }>`
  font-size: 50px;
  font-family: "Anders";
  color: white;
  transform: translateY(${props => props.$visible ? '0%' : '-100%'});
  transition: transform .4s cubic-bezier(.19,.78,.4,.84);
`;

const WrapperForAppearing = styled.div`
  overflow: hidden;
`;

type PropsType = {
    visible: boolean
}

const BigLogo: React.FC<PropsType> = ({visible}) => {
    return(
        <WrapperForAppearing>
            <MyName $visible={visible}>
                Gorbatov Illia
            </MyName>
        </WrapperForAppearing>
    )
}

export default React.memo(BigLogo)