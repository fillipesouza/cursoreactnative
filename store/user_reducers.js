import { CoughType, RespirationLevel } from "../models/HealthInfo";
import { ADD_INFO, FETCH_HEALTH_INFO, AUTHENTICATE, LOGOFF } from "./user_actions";

const initialState = {
    healthInfo: [],
    token: null,
    userId: null,
    expiryTime: null
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
        case LOGOFF:
            return { ...state, token: null, userId: null, expiryTime: null, healthInfo: []}
    }
    return state;
}