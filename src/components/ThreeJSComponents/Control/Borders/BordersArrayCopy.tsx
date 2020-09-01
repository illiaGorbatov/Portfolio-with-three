import React, {useEffect, useRef} from 'react';
import {useSprings} from 'react-spring/three';
import SingleBorder from "./SingleBorder";
import {shallowEqual, useSelector} from "react-redux";
import {AppStateType} from "../../../../store/store";


const BordersArrayCopy: React.FC = () => {

    const isMainPageFocused = useSelector((state: AppStateType) => state.interface.isMainPageFocused, shallowEqual);
    const project = useSelector((state: AppStateType) => state.interface.currentlyLookedProject, shallowEqual);

    const [springs, setSprings] = useSprings(40, i => ({
        theta: 0,
        position: [0, 0, 3 - i * 4],
        config: {
            mass: 100,
            tension: 400,
            friction: 400,
            clamp: true,
        }
    }));

    const cancelsForAnimations = useRef<(() => void)[]>([]);

    useEffect(() => {
        if (!isMainPageFocused && project === null) {
            cancelsForAnimations.current.forEach(cancel => cancel());
            cancelsForAnimations.current = [];
            setSprings(i => ({
                to: async (next) => {
                    let cancelled = false;
                    const cancel = () => cancelled = true;
                    cancelsForAnimations.current.push(cancel)
                    !cancelled && await next({
                        theta: -Math.PI / 2 - 0.004 * (i * i) - i * 0.06,
                        config: {duration: 5000}
                    });
                    !cancelled && await next({
                        theta: (-Math.PI / 2 - 0.004 * (i * i) - i * 0.06) - Math.PI,
                        config: {duration: 5000}
                    });
                    !cancelled && await next({
                        theta: (-Math.PI / 2 - 0.004 * (i * i) - i * 0.06),
                        immediate: true
                    });
                },
                loop: true,
            }))
        }
        if (isMainPageFocused) {
            cancelsForAnimations.current.forEach(cancel => cancel());
            cancelsForAnimations.current = [];
            setSprings(i => ({
                cancel: true,
                loop: false
            })).then(() => setSprings(i => ({
                theta: 0,
                config: {duration: undefined}
            })))
        }
        if (project !== null) {
            cancelsForAnimations.current.forEach(cancel => cancel());
            cancelsForAnimations.current = [];
            setSprings(i => ({
                cancel: true,
                loop: false
            })).then(() => setSprings(i => ({
                theta: 0,
                config: {duration: undefined}
            }))).then(() => setSprings(i => ({
                to: async (next) => {
                    let cancelled = false;
                    const cancel = () => cancelled = true;
                    cancelsForAnimations.current.push(cancel)
                    !cancelled && await next({
                        position: [Math.random() * 2, Math.random() * 2, 3 - i * 4],
                        config: {duration: 200 + Math.random() * 300},
                        delay: Math.random() * 500
                    });
                    !cancelled && await next({
                        position: [Math.random() * 2, Math.random() * 2, 3 - i * 4],
                        config: {duration: 200 + Math.random() * 300},
                        delay: Math.random() * 500
                    })
                },
                loop: true
            })))
        }
    }, [isMainPageFocused, project]);

    return (
        <>
            {springs.map((spring, i) =>
                <SingleBorder
                    key={i}
                    scale={[0.6, 1, 1]}
                    position={[0, 0, 3 - i * 4]}
                    rotation={spring.theta}
                />
            )}
        </>
    );
}

export default React.memo(BordersArrayCopy)