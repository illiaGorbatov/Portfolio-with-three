import React from 'react';
import Pyramid from "./Pyramid";
import {shallowEqual, useSelector} from "react-redux";
import {AppStateType} from "../../../../store/store";
import Background from "./Background";

const AstralPlane: React.FC = () => {

    const isAboutMenuOpened = useSelector((state: AppStateType) => state.interface.isAboutMenuOpened, shallowEqual);


    return(
        <group>
            <Background opened={isAboutMenuOpened}/>
            <Pyramid opened={isAboutMenuOpened}/>
        </group>
    )
}

export default React.memo(AstralPlane)