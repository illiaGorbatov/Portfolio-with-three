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
  font-size: 50px;
`;

const ProjectLittleDescription = styled.div`
  font-family: 'Relative-Book';
  letter-spacing: 2px;
  font-size: 20px;
  text-transform: uppercase;
`;

const ProjectAnnotation: React.FC = () => {

    return (
        <AnnotationWrapper>
            <ProjectNameWrapper>
                Counter Big
            </ProjectNameWrapper>
            <ProjectLittleDescription>
                My Little description
            </ProjectLittleDescription>
        </AnnotationWrapper>
    )
}

export default ProjectAnnotation