import create from 'zustand';

type ScenesType = {
    currentScene: string
    previousScene: string
}

type Store = {
    isNavMenuOpened: boolean,
    mouseCoords: number[],
    scrolled: number,
    exploded: boolean,
    explosionPosition: [number, number, number] | undefined,
    scenes: ScenesType,
    cameraPosition: [number, number, number],
    setNavMenuState: (state: boolean) => void,
    mouseMove: ([x, y]: number[]) => void,
    scroll: (scrolled: number) => void,
    setExploded: (exploded: boolean) => void,
    setCurrentScene: (scene: ScenesType) => void,
    setCameraPosition: (pos: [number, number, number]) => void,
    setExplosionPosition: (pos: [number, number, number]) => void,
}

const [useStore, { subscribe, getState }] = create<Store>(set => ({
    isNavMenuOpened: false,
    mouseCoords: [0, 0],
    scrolled: 0,
    exploded: false,
    explosionPosition: undefined,
    scenes: {currentScene: '', previousScene: ''},
    cameraPosition: [0, 10, 4],
    setNavMenuState: (isNavMenuOpened: boolean) => set({isNavMenuOpened}),
    mouseMove: ([x, y]) => set({mouseCoords: [x, y]}),
    scroll: (scrolled) => set({scrolled}),
    setExploded: (exploded) => set({exploded}),
    setCurrentScene: (scene) => set({scenes: scene}),
    setCameraPosition: (pos) => set({cameraPosition: pos}),
    setExplosionPosition: (pos) => set({explosionPosition: pos})
}));

export {useStore, subscribe, getState}