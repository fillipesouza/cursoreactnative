export const ADD_INFO = 'ADD_INFO';

export const addInfo = (healthInfo) => {
    return {
        type: ADD_INFO,
        healthInfo 
    }
}