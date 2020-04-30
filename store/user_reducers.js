import { CoughType, RespirationLevel } from "../models/HealthInfo";
import { ADD_INFO } from "./user_actions";

const initialState = {
    healthInfo : [],
};

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_INFO:
            const newHealthInfo = action.healthInfo;
            return { ...state, healthInfo: state.healthInfo.concat(newHealthInfo)}
    }
    return state;
}