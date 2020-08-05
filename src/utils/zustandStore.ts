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
    scenes: ScenesType,
    setNavMenuState: (state: boolean) => void,
    mouseMove: ([x, y]: number[]) => void,
    scroll: (scrolled: number) => void,
    setExploded: (exploded: boolean) => void,
    setCurrentScene: (scene: ScenesType) => void,
}

const [useStore, { subscribe, getState }] = create<Store>(set => ({
    isNavMenuOpened: false,
    mouseCoords: [0, 0],
    scrolled: 0,
    exploded: false,
    scenes: {currentScene: '', previousScene: ''},
    setNavMenuState: (isNavMenuOpened: boolean) => set({isNavMenuOpened}),
    mouseMove: ([x, y]) => set({mouseCoords: [x, y]}),
    scroll: (scrolled) => set({scrolled}),
    setExploded: (exploded) => set({exploded}),
    setCurrentScene: (scene) => set({scenes: scene}),
}));

export {useStore, subscribe, getState}