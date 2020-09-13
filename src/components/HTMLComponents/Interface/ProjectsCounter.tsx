import React, {useEffect, useRef} from 'react';
import styled from 'styled-components/macro';
import {animated, SpringStartFn, useSpring} from 'react-spring';
import {useDrag} from "react-use-gesture";
import {projectsInfo} from "../../../textAndPrijectsInfo/TextAndProjectsSettings";
import {useDispatch} from "react-redux";
import {actions} from "../../../store/InterfaceReducer";

const Wrapper = styled(animated.div)`
  position: absolute;
  top: 10%;
  right: 6%;
  height: 80%;
`;

const ProgressLine = styled.div<{$visible: boolean}>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  line-height: 1px;
  height: ${props => props.$visible ? '100%' : '0%'};
  background-color: white;
  transition: ${props => props.$visible ? 'height .3s .3s' : 'height .3s'};
`;

const CurrentProject = styled.div`
  position: absolute;
  font-size: 17px;
  font-family: 'Relative-Book';
  left: 25%;
  top: 50%;
  transform: translateY(-100%);
  transition: left .3s, transform .3s;
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
  transform: translateX(-50%) translateY(-50%) rotate(-45deg);
  background-color: white;
  transition: transform .3s;
`;

const ProgressBlock = styled(animated.div)<{$visible: boolean}>`
  top: ${props => props.$visible ? '0px' : '-500px'};
  position: relative;
  width: 88px;
  height: 88px;
  background-color: black;
  color: white;
  cursor: grab;
  transition: ${props => props.$visible ? 'top .3s' : 'top .3s .3s'};
  &:active {
    cursor: grabbing
  }
  &:hover ${CurrentProject}, &:active ${CurrentProject}{
      left: 0;
      transform: translateY(-50%) translateX(40%);
  }
  &:hover ${AllProjects}, &:active ${AllProjects}{
      left: 100%;
      transform: translateY(-50%) translateX(-140%);
  }
  &:hover ${Border}, &:active ${Border}{
      transform: rotate(0deg) translateX(-50%) translateY(-50%);
  }
`;

type PropsType = {
    setScroll:  SpringStartFn<{top: number, scale: number, x: number}>,
    scrollsCount: number,
    visible: boolean,
    isMainPageFocused: boolean,
    isDrugging: boolean
}


const ProjectsCounter: React.FC<PropsType> = ({setScroll, visible, isDrugging,
                                                  isMainPageFocused, scrollsCount}) => {

    const dispatch = useDispatch();

    const [{y, x, translateY}, setAnimation] = useSpring(() => ({
        y: 0,
        x: 0,
        translateY: '-50%'
    }));

    //resize
    const mutatedHidingState = useRef<boolean>(true);
    useEffect(() => {
        let isMounted = true;
        let timeoutId: number | undefined = undefined;
        const resizeListener = () => {
            if (isMounted) {
                clearTimeout(timeoutId);
                timeoutId = window.setTimeout(() => {
                    setAnimation({
                    x: mutatedHidingState.current ? window.innerWidth/2 : 0
                    })
                }, 150);
            }
        };
        window.addEventListener('resize', resizeListener);
        return () => {
            isMounted = false;
            window.removeEventListener('resize', resizeListener);
        }
    }, [setAnimation]);

    useEffect(() => {
        if (!isDrugging) {
            const currentPercent = (scrollsCount - 1) / (projectsInfo.length - 1);
            const newY = wrapperRef.current!.offsetHeight * currentPercent;
            currentY.current = newY;
            setAnimation({y: newY})
        }
    }, [scrollsCount, setAnimation, isDrugging]);

    useEffect(() => {
        if (!visible && !isMainPageFocused) setAnimation({x: window.innerWidth/2});
        if (visible && !isMainPageFocused) setAnimation({x: 0});
        mutatedHidingState.current = !visible && !isMainPageFocused
    }, [visible, setAnimation, isMainPageFocused]);

    const currentY = useRef<number>(0);
    const currentTop = useRef<number>(0)

    const wrapperRef = useRef<HTMLDivElement>(null);

    const onDrugHandler = useDrag(({delta: [, y], active, down, first}) => {
        if (!isDrugging) {
            currentTop.current = -scrollsCount * (window.innerHeight * 0.3) + (scrollsCount - 1) * (window.innerHeight * 0.3);
            const currentPercent = currentY.current / wrapperRef.current!.offsetHeight;
            setScroll({
                scale: 0.7,
                top: currentTop.current - window.innerHeight * (projectsInfo.length-1) * 0.7 * currentPercent
            });
            dispatch(actions.startDrugging())
        }
        if (active) {
            currentY.current = currentY.current + y;
            const currentPercent = currentY.current / wrapperRef.current!.offsetHeight;
            if (y > 0 && currentPercent > scrollsCount / projectsInfo.length && scrollsCount < projectsInfo.length) {
                dispatch(actions.setScrollsCount(scrollsCount+1))
            } else if (y < 0 && currentPercent < (scrollsCount - 1) / projectsInfo.length && scrollsCount > 1) {
                dispatch(actions.setScrollsCount(scrollsCount-1))
            }
            setAnimation({y: currentY.current});
            setScroll({top: currentTop.current - window.innerHeight * (projectsInfo.length-1) * 0.7 * currentPercent})
        }
        if (!down) {
            const currentBlockPercent = (scrollsCount - 1) / (projectsInfo.length - 1);
            const staticY = currentBlockPercent * wrapperRef.current!.offsetHeight;
            currentY.current = staticY;
            setScroll({scale: 1, top: -currentBlockPercent * (projectsInfo.length-1) * window.innerHeight});
            setAnimation({y: staticY});
            dispatch(actions.stopDrugging())
        }
    }, {filterTaps: true});

    return (
        <Wrapper ref={wrapperRef} style={{x}}>
            <ProgressLine $visible={visible}/>
            <ProgressBlock style={{y, translateY}} {...onDrugHandler()} $visible={visible}>
                <CurrentProject>
                    {scrollsCount === 0 ? 1 : scrollsCount}
                </CurrentProject>
                <Border/>
                <AllProjects>
                    {projectsInfo.length}
                </AllProjects>
            </ProgressBlock>
        </Wrapper>
    )
}

export default React.memo(ProjectsCounter)