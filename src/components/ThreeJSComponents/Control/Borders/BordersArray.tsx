import React, {useEffect} from 'react';
import {useSprings} from 'react-spring/three';
import SingleBorder from "./SingleBorder";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../store/store";
import {actions} from "../../../../store/InterfaceReducer";
import {CLOSE_LOOK} from "../../../../utils/StringVariablesAndTypes";


const BordersArray: React.FC = () => {

    const isMainPageFocused = useSelector((state: AppStateType) => state.interface.isMainPageFocused, shallowEqual);
    const project = useSelector((state: AppStateType) => state.interface.currentlyLookedProject, shallowEqual);

    const [springs, setSprings] = useSprings(40, i => ({
        theta: 0,
        position: [0, 0, 10],
        config: {
            mass: 100,
            tension: 400,
            friction: 400,
            clamp: true,
        }
    }));

    useEffect(() => {
        if (!isMainPageFocused) {
            /*setSprings(i => ({
                to: async animate => {
                    await animate({position: [0, 0, 3 - i * 4]});
                    await animate({
                        loop: {reverse: true},
                        to: async (next) => {
                            await next({theta: -Math.PI / 2 - 0.004 * (i * i) - i * 0.06});
                            await next({theta: 0});
                        }
                    })
                }
            }));*/
            setSprings(i => ({
                position: [0, 0, 3 - i * 4]
            })).then(() => setSprings(i => ({
                to: async (next) => {
                    await next({
                        theta: -Math.PI / 2 - 0.004 * (i * i) - i * 0.06,
                        config: {duration: 5000}
                    });
                    await next({
                        from: {theta: -Math.PI / 2 - 0.004 * (i * i) - i * 0.06},
                        to: {theta: (-Math.PI / 2 - 0.004 * (i * i) - i * 0.06) - Math.PI},
                        loop: true,
                        config: {duration: 5000}
                    });
                }
            })))
        }
        if (isMainPageFocused) {
            setSprings(i => ({
                cancel: true
            })).then(() => setSprings(i => ({
                theta: 0,
                position: [0, 0, 10]
            })))
        }
    }, [isMainPageFocused]);

    useEffect(() => {
        if (project !== null) {
            setSprings(i => ({
                cancel: true
            })).then(() => setSprings(i => ({
                theta: 0
            })))
        }
        if (project === null && !isMainPageFocused) {
            setSprings(i => ({
                loop: {reverse: true},
                to: async (next) => {
                    await next({theta: -Math.PI / 2 - 0.004 * (i * i) - i * 0.06});
                    await next({theta: 0});
                }
            }))
        }
    }, [project]);

    return (
        <>
            {springs.map((spring, i) =>
                <SingleBorder
                    key={i}
                    scale={[0.6, 1, 1]}
                    position={spring.position}
                    rotation={spring.theta}
                />
            )}
        </>
    );
}

export default BordersArray