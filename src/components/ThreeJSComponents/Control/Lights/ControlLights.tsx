import React, { useRef } from 'react';

const ControlLights: React.FC = () => {
    const frontLight = useRef();
    const backLight = useRef();

    return (
        <>
            <spotLight shadow-mapSize-width={2048} shadow-mapSize-height={2048} distance={9} angle={0.4}
                       penumbra={0.3} castShadow ref={frontLight} color={"#ff0000"} position={[0, 0, -150]}/>
            <pointLight color={"#ff0000"} position={[0, 1, -150]} intensity={0.3} />
            <spotLight ref={backLight} position={[0, 1, 3]} intensity={0.4} distance={4} color="blue"/>
            <directionalLight position={[0, 0, 0]} intensity={0.1} />
        </>
    );
}

export default ControlLights;