import { CoughType, RespirationLevel } from "../models/HealthInfo";
import { ADD_INFO, FETCH_HEALTH_INFO, AUTHENTICATE } from "./user_actions";

const initialState = {
    healthInfo: [],
    token: null,
    userId: null,
    
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_INFO:
            const newHealthInfo = action.healthInfo;
            return { ...state, healthInfo: state.healthInfo.concat(newHealthInfo) }
        case FETCH_HEALTH_INFO:
            
            const healthData = action.healthData;
            console.log(healthData)
            return { ...state, healthInfo: healthData };
        case AUTHENTICATE:
            return { ...state, token: action.token, userId: action.userId }
    }
    return state;
}