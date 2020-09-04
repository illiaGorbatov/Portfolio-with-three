import React, {useCallback} from 'react';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../store/store";
import LeftContextButton from './LeftContextButton';
import {actions} from "../../../store/InterfaceReducer";
import Logo from './Logo';


const InterfaceContainer: React.FC = () => {

    const isInterfaceAvailable = useSelector((state: AppStateType) => state.interface.isInterfaceAvailable, shallowEqual);
    const isAboutBlockOpened = useSelector((state: AppStateType) => state.interface.isAboutMenuOpened, shallowEqual);
    const currentProject = useSelector((state: AppStateType) => state.interface.currentlyLookedProject, shallowEqual);

    const dispatch = useDispatch();

    const openInformation = useCallback(() => {
        dispatch(actions.openAboutMeSection());
    }, [dispatch]);

    const closeInformation = useCallback(() => {
        dispatch(actions.closeAboutMeSection());
    }, [dispatch]);

    const closeProject = useCallback(() => {
        dispatch(actions.closeProject())
    }, [dispatch]);

    return (
        <>
            <Logo visible={isInterfaceAvailable}/>
            <LeftContextButton closeInformation={closeInformation} openInformation={openInformation}
                               visible={isInterfaceAvailable}
                               isAboutBlockOpened={isAboutBlockOpened} closeProject={closeProject}
                               currentProject={currentProject}/>
        </>
    )
};

export default React.memo(InterfaceContainer)