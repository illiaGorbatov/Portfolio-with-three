import React from 'react';
import styled from "styled-components/macro";
import {shallowEqual, useSelector} from "react-redux";
import {AppStateType} from "../../../store/store";

const CloseLookWrapper = styled.div`
  
`;

const ProjectCloseLook: React.FC = () => {

    const project = useSelector((state: AppStateType) => state.interface.currentlyLookedProject, shallowEqual);


    return (
        <CloseLookWrapper>

        </CloseLookWrapper>
    )
}
