import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, Button, FlatList, Image, ScrollView, ActivityIndicator } from 'react-native'
import HealthInfo, { CoughType, RespirationLevel } from '../models/HealthInfo';

import * as userActions from '../store/user_actions';
import * as Yup from "yup";
import { Formik } from "formik";

import UserItem from '../components/UserItem';

import { MyForm, MyInput, MyDropDown } from '../components/FormComponents';

import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

const validationSchema = Yup.object().shape({
    temperature: Yup.number()
        .required('Are you crazy?')
        .min(2, 'You need to pass at least two numbers'),

    coughType: Yup.string()
        .required(),
    bodyAche: Yup.string()
        .required(),
    respirationLevel: Yup.string()
        .required()
});

const UserScreen = () => {
    
    const [pickedImage, setPickedImage] = useState(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const myHealthInfo = useSelector(state => state.users.healthInfo);
    const userId = useSelector(state => state.users.userId);
    const [isLoading, setisLoading] = useState(false);
    const dispatch = useDispatch();

    const verifyPermissions = async () => {       
        
        const result = await Permissions.askAsync(Permissions.LOCATION, Permissions.CAMERA, Permissions.CAMERA_ROLL);
        if (result.status !== 'granted') {
            Alert.alert('Insufficient Permission', 'You need to grant camera permissions to use this app', [{ text: 'Okay' }])
            return false;
        }
        return true;
    }

    const takeImageHandler = async () => {
        const hasPermissions = await verifyPermissions();
        if (!hasPermissions) {
            return
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });
        console.log(image);
        setPickedImage(image.uri);
        console.log(pickedImage);
        //props.onImageTaken(image.uri);
    }


    const initializeAll = useCallback(async () => {
        await verifyPermissions();
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
        }
        try{
        let location = await Location.getCurrentPositionAsync({
            timeInterval: 5000
        });
        console.log(location);
        setLocation(location);
    }catch(err){
        console.log(err);
    }
        
        
    }, [])

    useEffect(() => {
        initializeAll();
    }, [initializeAll]);


    const addHealthInfo = (values) => {

        const { temperature, coughType, bodyAche, respirationLevel } = values;

        console.log(location);

        //let latLng = { lat: -23.33, lng: -42.12 };
        let latLng = {
            lat: location.coords.latitude,
            lng: location.coords.longititude
        }

        const healthInfo = new HealthInfo(new Date(), temperature, coughType, bodyAche, respirationLevel);
        dispatch(userActions.addInfo(healthInfo, userId, latLng));
    }

    const retrieveHealthInfo = useCallback(async () => {
        setisLoading(true);
        await dispatch(userActions.fetchHealthInfo(userId));
        setisLoading(false);
    }, [dispatch, userId]);

    useEffect(() => {
        retrieveHealthInfo();
    }, [retrieveHealthInfo])

    const coughTypes = [{
        value: CoughType.HARD,
    }, {
        value: CoughType.NORMAL,
    }, {
        value: CoughType.SOFT,
    }];

    const bodyAcheYN = [
        {
            value: 'YES'
        },
        {
            value: 'NO'
        }
    ]

    const respirationLevels = [{
        value: RespirationLevel.OK,
    }, {
        value: RespirationLevel.CRITICAL
    }];

    if (isLoading) {
        return <View style={styles.container}><ActivityIndicator size="large" color="#0000ff" /></View>
    }

    if (errorMsg ) {
        return <View style={styles.container}><Text>Need Permission</Text></View>
    }

    return (
        <ScrollView>
            <View style={styles.UserScreen}>

                <FlatList
                    data={myHealthInfo}
                    renderItem={({ item }) => <UserItem
                        userInfo={item}
                    />}
                />
                <Formik
                    onSubmit={values => addHealthInfo(values)}
                    initialValues={{ temperature: myHealthInfo.temperature ? myHealthInfo.temperature : '', coughType: '', bodyAche: '', respirationLevel: '' }}
                    validationSchema={validationSchema}
                >{props => {
                    return (
                        <MyForm>
                            <MyInput label="Temperature" name="temperature" type="number" keyboardType='phone-pad' />
                            <MyDropDown style={{ width: 200 }}
                                name="coughType"
                                label='Cough Type'
                                data={
                                    coughTypes
                                }
                            />

                            <MyDropDown style={{ width: 200 }}
                                name="bodyAche"
                                label='Do you have body ache?'
                                data={
                                    bodyAcheYN
                                }
                            />
                            <MyDropDown style={{ width: 200 }}
                                name="respirationLevel"
                                label='How are you breathing?'
                                data={
                                    respirationLevels
                                }
                            />
                            <Button onPress={props.handleSubmit} title="Add Information" />
                        </MyForm>
                    );
                }}
                </Formik>
                <Button title="Take Image"  onPress={takeImageHandler} />

                {pickedImage && <Image style={styles.image} source={{uri: pickedImage}} /> }

            </View>
        </ScrollView>
    )
}

export default UserScreen

const styles = StyleSheet.create({
    UserScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 5,
        backgroundColor: '#ccc',
        borderColor: '#eee',
        borderWidth: 1
    },
})
