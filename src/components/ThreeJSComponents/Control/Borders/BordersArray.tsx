import React, {useEffect, useRef} from 'react';
import {useSprings} from 'react-spring/three';
import SingleBorder from "./SingleBorder";
import {shallowEqual, useSelector} from "react-redux";
import {AppStateType} from "../../../../store/store";
import {
    GEOMETRIES_TRANSITION_FROM_ABOUT_SECTION,
    GEOMETRIES_TRANSITION_FROM_CLOSE_LOOK,
    GEOMETRIES_TRANSITION_TO_ABOUT_SECTION,
    GEOMETRIES_TRANSITION_TO_CLOSE_LOOK
} from "../../../../utils/StringVariablesAndTypes";


const BordersArray: React.FC = () => {

    const transition = useSelector((state: AppStateType) => state.interface.geometriesTransition, shallowEqual);

    const [springs, setSprings] = useSprings(40, i => ({
        theta: 0,
        config: {
            mass: 100,
            tension: 400,
            friction: 400,
            clamp: true,
        }
    }));

    const cancelsForAnimations = useRef<(() => void)[]>([]);

    useEffect(() => {
        if (transition === GEOMETRIES_TRANSITION_FROM_CLOSE_LOOK || transition === GEOMETRIES_TRANSITION_FROM_ABOUT_SECTION
            || transition === null) {
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
        if (transition === GEOMETRIES_TRANSITION_TO_CLOSE_LOOK || transition === GEOMETRIES_TRANSITION_TO_ABOUT_SECTION) {
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
    }, [transition, setSprings]);

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

export default React.memo(BordersArray)