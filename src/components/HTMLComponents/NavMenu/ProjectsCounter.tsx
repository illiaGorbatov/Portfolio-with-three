import React, {useEffect, useRef} from 'react';
import styled from 'styled-components/macro';
import {animated, SpringStartFn, useSpring} from 'react-spring';
import {useDrag} from "react-use-gesture";
import {projectsInfo} from "../TextContent";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../store/store";
import {actions} from "../../../store/InterfaceReducer";
import {PROJECTS_SCROLLING, PROJECTS_STATIC} from "../../../utils/StringVariablesAndTypes";

const Wrapper = styled.div`
  position: absolute;
  top: 10%;
  right: 6%;
  height: 80%;
  width: 80px;
`;

const ProgressLine = styled.div<{$visible: boolean}>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: ${props => props.$visible ? '100%' : '0%'};
  background-color: white;
  transition: ${props => props.$visible ? 'height .3s .3s' : 'height .3s'};
`;

const ProgressBlock = styled(animated.div)<{$visible: boolean}>`
  top: ${props => props.$visible ? '0px' : '-500px'};
  position: absolute;
  width: 88px;
  height: 88px;
  background-color: black;
  color: white;
  cursor: grab;
  transition: ${props => props.$visible ? 'top .3s' : 'top .3s .3s'};
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

type PropsType = {
    setScroll:  SpringStartFn<{top: number, scale: number}>
}


const ProjectsCounter: React.FC<PropsType> = ({setScroll}) => {

    const scrollsCount = useSelector((state: AppStateType) => state.interface.scrollsCount, shallowEqual);
    const dispatch = useDispatch();

    const [animation, setAnimation] = useSpring(() => ({
        y: 0,
        translateY: '-50%'
    }));

    useEffect(() => {
        if (!isDrugged.current) {
            const currentPercent = (scrollsCount - 1) / (projectsInfo.length - 1);
            const newY = wrapperRef.current!.offsetHeight * currentPercent;
            currentY.current = newY;
            setAnimation({y: newY})
        }
    }, [scrollsCount]);

    const currentY = useRef<number>(0);
    const currentTop = useRef<number>(0)
    const isDrugged = useRef<boolean>(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    const onDrugHandler = useDrag(({delta: [, y], active, down, first}) => {
        if (down && first) {
            currentTop.current = -scrollsCount * (window.innerHeight * 0.3) + (scrollsCount - 1) * (window.innerHeight * 0.3);
            setScroll({scale: 0.7});
            isDrugged.current = true;
            dispatch(actions.setCameraState(PROJECTS_SCROLLING))
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
            isDrugged.current = false;
            const currentBlockPercent = (scrollsCount - 1) / (projectsInfo.length - 1);
            const staticY = currentBlockPercent * wrapperRef.current!.offsetHeight;
            currentY.current = staticY;
            setScroll({scale: 1, top: -currentBlockPercent * (projectsInfo.length-1) * window.innerHeight});
            setAnimation({y: staticY});
            dispatch(actions.setCameraState(PROJECTS_STATIC))
        }
    })

    return (
        <Wrapper ref={wrapperRef}>
            <ProgressLine $visible={scrollsCount !== 0}/>
            <ProgressBlock style={animation} {...onDrugHandler()} $visible={scrollsCount !== 0}>
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