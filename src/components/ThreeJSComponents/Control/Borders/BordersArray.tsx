import React, {useEffect} from 'react';
import {useSprings} from 'react-spring/three';
import SingleBorder from "./SingleBorder";
import {shallowEqual, useSelector} from "react-redux";
import {AppStateType} from "../../../../store/store";


const BordersArray: React.FC = () => {

    const scrollsCount = useSelector((state: AppStateType) => state.interface.scrollsCount, shallowEqual);

    /*const [springs, setSprings] = useSprings(40, (i) => ({
        loop: { reverse: true },
        from: {theta: 0},
        to:async (next) => {
                await next({theta: -Math.PI / 2 - 0.004 * (i * i) - i * 0.06});
                await next({theta: 0});
        },
        config: {
            mass: 100,
            tension: 400,
            friction: 400,
        },
        delay: 1000 + i * 12 + i,
    }));*/

    const [springs, setSprings] = useSprings(40, (i) => ({
        theta: 0,
        position: [0, 0, 10],
        config: {
            mass: 100,
            tension: 400,
            friction: 400,
        },
    }));

    useEffect(() => {
        if (scrollsCount === 1) setSprings(i => ({
            position: [0, 0, 3 - i * 4],
            config: {
                mass: 100,
                tension: 400,
                friction: 400,
            },
            onRest: () => setSprings(i => ({
                loop: {reverse: true},
                to: async (next) => {
                    await next({theta: -Math.PI / 2 - 0.004 * (i * i) - i * 0.06});
                    await next({theta: 0});
                }
            }))
        }));
        if (scrollsCount === 0) setSprings(i => ({
            theta: 0,
            position: [0, 0, 10]
        }))
    }, [scrollsCount])

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