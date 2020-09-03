import React, {useEffect, useMemo, useRef, useState} from 'react';
import * as THREE from 'three';
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import {shader} from "./shaderMaterial";
import {BufferGeometryUtils} from "three/examples/jsm/utils/BufferGeometryUtils";
import {useFrame} from "react-three-fiber";
import {animated, useSpring} from 'react-spring/three';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../store/store";
import {Vector3Type} from "../../../utils/StringVariablesAndTypes";
import {actions} from "../../../store/InterfaceReducer";

interface CustomMesh extends THREE.Mesh {
    geometry: THREE.BufferGeometry
}

interface CustomObject extends THREE.Object3D {
    children: CustomMesh[]
}

type StateType = {
    innerMesh: THREE.BufferGeometry | null,
    outerMesh: THREE.BufferGeometry | null
}

const processSurface = (object: CustomObject, index: number) => {
    let coords = object.position;
    let surface = object.children[0].geometry.clone().applyMatrix4(
        new THREE.Matrix4().makeTranslation(coords.x, coords.y, coords.z)
    );
    let volume = object.children[1].geometry.clone().applyMatrix4(new THREE.Matrix4().makeTranslation(coords.x, coords.y, coords.z));

    let surfaceLength = object.children[0].geometry.attributes.position.array.length / 3;
    let volumeLength = object.children[1].geometry.attributes.position.array.length / 3;
    //  id
    let offset = new Array(surfaceLength).fill(index / 100);
    surface.setAttribute(
        "offset",
        new THREE.BufferAttribute(new Float32Array(offset), 1)
    );

    let offset1 = new Array(volumeLength).fill(index / 100);
    volume.setAttribute(
        "offset",
        new THREE.BufferAttribute(new Float32Array(offset1), 1)
    );

    // axis
    let getRandomAxis = () => {
        return new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5
        ).normalize();
    };

    let axis = getRandomAxis();
    let axes = new Array(surfaceLength * 3).fill(0);
    let axes1 = new Array(volumeLength * 3).fill(0);
    for (let i = 0; i < surfaceLength * 3; i = i + 3) {
        axes[i] = axis.x;
        axes[i + 1] = axis.y;
        axes[i + 2] = axis.z;
    }
    surface.setAttribute(
        "axis",
        new THREE.BufferAttribute(new Float32Array(axes), 3)
    );
    for (let i = 0; i < volumeLength * 3; i = i + 3) {
        axes1[i] = axis.x;
        axes1[i + 1] = axis.y;
        axes1[i + 2] = axis.z;
    }
    volume.setAttribute(
        "axis",
        new THREE.BufferAttribute(new Float32Array(axes1), 3)
    );

    let getCentroid = (geometry: THREE.BufferGeometry) => {
        let ar = geometry.attributes.position.array;
        let len = ar.length;
        let x = 0,
            y = 0,
            z = 0;
        for (let i = 0; i < len; i = i + 3) {
            x += ar[i];
            y += ar[i + 1];
            z += ar[i + 2];
        }
        return {x: (3 * x) / len, y: (3 * y) / len, z: (3 * z) / len};
    }

    let centroidVector = getCentroid(surface);
    let centroid = new Array(surfaceLength * 3).fill(0);
    let centroid1 = new Array(volumeLength * 3).fill(0);
    for (let i = 0; i < surfaceLength * 3; i = i + 3) {
        centroid[i] = centroidVector.x;
        centroid[i + 1] = centroidVector.y;
        centroid[i + 2] = centroidVector.z;
    }
    for (let i = 0; i < volumeLength * 3; i = i + 3) {
        centroid1[i] = centroidVector.x;
        centroid1[i + 1] = centroidVector.y;
        centroid1[i + 2] = centroidVector.z;
    }
    surface.setAttribute(
        "centers",
        new THREE.BufferAttribute(new Float32Array(centroid), 3)
    );
    volume.setAttribute(
        "centers",
        new THREE.BufferAttribute(new Float32Array(centroid1), 3)
    );

    return {surface, volume};
};

const texturesUrl = ['../textures/newsky/px.jpg', '../textures/newsky/nx.jpg', '../textures/newsky/py.jpg',
    '../textures/newsky/ny.jpg', '../textures/newsky/pz.jpg', '../textures/newsky/nz.jpg']

const sign = (number: number) => number === 0 ? 1 : number / Math.abs(number);


