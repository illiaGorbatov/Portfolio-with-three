import React from 'react';
import styled from 'styled-components/macro';
import {useDispatch} from "react-redux";
import {actions} from "../../../store/InterfaceReducer";

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  transform: translateY(150%);
  right: 20%;
  text-align: left;
  color: white;
  z-index: 10;
`;

const Line = styled.div`
  position: absolute;
  width: 1px;
  height: 200%;
  background-color: white;
  left: 30%;
  transform: translateY(-120%);
`;

const Button = styled.div`
  font-family: 'Relative-Book';
  letter-spacing: 2px;
  font-size: 20px;
  text-transform: uppercase;
`;

type PropsType = {
    projectIndex: number
}

const CloseLookButton: React.FC<PropsType> = ({projectIndex}) => {

    const dispatch = useDispatch();

    const lookAtProject = () => {
        dispatch(actions.openProject(projectIndex));
    };

    return (
        <ButtonWrapper>
            <Line/>
            <Button onClick={lookAtProject}>
                About project
            </Button>
        </ButtonWrapper>
    )
}

export default CloseLookButton