import create from 'zustand';
import * as THREE from 'three';
import {STATIC_LANDSCAPE, LANDSCAPE} from "./StringVariablesAndTypes";

type Store = {
    isNavMenuOpened: boolean,
    mouseCoords: number[],
    scrolled: number,
    exploded: boolean,
    scene: string,
    cameraState: string,
    sun: THREE.Mesh | null,
    starsAndSkyState: string,
    setNavMenuState: (state: boolean) => void,
    mouseMove: ([x, y]: number[]) => void,
    scroll: (scrolled: number) => void,
    setExploded: (exploded: boolean) => void,
    setCurrentScene: (scene: string) => void,
    setSun: (sun: THREE.Mesh | null) => void,
    setCameraState: (cameraState: string) => void,
    setStarsAndSkyState: (starsState: string) => void
}

const [useStore, { subscribe, getState }] = create<Store>(set => ({
    isNavMenuOpened: false,
    mouseCoords: [0, 0],
    scrolled: 0,
    exploded: false,
    scene: LANDSCAPE,
    sun: null,
    cameraState: STATIC_LANDSCAPE,
    starsAndSkyState: '',
    setNavMenuState: (isNavMenuOpened) => set({isNavMenuOpened}),
    mouseMove: ([x, y]) => set({mouseCoords: [x, y]}),
    scroll: (scrolled) => set({scrolled}),
    setExploded: (exploded) => set({exploded}),
    setCurrentScene: (scene) => set({scene}),
    setSun: (sun) => set({sun}),
    setCameraState: (cameraState) => set({cameraState}),
    setStarsAndSkyState: (starsAndSkyState) => set({starsAndSkyState})
}))

export {useStore, subscribe, getState}