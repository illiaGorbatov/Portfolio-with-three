import * as THREE from 'three';
import React, {useMemo} from 'react';
import fontFile from "../../../../assets/fonts/MADEEvolveSans_Regular.json";

type PropsType = {
    text: string
}


const BasicFont: React.FC<PropsType> = ({text}) => {


    const wordsGeometry = useMemo(() => {
        const loader = new THREE.FontLoader();
        const font = loader.parse(fontFile);
        let shapes = font.generateShapes(text, 0.5);
        let geometry = new THREE.ShapeBufferGeometry(shapes);
        geometry.computeBoundingBox();
        let xMid = -0.5 * (geometry.boundingBox!.max.x - geometry.boundingBox!.min.x);
        geometry.translate(xMid, 0, 0);
        return geometry
    }, [text]);

    return (
        <mesh geometry={wordsGeometry} position={[-5.1, -5.1, 0]}>
            <meshBasicMaterial attach="material" color={'white'} transparent={true} opacity={0.6}
                               side={THREE.DoubleSide}/>
        </mesh>
    )
}
export default React.memo(BasicFont)