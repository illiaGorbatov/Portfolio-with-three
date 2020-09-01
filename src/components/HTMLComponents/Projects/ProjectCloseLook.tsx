import React from 'react';
import styled from "styled-components/macro";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../store/store";
import {actions} from "../../../store/InterfaceReducer";

const CloseLookWrapper = styled.div`
  width: 70vw;
  height: 100vh;
  top: 0;
  position: absolute;
  color: white;
`;

const CloseButton = styled.div`
  position: absolute;
  font-size: 20px;
  left: 10%;
  top: 10%
`;

const ProjectCloseLook: React.FC = () => {

    const project = useSelector((state: AppStateType) => state.interface.currentlyLookedProject, shallowEqual);
    const dispatch = useDispatch();

    const closing = () => {
        dispatch(actions.closeProject())
    }

    return (
        <>
            {project === 0 &&
            <CloseLookWrapper>
                <CloseButton onClick={closing}>
                    Close X
                </CloseButton>
            </CloseLookWrapper>
            }
        </>
    )
}

export default ProjectCloseLook
