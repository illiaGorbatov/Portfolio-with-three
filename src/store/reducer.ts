import {InferActionTypes} from "./store";
import * as THREE from "three";
import {
    LANDSCAPE,
    SET_NAV_MENU_STATE,
    STATIC_LANDSCAPE,
    SET_EXPLODED_STATE,
    SET_SCENE,
    SET_SUN,
    SET_CAMERA_STATE,
    SET_STARS_AND_SKY_STATE,
    SET_SCROLLS
} from "../utils/StringVariablesAndTypes";

type InitialStateType = {
    isNavMenuOpened: boolean,
    scrollsCount: number,
    exploded: boolean,
    scene: string,
    cameraState: string,
    sun: THREE.Mesh | null,
    starsAndSkyState: string,
};

const initialState = {
    isNavMenuOpened: false,
    scrollsCount: 0,
    mouseCoords: [0, 0],
    exploded: false,
    scene: LANDSCAPE,
    sun: null,
    cameraState: STATIC_LANDSCAPE,
    starsAndSkyState: '',
};

const MainReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'REDUX/SET_NAV_MENU_STATE':
            return {
                ...state,
                isNavMenuOpened: action.isNavMenuOpened
            }
        case 'REDUX/SET_EXPLODED_STATE':
            return {
                ...state,
                exploded: action.exploded
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
        case 'REDUX/SET_STARS_AND_SKY_STATE':
            return {
                ...state,
                starsAndSkyState: action.starsAndSkyState
            }
        case 'REDUX/SET_SCROLLS':
            return {
                ...state,
                scrollsCount: action.scrollsCount
            }
        default:
            return state;
    }
};

type ActionsTypes = InferActionTypes<typeof actions>;

export const actions = {
    setNavMenuState: (isNavMenuOpened: boolean) => ({type: SET_NAV_MENU_STATE, isNavMenuOpened}) as const,
    setExploded: (exploded: boolean) => ({type: SET_EXPLODED_STATE, exploded}) as const,
    setCurrentScene: (scene: string) => ({type: SET_SCENE, scene}) as const,
    setSun: (sun: THREE.Mesh | null) => ({type: SET_SUN, sun}) as const,
    setCameraState: (cameraState: string) => ({type: SET_CAMERA_STATE, cameraState}) as const,
    setStarsAndSkyState: (starsAndSkyState: string) => ({type: SET_STARS_AND_SKY_STATE, starsAndSkyState}) as const,
    setScrollsCount: (scrollsCount: number) => ({type: SET_SCROLLS, scrollsCount}) as const,
}

export default MainReducer