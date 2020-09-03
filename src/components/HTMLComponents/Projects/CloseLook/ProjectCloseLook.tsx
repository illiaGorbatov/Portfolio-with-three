import React from 'react';
import styled from "styled-components/macro";

const CloseLookWrapper = styled.div<{$visible: boolean}>`
  display: ${props => props.$visible? 'block' : 'none'};
  width: 70vw;
  height: 100vh;
  top: 0;
  position: absolute;
  color: white;
`;

const CenteringWrapper = styled.div`
  width: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
`;

const ProjectName = styled.div`
  font-family: 'Relative-Book';
  letter-spacing: 2px;
  font-size: 15px;
  text-transform: uppercase;
`;

const ProjectLittleDescription = styled.div`
  font-family: 'MADE Evolve Bold';
  font-size: 50px;
`;

const CloseButton = styled.div`
  position: absolute;
  font-size: 20px;
  left: 10%;
  top: 10%
`;

type PropsType = {
    project: number | null,
    closeProject: () => void,
    visible: boolean
}

const CloseLook: React.FC<PropsType> = ({project, visible, closeProject}) => {



    return (
            <CloseLookWrapper $visible={visible}>
                <CenteringWrapper>
                    <ProjectName>

                    </ProjectName>
                    <ProjectLittleDescription>

                    </ProjectLittleDescription>
                </CenteringWrapper>
            </CloseLookWrapper>
    )
}

export default React.memo(CloseLook)
