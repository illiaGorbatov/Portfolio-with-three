import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components/macro";
import {projectsInfo, ProjectType} from "../../../../textAndPrijectsInfo/TextAndProjectsSettings";
import {animated, useSprings, useSpring} from 'react-spring';
import ProsAndConsTyping from "./ProsAndConsTyping";
import {SingleContact} from "../../Interface/AboutMe/InfoBlock";
import { useDrag } from 'react-use-gesture';

const CloseLookWrapper = styled.div<{ $visible: boolean }>`
  display: ${props => props.$visible ? 'block' : 'none'};
  width: 50vw;
  height: 80vh;
  top: 10%;
  position: absolute;
  color: white;
  text-align: left;
  overflow: hidden;
  @media (min-device-height: 500px) {
     height: 100vh;
     top: 0
  }
`;

const CenteringWrapper = styled(animated.div)`
  width: 80%;
  position: absolute;
  top: 0;
  left: 20%;
  @media (min-device-height: 500px) {
      width: 80%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
  }
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

const Technologies = styled(animated.div)`
  font-size: 20px;
  font-family: 'Relative-Book';
  color: red;
  color: rgba(255, 255, 255, 0.7);
  padding-bottom: 3%;
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

const ScrollBarWrapper = styled.div`
  position: absolute;
  right: 0;
  width: 6px;
  height: 100%;
`;

const ScrollBar = styled(animated.div)<{$height: number}>`
  position: absolute;
  left: 50%;
  width: 4px;
  height: ${props => props.$height}%;
  background-color: white;
`;

type PropsType = {
    project: number | null,
    visible: boolean
}

export const CloseLook: React.FC<PropsType> = React.memo(({project, visible}) => {

    const [springs, setSprings] = useSprings(7, i => ({
        x: '-50vw'
    }));

    const [memoizedProject, setProject] = useState<ProjectType>();
    useEffect(() => {
        if (project !== null) setProject(projectsInfo[project])
    }, [project]);

    const [visibility, setVisibility] = useState<boolean>(false);

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
                delay: (6-i) * 200
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
                <Technologies style={springs[2]}>
                    {memoizedProject?.technologies}
                </Technologies>
                <References style={springs[3]}>
                    <SingleRef href={memoizedProject?.refToProject}>
                        github-pages
                    </SingleRef>
                    <SingleRef href={memoizedProject?.refToGit}>
                        source code
                    </SingleRef>
                </References>
                <ProjectDetailedDescription style={springs[4]}>
                    {memoizedProject?.detailedDescription}
                </ProjectDetailedDescription>
                <ProsAndCons style={springs[5]}>
                    Pros
                </ProsAndCons>
                <ProsAndConsTyping visible={visible} currentText={memoizedProject?.pros || ''} role={'pros'}/>
                <ProsAndCons style={springs[6]}>
                    Cons
                </ProsAndCons>
                <ProsAndConsTyping visible={visible} currentText={memoizedProject?.cons || ''} role={'cons'}/>
            </CenteringWrapper>
        </CloseLookWrapper>
    )
})

export const MobileCloseLook: React.FC<PropsType> = React.memo(({project, visible}) => {

    const ref = useRef<HTMLDivElement>(null);
    const scrolledY = useRef<number>(0);
    const scrolledPercent = useRef<number>(0);

    const [rerender, forceRerender] = useState<number>(0)
    const [scrollBarHeight, setScrollBarHeight] = useState<number>(0);

    useEffect(() => {
        forceRerender(Math.random())
    }, [visible]);
    useEffect(() => {
        setScrollBarHeight(window.innerHeight*0.8 / ref.current!.offsetHeight * 100)
    }, [rerender])

    const [springs, setSprings] = useSprings(7, i => ({
        x: '-50vw'
    }));

    const [{top, y}, setScroll] = useSpring(() => ({
        top: `${0}%`,
        y: 0
    }));

    const drugHandler = useDrag(({delta: [, y], active}) => {
        if (!visible) return;
        const border = ref.current!.offsetHeight - window.innerHeight*0.8;
        if (active) {
            const posY = -y*1.5;
            scrolledY.current = scrolledY.current + posY < border && scrolledY.current + posY > 0 ? scrolledY.current + posY
                : scrolledY.current + posY <= 0 ? 0 : border;
        }
        scrolledPercent.current = scrolledY.current / border * (100 - scrollBarHeight);
        setScroll({
            y: -scrolledY.current,
            top: `${scrolledPercent.current}%`
        });
    });

    const [memoizedProject, setProject] = useState<ProjectType>();
    useEffect(() => {
        if (project !== null) setProject(projectsInfo[project])
    }, [project]);

    const [visibility, setVisibility] = useState<boolean>(false);

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
                delay: (6-i) * 200
            })).then(() => setVisibility(false))
        }
    }, [visible, setSprings]);

    return (
        <CloseLookWrapper $visible={visibility}>
            <CenteringWrapper {...drugHandler()} ref={ref} style={{y}}>
                <ProjectName style={springs[0]}>
                    {memoizedProject?.projectName}
                </ProjectName>
                <ProjectLittleDescription style={springs[1]}>
                    {memoizedProject?.projectDescription}
                </ProjectLittleDescription>
                <Technologies style={springs[2]}>
                    {memoizedProject?.technologies}
                </Technologies>
                <References style={springs[3]}>
                    <SingleRef href={memoizedProject?.refToProject}>
                        github-pages
                    </SingleRef>
                    <SingleRef href={memoizedProject?.refToGit}>
                        source code
                    </SingleRef>
                </References>
                <ProjectDetailedDescription style={springs[4]}>
                    {memoizedProject?.detailedDescription}
                </ProjectDetailedDescription>
                <ProsAndCons style={springs[5]}>
                    Pros
                </ProsAndCons>
                <ProsAndConsTyping visible={visible} currentText={memoizedProject?.pros || ''} role={'pros'}/>
                <ProsAndCons style={springs[6]}>
                    Cons
                </ProsAndCons>
                <ProsAndConsTyping visible={visible} currentText={memoizedProject?.cons || ''} role={'cons'}/>
            </CenteringWrapper>
            <ScrollBarWrapper>
                <ScrollBar $height={scrollBarHeight} style={{top}}/>
            </ScrollBarWrapper>
        </CloseLookWrapper>
    )
})
