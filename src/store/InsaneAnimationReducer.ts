import {InferActionTypes} from "./store";
import {useSpring, SpringValue} from "react-spring/three";
import {SWITCH_ANIMATION_STATE} from "../utils/StringVariablesAndTypes";

/*const [spring, setSpring] = useSpring(() => ({
    sunColor: 'white',
    explosionState: 0,
    lightsColor: "#ff0000"
}));*/

const insaneAnimation = () => {

}



/*type InitialStateType = {
    isInsaneAnimationInAction: boolean,
    sunColor: SpringValue<string>,
    explosionState: SpringValue<number>,
    lightsColor: SpringValue<string>
};

const initialState = {
    isInsaneAnimationInAction: false,
    sunColor: spring.sunColor,
    explosionState: spring.explosionState,
    lightsColor: spring.lightsColor
};

const InsaneAnimationReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "REDUX/SWITCH_ANIMATION_STATE":
            return {
                ...state,
                isInsaneAnimationInAction: action.state
            }
        default:
            return state;
    }
};

type ActionsTypes = InferActionTypes<typeof actions>;

export const actions = {
    switchAnimation: (state: boolean) => ({type: SWITCH_ANIMATION_STATE, state})
}

export default InsaneAnimationReducer*/
