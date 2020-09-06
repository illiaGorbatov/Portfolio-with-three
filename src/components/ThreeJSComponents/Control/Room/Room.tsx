import React, {useEffect, useMemo} from 'react';
import * as THREE from 'three';
import {animated, useSprings} from 'react-spring/three';
import {Vector3Type} from "../../../../utils/StringVariablesAndTypes";
import {shallowEqual, useSelector} from "react-redux";
import {AppStateType} from "../../../../store/store";

const Room: React.FC = () => {

    const project = useSelector((state: AppStateType) => state.interface.currentlyLookedProject, shallowEqual);

    const {extrudeShape, extrudeSettings} = useMemo(() => {

        const extrudeShape = new THREE.Shape();
        extrudeShape.moveTo(-51.2, -19.2);
        extrudeShape.lineTo(51.2, -19.2);
        extrudeShape.lineTo(51.2, 19.2);
        extrudeShape.lineTo(-51.2, 19.2);

        const hole = new THREE.Path();
        hole.moveTo(-32, -12.8);
        hole.lineTo(32, -12.8);
        hole.lineTo(32, 12.8);
        hole.lineTo(-32, 12.8);
        extrudeShape.holes.push(hole);
        //width: 64, height: 25,6
        //19.2 12.8
        const extrudeSettings = {
            steps: 1,
            depth: 16,
            bevelEnabled: false,
        }

        return {extrudeShape, extrudeSettings};
    }, []);

    const [springs, setSprings] = useSprings(2,i => ({
        scale: i === 0 ? [0.6, 1, 1] : [0.6, 1, 2],
        config: {duration: 700}
    }));

    useEffect(() => {
        if (project !== null) setSprings(i => {
            if (i === 0) return {
                to: async (next) => {
                    await next({
                        scale: [0.6, 0.5, 1],
                        delay: 3000
                    });
                    await next({
                        scale: [0.3, 0.5, 1],
                    })
                }
            }
            return {
                to: async (next) => {
                    await next({
                        scale: [0.6, 0.7, 2],
                        delay: 1000
                    });
                    await next({
                        scale: [0.4, 0.7, 2],
                    })
                }
            }
        });
        if (project === null) setSprings(i => {
            if (i === 0) return {
            to: async (next) => {
                await next({
                    scale: [0.3, 1, 1],
                });
                await next({
                    scale: [0.6, 1, 1],
                })
            }
        }
        return {
            to: async (next) => {
                await next({
                    scale: [0.4, 1, 2],
                    delay: 1500
                });
                await next({
                    scale: [0.6, 1, 2],
                })
            }
        }
        })
    }, [project, setSprings])

    return (
        <>
        {springs.map(({scale}, i) =>
                <animated.mesh scale={scale as unknown as Vector3Type} key={i}
                               position={i === 0 ? [0, 0, 23] : [0, 0, 39]} castShadow receiveShadow>
                    <extrudeBufferGeometry attach="geometry" args={[extrudeShape, extrudeSettings]}/>
                    <meshStandardMaterial attach="material" color="#6a040f" roughness={0.7} shadowSide={THREE.FrontSide}/>
                </animated.mesh>
            )}
        </>
    );
}

export default React.memo(Room)