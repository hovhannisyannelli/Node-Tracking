import { AsyncStorage } from "react-native";
import { Initialize } from "./constants";

export const initialize = () => async dispatch => {
    const storage = await AsyncStorage.getItem("key")
    if(storage !== null) {
        const { lists } = JSON.parse(storage);
        dispatch({ type: Initialize.INITIALIZE
            , payload: { lists } })
    }
};
