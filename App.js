import 'react-native-gesture-handler';

import React, {useState, useEffect} from 'react';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, useSelector } from 'react-redux';

import userReducer from './store/user_reducers';
import virusReducer from './store/virus_reducers';
import thunkMiddleware from 'redux-thunk';

import {init} from './helpers/db';

init().then(() => {
  console.log('Initialized Database');
}).catch(err=> {
  console.log('Initializing db failed')
  console.log(err);
})


const rootReducer = combineReducers({
  virus : virusReducer,
  users : userReducer,
  
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

import { Text, View, Button, Vibration, Platform } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';


import Main from './navigator/navigation';



export default function App () {

  

  const [expoPushToken, setToken] = useState('');
  const [notification, setNotification] = useState({});
  let notificationSubscription;
  let channelId;

  const registerForPushNotificationsAsync = async () => {
    //if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      setToken(token);

      

      await registerApp();
      Notifications.addListener(_handleNotification);
    

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('important', {
        name: 'important',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  

  const _handleNotification = async notification => {
    
    Vibration.vibrate(); 
    // console.log(notification);
    setNotification(notification);
    
    
  };

  const registerApp = async () => {
    await fetch('http://192.168.15.23:38000/topic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ token: expoPushToken})
    }); 
  }

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  
  
  return <Provider store={store} ><Main /></Provider>
}

