import Virus from "../models/Virus";

export const SET_VIRUSES = 'SET_VIRUSES';

const url = 'https://fiec-virus-app.firebaseio.com/';

export const loadViruses = () => {
    return async dispatch => {
        console.log('Request almost done');
        //const response = await fetch('http://10.0.2.2:38000/virus');
        const response = await fetch(url + 'virus.json');
        const virusResponse = await response.json();

        const virusData = Object.keys(virusResponse).map(virusId => {
            const virus = virusResponse[virusId];
            return new Virus({
                imageUrl: virus.imageUrl,
                title: virus.title,
                description: virus.description,
                id: virusId,
            })            
        });

        dispatch({
            type: SET_VIRUSES,
            virusData
        })
    }
}