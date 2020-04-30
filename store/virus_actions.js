export const SET_VIRUSES = 'SET_VIRUSES';

export const loadViruses = () => {
    return async dispatch => {
        console.log('Request almost done');
        const response = await fetch('http://10.0.2.2:38000/virus');
        const virusData = await response.json();
        console.log(virusData);
        dispatch({
            type: SET_VIRUSES,
            virusData
        })
    }
}