const Model: React.FC = () => {

    const isCrystalExploded = useSelector((state: AppStateType) => state.interface.isCrystalExploded, shallowEqual);

    const dispatch = useDispatch();

    const textures = useMemo(() => {
        const textures = new THREE.CubeTextureLoader().load(texturesUrl);
        textures.minFilter = THREE.LinearFilter;
        return textures
    }, []);

    const outerShader = useMemo(() => {
        let shaderMat = shader;
        shaderMat.uniforms.inside.value = 1;
        return shaderMat
    }, []);

    const [{innerMesh, outerMesh}, setS] = useState<StateType>({innerMesh: null, outerMesh: null});

    useEffect(() => {
        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/draco-gltf/');
        loader.setDRACOLoader(dracoLoader);

        loader.load("model/ico-more.glb",
            (gltf) => {
                let voronoiObj: THREE.Object3D[] = [];
                gltf.scene.traverse((child) => {
                    if (child.name === "Voronoi_Fracture") {
                        if (child.children[0].children.length > 2) {
                            child.children.forEach(f => {
                                f.children.forEach(m => {
                                    voronoiObj.push(m.clone());
                                });
                            });
                        } else {
                            child.children.forEach(m => {
                                voronoiObj.push(m.clone());
                            });
                        }
                    }
                });

                let innerGeometry: THREE.BufferGeometry[] = [];
                let outerGeometry: THREE.BufferGeometry[] = [];
                let j = 0;
                voronoiObj = voronoiObj.filter(v => {
                    if (v instanceof THREE.Mesh) return false;
                    else {
                        j++;
                        let processedSurface = processSurface(v as CustomObject, j);
                        outerGeometry.push(processedSurface.surface);
                        innerGeometry.push(processedSurface.volume);
                        return true;
                    }
                });

                let innerMesh = BufferGeometryUtils.mergeBufferGeometries(
                    innerGeometry,
                    false
                );
                innerMesh.computeBoundingSphere();

                let outerMesh = BufferGeometryUtils.mergeBufferGeometries(
                    outerGeometry,
                    false
                );
                outerMesh.computeBoundingSphere();
                setS({innerMesh, outerMesh});
            }
        );
    }, []);

//explosion
    const [{progress, position}, setAnimation] = useSpring(() => ({
        progress: 0,
        position: [0, 0, -310],
    }));

    const group = useRef<THREE.Group>(new THREE.Group());

    useEffect(() => {
        if (!isCrystalExploded) setAnimation({progress: 0});
        if (isCrystalExploded) setAnimation({
            progress: 5,
            onRest: () => dispatch(actions.setMainPageState(false))
        });
    }, [isCrystalExploded, dispatch, setAnimation]);

    //mouseEvent
    const mouseCoords = useRef<number[]>([0, 0]);
    const mouseX = useRef(0);
    const mouseY = useRef(0);
    useEffect(() => {
        const onMouseMoveHandler = (e: MouseEvent) => mouseCoords.current = [e.clientX, e.clientY];
        if (!isCrystalExploded) {
            window.addEventListener('mousemove', onMouseMoveHandler);
        }
        return (() => {
                window.removeEventListener('mousemove', onMouseMoveHandler)
        })
    }, [isCrystalExploded]);

    useFrame(() => {
        let targetMouseX = 2 * (mouseCoords.current[0] - window.innerWidth / 2) / window.innerWidth;
        let targetMouseY = 2 * (mouseCoords.current[1] - window.innerHeight / 2) / window.innerHeight;
        mouseX.current += (targetMouseX - mouseX.current) * 0.05;
        mouseY.current += (targetMouseY - mouseY.current) * 0.05;
        let ta = Math.abs(mouseX.current);
        let taY = Math.abs(mouseY.current);
        group.current.rotation.x = Math.PI / 2 - taY * (2 - taY) * Math.PI * sign(mouseY.current);
        group.current.rotation.y = Math.PI / 2 - ta * (2 - ta) * Math.PI * sign(mouseX.current);
        group.current.rotation.z = Math.PI / 2 - ta * (2 - ta) * Math.PI * sign(mouseX.current);
    });

    return (
        <animated.group ref={group} position={position as unknown as Vector3Type}>
            <mesh>
                <bufferGeometry attach="geometry" {...innerMesh}/>
                <animated.shaderMaterial uniforms-progress-value={progress} attach="material" args={[shader]}
                                         uniforms-tCube-value={textures}/>
            </mesh>
            <mesh>
                <bufferGeometry attach="geometry" {...outerMesh}/>
                <animated.shaderMaterial uniforms-progress-value={progress} attach="material" args={[outerShader]}
                                         uniforms-tCube-value={textures}/>
            </mesh>
        </animated.group>
    )
};

export default React.memo(Model)