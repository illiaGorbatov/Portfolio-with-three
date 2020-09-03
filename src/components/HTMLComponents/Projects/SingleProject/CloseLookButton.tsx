import React from 'react';
import styled from 'styled-components/macro';
import {useDispatch} from "react-redux";
import {actions} from "../../../../store/InterfaceReducer";

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  transform: translateY(160%);
  right: 20%;
  text-align: left;
  color: white;
  z-index: 10;
`;

const Line = styled.div<{$visible: boolean}>`
  position: absolute;
  top: 0;
  width: 1px;
  height: ${props => props.$visible ? 200 : 0}%;
  transition: height ${props => props.$visible ? '.3s' : '.2s'};
  background-color: white;
  left: 30%;
  transform: translateY(-120%);
`;

const Button = styled.div`
  font-family: 'Relative-Book';
  letter-spacing: 2px;
  font-size: 20px;
  text-transform: uppercase;
  overflow: hidden;
`;

const AnimatedText = styled.div<{$visible: boolean}>`
  position: relative;
  transform: translateY(${props => props.$visible ? 0 : -100}%);
  transition: transform ${props => props.$visible ? '.4s .3s' : '.2s'};
`;

type PropsType = {
    projectIndex: number,
    visible: boolean
}

const CloseLookButton: React.FC<PropsType> = ({projectIndex, visible}) => {

    const dispatch = useDispatch();

    const lookAtProject = () => {
        dispatch(actions.openProject(projectIndex));
    };

    return (
        <ButtonWrapper>
            <Line $visible={visible}/>
            <Button onClick={lookAtProject}>
                <AnimatedText $visible={visible}>
                    About project
                </AnimatedText>
            </Button>
        </ButtonWrapper>
    )
}

export default React.memo(CloseLookButton)