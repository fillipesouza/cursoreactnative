import Virus from "../models/Virus";
import { SET_VIRUSES } from "./virus_actions";

const initialState = {
    virusList: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case SET_VIRUSES:
            const virusData = action.virusData;
            return { ...state, virusList: virusData };
    }
    return state;
}