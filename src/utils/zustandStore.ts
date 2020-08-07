import create from 'zustand';

type Store = {
    mouseCoords: number[],
    mouseMove: ([x, y]: number[]) => void,
}

const [useStore, { subscribe, getState }] = create<Store>(set => ({
    mouseCoords: [0, 0],
    mouseMove: ([x, y]) => set({mouseCoords: [x, y]}),
}));


export {useStore, subscribe, getState}