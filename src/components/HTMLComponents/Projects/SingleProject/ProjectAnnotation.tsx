import React from 'react';
import styled from 'styled-components/macro';

const AnnotationWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: -10%;
  transform: translateY(-50%);
  text-align: left;
  color: white;
  z-index: 10;
`;

const ProjectNameWrapper = styled.div`
  font-family: 'MADE Evolve Bold';
  font-size: 70px;
  overflow: hidden;
`;

const AnimatedProjectName = styled.div<{$isScrolling: boolean}>`
  position: relative;
  transform: translateY(${props => props.$isScrolling ? '-100' : '0'}%);
  transition: transform ${props => props.$isScrolling ? '.2s' : '.4s'}
`;

const ProjectLittleDescription = styled.div`
  font-family: 'Relative-Book';
  letter-spacing: 2px;
  font-size: 20px;
  text-transform: uppercase;
  overflow: hidden;
`;

const AnimatedDescription = styled.div<{$invisible: boolean}>`
  position: relative;
  transform: translateY(${props => props.$invisible ? '-100' : '0'}%);
  transition: transform ${props => props.$invisible ? '.2s' : '.4s .3s'}
`;

type PropsType = {
    isScrolling: boolean,
    isDrugging: boolean
}

const ProjectAnnotation: React.FC<PropsType> = ({isScrolling, isDrugging}) => {

    return (
        <AnnotationWrapper>
            <ProjectNameWrapper>
                <AnimatedProjectName $isScrolling={isScrolling}>
                    Counter Big
                </AnimatedProjectName>
            </ProjectNameWrapper>
            <ProjectLittleDescription>
                <AnimatedDescription $invisible={isScrolling || isDrugging}>
                    My Little description
                </AnimatedDescription>
            </ProjectLittleDescription>
        </AnnotationWrapper>
    )
}

export default React.memo(ProjectAnnotation)