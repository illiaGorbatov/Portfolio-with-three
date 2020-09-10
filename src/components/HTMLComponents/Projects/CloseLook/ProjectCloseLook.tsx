import React, {useEffect, useState} from 'react';
import styled from "styled-components/macro";
import {projectsInfo, ProjectType} from "../../../../textAndPrijectsInfo/TextContent";
import {animated, useSprings} from 'react-spring';
import ProsAndConsTyping from "./ProsAndConsTyping";
import {SingleContact} from "../../Interface/AboutMe/InfoBlock";

const CloseLookWrapper = styled.div<{ $visible: boolean }>`
  display: ${props => props.$visible ? 'block' : 'none'};
  width: 50vw;
  height: 100vh;
  top: 0;
  position: absolute;
  color: white;
  text-align: left;
`;

const CenteringWrapper = styled.div`
  width: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
`;

const ProjectLittleDescription = styled(animated.div)`
  font-family: 'Relative-Book';
  letter-spacing: 2px;
  font-size: 20px;
  text-transform: uppercase;
  padding-bottom: 3%;
`;

const ProjectName = styled(animated.div)`
  font-family: 'MADE Evolve Bold';
  font-size: 50px;
  padding-bottom: 10%;
`;

const References = styled(animated.div)`
  padding-bottom: 7%;
`;

const SingleRef = styled(SingleContact)`
  margin-right: 5%;
`;

const ProjectDetailedDescription = styled(animated.div)`
  font-family: 'Relative-Book';
  font-size: 18px;
  padding-bottom: 7%;
`;

const ProsAndCons = styled(animated.div)`
  font-family: 'Relative-Book';
  letter-spacing: 2px;
  font-size: 15px;
  text-transform: uppercase;
  padding-bottom: 3%;
`;

type PropsType = {
    project: number | null,
    visible: boolean
}

const CloseLook: React.FC<PropsType> = ({project, visible}) => {

    const [springs, setSprings] = useSprings(6, i => ({
        x: '-50vw'
    }));

    const [memoizedProject, setProject] = useState<ProjectType>();
    useEffect(() => {
        if (project !== null) setProject(projectsInfo[project])
    }, [project])

    const [visibility, setVisibility] = useState<boolean>(false)

    useEffect(() => {
        if (visible) {
            setVisibility(true);
            setSprings(i => ({
                x: '0vw',
                delay: i * 200
            }))
        }
        if (!visible) {
            setSprings(i => ({
                x: '-50vw',
                delay: (5-i) * 200
            })).then(() => setVisibility(false))
        }
    }, [visible, setSprings]);

    return (
        <CloseLookWrapper $visible={visibility}>
            <CenteringWrapper>
                <ProjectName style={springs[0]}>
                    {memoizedProject?.projectName}
                </ProjectName>
                <ProjectLittleDescription style={springs[1]}>
                    {memoizedProject?.projectDescription}
                </ProjectLittleDescription>
                <References style={springs[2]}>
                    <SingleRef href={memoizedProject?.refToProject}>
                        github-pages
                    </SingleRef>
                    <SingleRef href={memoizedProject?.refToGit}>
                        source code
                    </SingleRef>
                </References>
                <ProjectDetailedDescription style={springs[3]}>
                    {memoizedProject?.detailedDescription}
                </ProjectDetailedDescription>
                <ProsAndCons style={springs[4]}>
                    Pros
                </ProsAndCons>
                <ProsAndConsTyping visible={visible} currentText={memoizedProject?.pros || ''} role={'pros'}/>
                <ProsAndCons style={springs[5]}>
                    Cons
                </ProsAndCons>
                <ProsAndConsTyping visible={visible} currentText={memoizedProject?.cons || ''} role={'cons'}/>
            </CenteringWrapper>
        </CloseLookWrapper>
    )
}

export default React.memo(CloseLook)
