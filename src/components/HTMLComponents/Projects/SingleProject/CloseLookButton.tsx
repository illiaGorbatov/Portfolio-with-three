import React from 'react';
import styled, {css, keyframes} from 'styled-components/macro';
import {useDispatch} from "react-redux";
import {actions} from "../../../../store/InterfaceReducer";

const hoverAnimation = keyframes`
  0% {right: 0}
  50% {right: 100%}
  51% {right: -100%}
  100% {right: 0}
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  transform: translateY(160%);
  right: 20%;
  text-align: left;
  color: white;
  z-index: 10;
  cursor: pointer;
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

const AnimatedText = styled.div<{$visible: boolean}>`
  position: relative;
  transform: translateY(${props => props.$visible ? 0 : -100}%);
  transition: transform ${props => props.$visible ? '.4s .3s' : '.2s'};
`;

const complexMixin = css`&:hover ${AnimatedText}{animation: .4s ${hoverAnimation} ease-in-out}`;

const Button = styled.div<{$visible: boolean}>`
  font-family: 'Relative-Book';
  letter-spacing: 2px;
  font-size: 17px;
  text-transform: uppercase;
  overflow: hidden;
  ${props => props.$visible && complexMixin}
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
            <Button onClick={lookAtProject} $visible={visible}>
                <AnimatedText $visible={visible}>
                    About project
                </AnimatedText>
            </Button>
        </ButtonWrapper>
    )
}

export default React.memo(CloseLookButton)