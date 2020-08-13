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
    SET_VIDEO
} from "../utils/StringVariablesAndTypes";

type InitialStateType = {
    isNavMenuOpened: boolean,
    scrollsCount: number,
    explosionProgress: number,
    scene: string,
    cameraState: string,
    sun: THREE.Mesh | null,
    videos: { video: HTMLVideoElement, projectIndex: number }[],
    starsAndSkyState: string
};

const initialState = {
    isNavMenuOpened: false,
    scrollsCount: 0,
    mouseCoords: [0, 0],
    explosionProgress: 0,
    scene: LANDSCAPE,
    sun: null,
    cameraState: STATIC_LANDSCAPE,
    videos: [],
    starsAndSkyState: ``
};

const MainReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'REDUX/SET_NAV_MENU_STATE':
            return {
                ...state,
                isNavMenuOpened: action.isNavMenuOpened
            }
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
        default:
            return state;
    }
};

type ActionsTypes = InferActionTypes<typeof actions>;

export const actions = {
    setNavMenuState: (isNavMenuOpened: boolean) => ({type: SET_NAV_MENU_STATE, isNavMenuOpened}) as const,
    setCurrentScene: (scene: string) => ({type: SET_SCENE, scene}) as const,
    setSun: (sun: THREE.Mesh | null) => ({type: SET_SUN, sun}) as const,
    setCameraState: (cameraState: string) => ({type: SET_CAMERA_STATE, cameraState}) as const,
    setScrollsCount: (scrollsCount: number) => ({type: SET_SCROLLS, scrollsCount}) as const,
    setExplosionProgress: (progress: number) => ({type: SET_EXPLOSION_PROGRESS, progress}) as const,
    setVideo: (video: HTMLVideoElement, projectIndex: number) => ({type: SET_VIDEO, video, projectIndex}) as const
}

export default MainReducer