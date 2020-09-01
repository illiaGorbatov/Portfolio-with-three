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
    OPEN_ABOUT_ME_SECTION,
    OPEN_PROJECT,
    RETURNING_FROM_CLOSE_LOOK,
    SET_ABOUT_MENU_STATE,
    SET_CAMERA_STATE,
    SET_CRYSTAL_STATE,
    SET_EXPLOSION_PROGRESS,
    SET_INTERFACE_AVAILABILITY,
    SET_MAIN_PAGE_STATE,
    SET_SCROLLS,
    SET_SUN,
    SET_VIDEO,
    SET_VIDEO_PLAYER_STATE,
    STATIC_LANDSCAPE,
    TRANSITION_ABOUT_SECTION,
    TRANSITION_FROM_ABOUT_SECTION_TO_PROJECTS_STATIC,
    TRANSITION_FROM_MAIN_PAGE,
    TRANSITION_FROM_MAIN_TO_PROJECTS,
} from "../utils/StringVariablesAndTypes";

type InitialStateType = {
    scrollsCount: number,
    explosionProgress: number,
    cameraState: string,
    sun: THREE.Mesh | null,
    videos: { video: HTMLVideoElement, projectIndex: number }[],
    currentlyLookedProject: number | null,
    isMainPageFocused: boolean,
    isInterfaceAvailable: boolean,
    isCrystalExploded: boolean,
    isAboutMenuOpened: boolean,
    videoPlayerState: boolean,
    geometriesTransition: null | string
};

const initialState = {
    scrollsCount: 0,
    explosionProgress: 0,
    sun: null,
    cameraState: STATIC_LANDSCAPE,
    videos: [],
    currentlyLookedProject: null,
    isMainPageFocused: true,
    isInterfaceAvailable: false,
    isCrystalExploded: false,
    isAboutMenuOpened: false,
    videoPlayerState: false,
    geometriesTransition: null
};

const MainReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'REDUX/SET_SUN':
            return {
                ...state,
                sun: action.sun
            }
        case 'REDUX/SET_CAMERA_STATE':
            return {
                ...state,
                cameraState: action.cameraState
            }
        case 'REDUX/SET_SCROLLS':
            return {
                ...state,
                scrollsCount: action.scrollsCount
            }
        case "REDUX/SET_EXPLOSION_PROGRESS":
            return {
                ...state,
                explosionProgress: action.progress
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
                isInterfaceAvailable: action.isAvailable
            }
        case "REDUX/SET_CRYSTAL_STATE":
            return {
                ...state,
                isCrystalExploded: action.exploded
            }
        case "REDUX/SET_ABOUT_MENU_STATE":
            return {
                ...state,
                isAboutMenuOpened: action.state
            }
        case "REDUX/SET_VIDEO_PLAYER_STATE":
            return {
                ...state,
                videoPlayerState: action.play
            }
        case "REDUX/TRANSITION_FROM_MAIN_PAGE":
            return {
                ...state,
                isCrystalExploded: true,
                cameraState: TRANSITION_FROM_MAIN_TO_PROJECTS,
                isInterfaceAvailable: false
            }
        case "REDUX/OPEN_ABOUT_ME_SECTION":
            return {
                ...state,
                isAboutMenuOpened: true,
                cameraState: TRANSITION_ABOUT_SECTION,
                geometriesTransition: GEOMETRIES_TRANSITION_TO_ABOUT_SECTION,
                isInterfaceAvailable: false
            }
        case "REDUX/CLOSE_ABOUT_ME_SECTION":
            return {
                ...state,
                isAboutMenuOpened: false,
                cameraState: TRANSITION_FROM_ABOUT_SECTION_TO_PROJECTS_STATIC,
                geometriesTransition: GEOMETRIES_TRANSITION_FROM_ABOUT_SECTION,
                isInterfaceAvailable: false
            }
        case "REDUX/OPEN_PROJECT":
            return {
                ...state,
                currentlyLookedProject: action.project,
                geometriesTransition: GEOMETRIES_TRANSITION_TO_CLOSE_LOOK,
                cameraState: CLOSE_LOOK,
                isInterfaceAvailable: false
            }
        case "REDUX/CLOSE_PROJECT":
            return {
                ...state,
                currentlyLookedProject: null,
                geometriesTransition: GEOMETRIES_TRANSITION_FROM_CLOSE_LOOK,
                cameraState: RETURNING_FROM_CLOSE_LOOK,
                isInterfaceAvailable: false
            }
        default:
            return state;
    }
};

type ActionsTypes = InferActionTypes<typeof actions>;

export const actions = {
    setSun: (sun: THREE.Mesh | null) => ({type: SET_SUN, sun}) as const,
    setCameraState: (cameraState: string) => ({type: SET_CAMERA_STATE, cameraState}) as const,
    setScrollsCount: (scrollsCount: number) => ({type: SET_SCROLLS, scrollsCount}) as const,
    setExplosionProgress: (progress: number) => ({type: SET_EXPLOSION_PROGRESS, progress}) as const,
    setVideo: (video: HTMLVideoElement, projectIndex: number) => ({type: SET_VIDEO, video, projectIndex}) as const,
    setMainPageState: (isFocused: boolean) => ({type: SET_MAIN_PAGE_STATE, isFocused}) as const,
    setInterfaceAvailability: (isAvailable: boolean) => ({type: SET_INTERFACE_AVAILABILITY, isAvailable}) as const,
    setCrystalExplosionState: (exploded: boolean) => ({type: SET_CRYSTAL_STATE, exploded}) as const,
    setAboutMenuState: (state: boolean) => ({type: SET_ABOUT_MENU_STATE, state}) as const,
    setVideoPlayerState: (play: boolean) => ({type: SET_VIDEO_PLAYER_STATE, play}) as const,
    transitionFromMainPaige: () => ({type: TRANSITION_FROM_MAIN_PAGE}) as const,
    openAboutMeSection: () => ({type: OPEN_ABOUT_ME_SECTION}) as const,
    closeAboutMeSection: () => ({type: CLOSE_ABOUT_ME_SECTION}) as const,
    openProject: (project: number) => ({type: OPEN_PROJECT, project}) as const,
    closeProject: () => ({type: CLOSE_PROJECT}) as const,
}

export default MainReducer