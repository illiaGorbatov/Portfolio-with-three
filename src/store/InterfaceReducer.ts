import {InferActionTypes} from "./store";
import * as THREE from "three";
import {
    LANDSCAPE,
    SET_NAV_MENU_STATE,
    STATIC_LANDSCAPE,
    SET_SCENE,
    SET_SUN,
    SET_CAMERA_STATE,
    SET_SCROLLS,
    SET_EXPLOSION_PROGRESS,
    SET_VIDEO,
    SET_CURRENTLY_LOOKED_PROJECT,
    SET_MAIN_PAGE_STATE,
    SET_PROJECTS_AVAILABILITY,
    SET_CRYSTAL_STATE,
    SET_ABOUT_MENU_STATE
} from "../utils/StringVariablesAndTypes";

type InitialStateType = {
    scrollsCount: number,
    explosionProgress: number,
    scene: string,
    cameraState: string,
    sun: THREE.Mesh | null,
    videos: { video: HTMLVideoElement, projectIndex: number }[],
    starsAndSkyState: string,
    currentlyLookedProject: number | null,
    isMainPageFocused: boolean,
    isProjectsAvailable: boolean,
    isCrystalExploded: boolean,
    isAboutMenuOpened: boolean
};

const initialState = {
    scrollsCount: 0,
    explosionProgress: 0,
    scene: LANDSCAPE,
    sun: null,
    cameraState: STATIC_LANDSCAPE,
    videos: [],
    starsAndSkyState: ``,
    currentlyLookedProject: null,
    isMainPageFocused: true,
    isProjectsAvailable: false,
    isCrystalExploded: false,
    isAboutMenuOpened: false
};

const MainReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'REDUX/SET_SCENE':
            return {
                ...state,
                scene: action.scene
            }
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
        case "REDUX/SET_CURRENTLY_LOOKED_PROJECT":
            return {
                ...state,
                currentlyLookedProject : action.project
            }
        case "REDUX/SET_MAIN_PAGE_STATE":
            return {
                ...state,
                isMainPageFocused: action.isFocused
            }
        case "REDUX/SET_PROJECTS_AVAILABILITY":
            return {
                ...state,
                isProjectsAvailable: action.isAvailable
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
        default:
            return state;
    }
};

type ActionsTypes = InferActionTypes<typeof actions>;

export const actions = {
    setCurrentScene: (scene: string) => ({type: SET_SCENE, scene}) as const,
    setSun: (sun: THREE.Mesh | null) => ({type: SET_SUN, sun}) as const,
    setCameraState: (cameraState: string) => ({type: SET_CAMERA_STATE, cameraState}) as const,
    setScrollsCount: (scrollsCount: number) => ({type: SET_SCROLLS, scrollsCount}) as const,
    setExplosionProgress: (progress: number) => ({type: SET_EXPLOSION_PROGRESS, progress}) as const,
    setVideo: (video: HTMLVideoElement, projectIndex: number) => ({type: SET_VIDEO, video, projectIndex}) as const,
    setCurrentProject: (project: number | null) => ({type: SET_CURRENTLY_LOOKED_PROJECT, project}) as const,
    setMainPageState: (isFocused: boolean) => ({type: SET_MAIN_PAGE_STATE, isFocused}) as const,
    setProjectsAvailability: (isAvailable: boolean) => ({type: SET_PROJECTS_AVAILABILITY, isAvailable}) as const,
    setCrystalExplosionState: (exploded: boolean) => ({type: SET_CRYSTAL_STATE, exploded}) as const,
    setAboutMenuState: (state: boolean) => ({type: SET_ABOUT_MENU_STATE, state}) as const
}

export default MainReducer