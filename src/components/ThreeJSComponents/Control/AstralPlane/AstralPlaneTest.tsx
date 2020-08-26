import React, {useEffect} from 'react';
import Pyramid from "./Pyramid";
import {useThree} from "react-three-fiber";

const AstralPlane: React.FC = () => {

    const {camera} = useThree()
    useEffect(() => {
        camera.lookAt(0, 0, -300)
    }, [])

    return(
        <group>
            <Pyramid isBlack={true}/>
        </group>

    )
}

export default AstralPlane