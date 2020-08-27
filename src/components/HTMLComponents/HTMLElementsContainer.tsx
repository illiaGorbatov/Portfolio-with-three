import React, {useEffect, useRef} from 'react';
import MainPage from "./Greetings/Main";
import ProjectsContainer from "./Projects/ProjectsContainer";
import Interface from "./NavMenu/Interface";
import styled from "styled-components/macro";
import {animated, useSpring} from "react-spring";
import {useDrag, useWheel} from 'react-use-gesture';
import {isMobile} from 'react-device-detect'
import {projectsInfo} from "./TextContent";
import ProjectsCounter from "./NavMenu/ProjectsCounter";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {actions} from "../../store/InterfaceReducer";
import {
    MAIN_SCENE_STATIC,
    PROJECTS_SCROLLING,
    PROJECTS_STATIC,
    TRANSITION_FROM_MAIN_TO_PROJECTS
} from '../../utils/StringVariablesAndTypes';

const Wrapper = styled.div`
  position: absolute;
  z-index: 10;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: transparent;
`;

const ScrollableWrapper = styled(animated.div)`
  width: 100vw;
  position: absolute;
`;


const HTMLElementsContainer: React.FC = () => {

    const scrollsCount = useSelector((state: AppStateType) => state.interface.scrollsCount, shallowEqual);
    const project = useSelector((state: AppStateType) => state.interface.currentlyLookedProject, shallowEqual);
    const isProjectsAvailable = useSelector((state: AppStateType) => state.interface.isProjectsAvailable, shallowEqual);

    const dispatch = useDispatch();

    const animationState = useRef<boolean>(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [animation, setScroll] = useSpring(() => ({
        top: window.innerHeight,
        scale: 1,
        x: 0,
        config: {tension: 100, friction: 25, clamp: true},
        onRest: () => animationState.current = false
    }));

    useEffect(() => {
        if (project !== null) setScroll({x: window.innerWidth});
        if (project === null) setScroll({x: 0});
    }, [project]);

    useEffect(() => {
        if (isProjectsAvailable) {
            setScroll({
                top: -(scrollsCount + 1) * window.innerHeight + window.innerHeight,
                onRest: () => {
                    dispatch(actions.setCameraState(PROJECTS_STATIC));
                    animationState.current = false
                }
            });
            dispatch(actions.setScrollsCount(scrollsCount + 1))
        }
    }, [isProjectsAvailable]);

    useWheel(({direction: [, y]}) => {
        if (animationState.current || project !== null) return;
        if (y > 0 && scrollsCount < projectsInfo.length) {
            animationState.current = true;
            if (scrollsCount === 0) {
                dispatch(actions.setCrystalExplosionState(true));
                dispatch(actions.setCameraState(TRANSITION_FROM_MAIN_TO_PROJECTS))
            }
            else {
                dispatch(actions.setCameraState(PROJECTS_SCROLLING));
                setScroll({
                    top: -(scrollsCount + 1) * window.innerHeight + window.innerHeight,
                    onRest: () => {
                        dispatch(actions.setCameraState(PROJECTS_STATIC));
                        animationState.current = false
                    }
                });
                dispatch(actions.setScrollsCount(scrollsCount + 1))
            }
        }
        if (y < 0 && scrollsCount !== 0) {
            animationState.current = true;
            if (scrollsCount === 1) {
                dispatch(actions.setMainPageState(true))
            }
            else dispatch(actions.setCameraState(PROJECTS_SCROLLING))
            setScroll({
                top: -(scrollsCount - 1) * window.innerHeight + window.innerHeight,
                onRest: () => {
                    dispatch(actions.setCameraState(scrollsCount === 1 ? MAIN_SCENE_STATIC : PROJECTS_STATIC));
                    animationState.current = false
                }
            });
            dispatch(actions.setScrollsCount(scrollsCount - 1))
        }
    }, {domTarget: window});

    useDrag(({swipe: [, y]}) => {
        if (!isMobile || project !== null) return;

    }, {domTarget: window, filterTaps: true, eventOptions: {passive: false}});

    return (
        <Wrapper>
            <MainPage/>
            <ScrollableWrapper style={animation} ref={wrapperRef}>
                <ProjectsContainer/>
            </ScrollableWrapper>
            <Interface/>
            <ProjectsCounter setScroll={setScroll}/>
        </Wrapper>
    )
}

export default React.memo(HTMLElementsContainer)