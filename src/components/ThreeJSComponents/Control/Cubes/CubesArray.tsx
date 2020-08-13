import React, {useRef, useMemo} from "react";
import * as THREE from 'three';
import { useFrame } from "react-three-fiber";
import SingleCube from "./SingleCube";

const CubeArray: React.FC = () => {

    const [launching, setLaunching] = React.useState<number | boolean>(false);
    const launch = (index: number) => {
        setLaunching(index)
    }

    const group = useRef(new THREE.Group());

    useFrame(({ mouse }) => {
        group.current.position.x = THREE.MathUtils.lerp(
            group.current.position.x,
            mouse.x / 10,
            0.06
        );
        group.current.position.y = THREE.MathUtils.lerp(
            group.current.position.y,
            -mouse.y / 16,
            0.05
        );
    });

    const floaters = useMemo(() => {
        return [
            {
                scale: [0.3, 0.3, 0.3],
                position: [1.2, -1, -3],
                rotation: [2, 0.3, 0.5],
            },
            {
                scale: [0.3, 0.3, 0.3],
                position: [-1, 1, -4],
                rotation: [2, 0.3, 0.5],
            },
            {
                scale: [0.6, 0.6, 0.6],
                position: [0.8, 0, -6],
                rotation: [0.5, 0.3, 0.5],
            },
            { position: [-1.5, 0.1, -6], rotation: [-2, 3, 1] },
            { position: [0, 1, -2], rotation: [-2, 3, 1] },
            { position: [0, -1, -4], rotation: [-2, 3, 1] },
            { position: [1, 0, 0], rotation: [1, 4, 1] },
            { position: [-1.2, 0, 1], rotation: [1, 4, 1] },
        ];
    }, []);

    return (
        <group ref={group}>
            {floaters.map((floater, i) => (
                <SingleCube key={i}
                    setLaunching={launch}
                    isLaunching={launching === i}
                    {...floater}
                />
            ))}
        </group>
    );
}

export default CubeArray