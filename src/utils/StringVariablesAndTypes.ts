// camera state
export const MAIN_SCENE_STATIC = 'static main scene';
export const TRANSITION_FROM_MAIN_TO_PROJECTS = 'transition from main to project';
export const PROJECTS_STATIC = 'static projects scene';
export const PROJECTS_SCROLLING = 'scrolling projects scene';
export const CLOSE_LOOK = 'close look';
export const RETURNING_FROM_CLOSE_LOOK = 'returning from close look';
export const TRANSITION_TO_ABOUT_SECTION = 'about me';
export const TRANSITION_FROM_ABOUT_SECTION_TO_PROJECTS_STATIC = 'closing info';

//geometries transition
export const GEOMETRIES_TRANSITION_FROM_MAIN_PAGE = 'geometries/GEOMETRIES_TRANSITION_FROM_MAIN_PAGE';
export const GEOMETRIES_TRANSITION_TO_MAIN_PAGE = 'geometries/GEOMETRIES_TRANSITION_TO_MAIN_PAGE';
export const GEOMETRIES_TRANSITION_TO_CLOSE_LOOK = 'geometries/TRANSITION_TO_CLOSE_LOOK';
export const GEOMETRIES_TRANSITION_FROM_CLOSE_LOOK = 'geometries/TRANSITION_FROM_CLOSE_LOOK';
export const GEOMETRIES_TRANSITION_TO_ABOUT_SECTION = 'geometries/TRANSITION_TO_ABOUT_SECTION';
export const GEOMETRIES_TRANSITION_FROM_ABOUT_SECTION = 'geometries/TRANSITION_FROM_ABOUT_SECTION';

export type Vector3Type = [number, number, number];


//transition actions
export const TRANSITION_FROM_MAIN_PAGE = 'REDUX/TRANSITION_FROM_MAIN_PAGE';
export const TRANSITION_TO_MAIN_PAGE = 'REDUX/TRANSITION_TO_MAIN_PAGE';
export const STOP_TRANSITION_TO_MAIN_PAGE = 'REDUX/STOP_TRANSITION_TO_MAIN_PAGE';
export const OPEN_ABOUT_ME_SECTION = 'REDUX/OPEN_ABOUT_ME_SECTION';
export const CLOSE_ABOUT_ME_SECTION = 'REDUX/CLOSE_ABOUT_ME_SECTION';
export const OPEN_PROJECT = 'REDUX/OPEN_PROJECT';
export const CLOSE_PROJECT = 'REDUX/CLOSE_PROJECT';
export const START_SCROLLING = 'REDUX/START_SCROLLING';
export const STOP_SCROLLING = 'REDUX/STOP_SCROLLING';
export const START_DRUGGING = 'REDUX/START_DRUGGING';
export const STOP_DRUGGING = 'REDUX/STOP_DRUGGING';
export const STOP_ANY_ANIMATION = 'REDUX/STOP_ANY_ANIMATION';

//state actions
export const SET_LOADED_STATE = 'REDUX/SET_LOADED_STATE'
export const SET_SUN = 'REDUX/SET_SUN';
export const SET_SCROLLS = 'REDUX/SET_SCROLLS';
export const SET_MAIN_PAGE_STATE = 'REDUX/SET_MAIN_PAGE_STATE';
export const SET_INTERFACE_AVAILABILITY = 'REDUX/SET_INTERFACE_AVAILABILITY';
export const SET_VIDEO = `REDUX/SET_VIDEO`;
export const SET_CURRENTLY_LOOKED_PROJECT = 'REDUX/SET_CURRENTLY_LOOKED_PROJECT';
export const SET_VIDEO_PLAYER_STATE = 'REDUX/SET_VIDEO_PLAYER_STATE';



