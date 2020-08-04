import React from 'react';
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  position: absolute;
  top: 10%;
  right: 6%;
  height: 80%;
  width: 80px;
  display: grid;
  place-items: center;
`;

const ProgressLine = styled.div`
  width: 1px;
  height: 100%;
  background-color: white;
`;

const ProgressBlock = styled.div`
  top: 50px;
  position: absolute;
  width: 88px;
  height: 88px;
  background-color: black;
  color: white;
  cursor: grab;
`;

const CurrentProject = styled.div`
  position: absolute;
  font-size: 17px;
  font-family: 'Relative-Book';
  left: 25%;
  top: 50%;
  transform: translateY(-100%);
`;

const AllProjects = styled(CurrentProject)`
  left: 75%;
  transform: translateX(-100%);
`;

const Border = styled.div`
  position: absolute;
  width: 20px;
  height: 1px;
  top: 50%;
  left: 50%;
  transform-origin: 50%;
  transform: translateX(-50%) translateY(-50%) rotate(-45deg);
  background-color: white;
`;
/*transform: rotate(-45deg) translateX(-50%) translateY(-50%);*/

const ProjectsCounter: React.FC = () => {
    return (
        <Wrapper>
            <ProgressLine/>
            <ProgressBlock>
                <CurrentProject>
                    2
                </CurrentProject>
                <Border/>
                <AllProjects>
                    3
                </AllProjects>
            </ProgressBlock>
        </Wrapper>
    )
}

export default ProjectsCounter