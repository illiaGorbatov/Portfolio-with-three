import {InferActionTypes} from "./store";
import * as THREE from "three";
import {
    CLOSE_ABOUT_ME_SECTION,
    CLOSE_LOOK,
    CLOSE_PROJECT,
    GEOMETRIES_TRANSITION_FROM_ABOUT_SECTION,
    GEOMETRIES_TRANSITION_FROM_CLOSE_LOOK,
    GEOMETRIES_TRANSITION_TO_ABOUT_SECTION,
    GEOMETRIES_TRANSITION_TO_CLOSE_LOOK,
    MAIN_SCENE_STATIC,
    OPEN_ABOUT_ME_SECTION,
    OPEN_PROJECT,
    PROJECTS_SCROLLING,
    PROJECTS_STATIC,
    RETURNING_FROM_CLOSE_LOOK,
    SET_INTERFACE_AVAILABILITY,
    SET_MAIN_PAGE_STATE,
    SET_SCROLLS,
    SET_SUN,
    SET_VIDEO,
    SET_VIDEO_PLAYER_STATE,
    START_DRUGGING,
    START_SCROLLING,
    STOP_DRUGGING,
    STOP_SCROLLING,
    TRANSITION_FROM_ABOUT_SECTION_TO_PROJECTS_STATIC,
    TRANSITION_FROM_MAIN_PAGE,
    TRANSITION_FROM_MAIN_TO_PROJECTS,
    TRANSITION_TO_MAIN_PAGE,
    TRANSITION_TO_ABOUT_SECTION,
    STOP_ANY_ANIMATION,
    STOP_TRANSITION_TO_MAIN_PAGE,
    SET_LOADED_STATE,
    GEOMETRIES_TRANSITION_FROM_MAIN_PAGE,
    GEOMETRIES_TRANSITION_TO_MAIN_PAGE,
} from "../utils/StringVariablesAndTypes";

type InitialStateType = {
    loadedState: boolean,
    scrollsCount: number,
    explosionProgress: number,
    cameraState: string | null,
    sun: THREE.Mesh | null,
    videos: { video: HTMLVideoElement, projectIndex: number }[],
    currentlyLookedProject: number | null,
    isMainPageFocused: boolean,
    isInterfaceAvailable: boolean,
    isCrystalExploded: boolean,
    isAboutMenuOpened: boolean,
    videoPlayerState: boolean,
    geometriesTransition: null | string,
    druggingState: boolean,
    scrollingState: boolean
};

const initialState = {
    loadedState: false,
    scrollsCount: 0,
    explosionProgress: 0,
    sun: null,
    cameraState: null,
    videos: [],
    currentlyLookedProject: null,
    isMainPageFocused: true,
    isInterfaceAvailable: false,
    isCrystalExploded: false,
    isAboutMenuOpened: false,
    videoPlayerState: false,
    geometriesTransition: null,
    druggingState: false,
    scrollingState: false
};

const MainReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "REDUX/SET_LOADED_STATE":
            return {
                ...state,
                loadedState: true
            }
        case 'REDUX/SET_SUN':
            return {
                ...state,
                sun: action.sun
            }
        case 'REDUX/SET_SCROLLS':
            return {
                ...state,
                scrollsCount: action.scrollsCount
            }
        case "REDUX/SET_VIDEO":
            return {
                ...state,
            videos: [...state.videos, {video: action.video, projectIndex: action.projectIndex}]
            }
        case "REDUX/SET_MAIN_PAGE_STATE":
            return {
                ...state,
                isMainPageFocused: action.isFocused
            }
        case "REDUX/SET_INTERFACE_AVAILABILITY":
            return {
                ...state,
                isInterfaceAvailable: action.isAvailable,
            }
        case "REDUX/SET_VIDEO_PLAYER_STATE":
            return {
                ...state,
                videoPlayerState: action.play
            }
        case "REDUX/TRANSITION_FROM_MAIN_PAGE":
            return {
                ...state,
                isMainPageFocused: false,
                geometriesTransition: GEOMETRIES_TRANSITION_FROM_MAIN_PAGE,
                cameraState: TRANSITION_FROM_MAIN_TO_PROJECTS,
                scrollingState: true,
            }
        case "REDUX/TRANSITION_TO_MAIN_PAGE":
            return {
                ...state,
                geometriesTransition: GEOMETRIES_TRANSITION_TO_MAIN_PAGE,
                cameraState: MAIN_SCENE_STATIC,
                isInterfaceAvailable: false,
                scrollingState: true,
                scrollsCount: 0,
            }
        case "REDUX/STOP_TRANSITION_TO_MAIN_PAGE":
            return {
                ...state,
                scrollingState: false,
                isMainPageFocused: true
            }
        case "REDUX/OPEN_ABOUT_ME_SECTION":
            return {
                ...state,
                scrollingState: true,
                isAboutMenuOpened: true,
                cameraState: TRANSITION_TO_ABOUT_SECTION,
                geometriesTransition: GEOMETRIES_TRANSITION_TO_ABOUT_SECTION,
                isInterfaceAvailable: false
            }
        case "REDUX/CLOSE_ABOUT_ME_SECTION":
            return {
                ...state,
                scrollingState: true,
                isAboutMenuOpened: false,
                cameraState: TRANSITION_FROM_ABOUT_SECTION_TO_PROJECTS_STATIC,
                geometriesTransition: GEOMETRIES_TRANSITION_FROM_ABOUT_SECTION,
                isInterfaceAvailable: false
            }
        case "REDUX/OPEN_PROJECT":
            return {
                ...state,
                scrollingState: true,
                currentlyLookedProject: action.project,
                geometriesTransition: GEOMETRIES_TRANSITION_TO_CLOSE_LOOK,
                cameraState: CLOSE_LOOK,
                isInterfaceAvailable: false
            }
        case "REDUX/CLOSE_PROJECT":
            return {
                ...state,
                scrollingState: true,
                currentlyLookedProject: null,
                geometriesTransition: GEOMETRIES_TRANSITION_FROM_CLOSE_LOOK,
                cameraState: RETURNING_FROM_CLOSE_LOOK,
                videoPlayerState: false,
                isInterfaceAvailable: false
            }
        case "REDUX/START_SCROLLING":
            return {
                ...state,
                scrollingState: true,
                cameraState: PROJECTS_SCROLLING,
                scrollsCount: action.positive ? state.scrollsCount + 1 : state.scrollsCount - 1
            }
        case "REDUX/STOP_SCROLLING":
            return {
                ...state,
                scrollingState: false,
                cameraState: PROJECTS_STATIC,
            }
        case "REDUX/START_DRUGGING":
            return {
                ...state,
                cameraState: PROJECTS_SCROLLING,
                druggingState: true
            }
        case "REDUX/STOP_DRUGGING":
            return {
                ...state,
                cameraState: PROJECTS_STATIC,
                druggingState: false
            }
        case "REDUX/STOP_ANY_ANIMATION":
            return {
                ...state,
                scrollingState: false,
                isInterfaceAvailable: true
            }
        default:
            return state;
    }
};

type ActionsTypes = InferActionTypes<typeof actions>;

export const actions = {
    setLoadedState: () => ({type: SET_LOADED_STATE}) as const,
    setSun: (sun: THREE.Mesh | null) => ({type: SET_SUN, sun}) as const,
    setScrollsCount: (scrollsCount: number) => ({type: SET_SCROLLS, scrollsCount}) as const,
    setVideo: (video: HTMLVideoElement, projectIndex: number) => ({type: SET_VIDEO, video, projectIndex}) as const,
    setMainPageState: (isFocused: boolean) => ({type: SET_MAIN_PAGE_STATE, isFocused}) as const,
    setInterfaceAvailability: (isAvailable: boolean) => ({type: SET_INTERFACE_AVAILABILITY, isAvailable}) as const,
    setVideoPlayerState: (play: boolean) => ({type: SET_VIDEO_PLAYER_STATE, play}) as const,
    transitionFromMainPaige: () => ({type: TRANSITION_FROM_MAIN_PAGE}) as const,
    transitionToMainPaige: () => ({type: TRANSITION_TO_MAIN_PAGE}) as const,
    stopTransitionToMainPaige: () => ({type: STOP_TRANSITION_TO_MAIN_PAGE}) as const,
    openAboutMeSection: () => ({type: OPEN_ABOUT_ME_SECTION}) as const,
    closeAboutMeSection: () => ({type: CLOSE_ABOUT_ME_SECTION}) as const,
    openProject: (project: number) => ({type: OPEN_PROJECT, project}) as const,
    closeProject: () => ({type: CLOSE_PROJECT}) as const,
    startScrolling: (positive: boolean) => ({type: START_SCROLLING, positive}) as const,
    stopScrolling: () => ({type: STOP_SCROLLING}) as const,
    startDrugging: () => ({type: START_DRUGGING}) as const,
    stopDrugging: () => ({type: STOP_DRUGGING}) as const,
    stopAnyAnimation: () => ({type: STOP_ANY_ANIMATION}) as const,
}

export default MainReducer