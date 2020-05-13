import * as SecureStore from 'expo-secure-store';

import HealthInfo from "../models/HealthInfo";

export const ADD_INFO = 'ADD_INFO';
export const LOGOFF = 'LOGOFF';
export const FETCH_HEALTH_INFO = 'FETCH_HEALTH_INFO';
export const AUTHENTICATE = 'AUTHENTICATE';

const url = 'https://fiec-virus-app.firebaseio.com/';

export const logoff = () => {
    return async dispatch => {
        await SecureStore.deleteItemAsync('credentials');
        dispatch({type: LOGOFF})
    }
}

export const authenticateUser = (email, password, isSignUp) => {

    return async dispatch => {
        let command = 'signInWithPassword';
        if (isSignUp) {
            command = 'signUp';
        }

        const loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:${command}?key=AIzaSyA_7NhTOXrOyAR0seo0TppkF9QIUXIRqcQ`

        const response = await fetch(loginUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        });
        const result = await response.json();
        if( result.error ){
            console.log(result.error);
            throw error;
        }
        const { idToken, localId, expiresIn } = result;
        const expiryTime = new Date();
        expiryTime.setSeconds(expiryTime.getSeconds() + expiresIn);
        const authInfo = JSON.stringify({ idToken, localId, expiryTime: expiryTime.toString() });
        await SecureStore.setItemAsync('credentials', authInfo);

        dispatch({
            type: AUTHENTICATE,
            token: idToken,
            userId: localId,
            expiryTime
        })
    }
}

export const autoLogin = (token, userId, expiryTime) => {
    return {
        type: AUTHENTICATE,
        token,
        userId,
        expiryTime
    }
}

export const addInfo = (healthInfo, userId, latLng) => {
    return async dispatch => {
        if( !userId ) return {}
        healthInfo.lat = latLng.lat;
        healthInfo.lng = latLng.lng;
        const response = await fetch(url + 'health/' + userId + '.json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(healthInfo)
        }
        );
        const data = await response.json();
        const id = data['name'];
        healthInfo.id = id;
        console.log(healthInfo);
        dispatch({
            type: ADD_INFO,
            healthInfo
        })
    }
}


export const fetchHealthInfo = (userId) => {
    
    return async dispatch => {
        console.log(userId); 
        if( !userId ) return {}
        const response = await fetch(url + 'health/' + userId + '.json');
        const healthResponse = await response.json();

        const healthData = Object.keys(healthResponse).map(healthId => {
            const healthInfo = healthResponse[healthId];
            const health = new HealthInfo(healthInfo.time, healthInfo.temperature, healthInfo.coughType, healthInfo.bodyAche, healthInfo.respirationLevel);
            health.id = healthId;
            return health;
        });

        dispatch({
            type: FETCH_HEALTH_INFO,
            healthData
        })
    }
}


// SQLite  -- Guarda dentro do celular
// Servidor/Banco -- Guarda em um lugar externo (ou público)