import {combineReducers, createStore} from "redux";
import MainReducer from "./InterfaceReducer";


type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionTypes<T extends { [key: string]: (...args: any) => any }> = ReturnType<PropertiesType<T>>

const rootReducer = combineReducers({
    interface: MainReducer,
   /* insaneAnimation: InsaneAnimationReducer*/
});

const store = createStore(rootReducer);

export default store;