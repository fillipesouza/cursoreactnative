import React, { useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, Button, FlatList, TextInput, ScrollView } from 'react-native'
import HealthInfo, { CoughType, RespirationLevel } from '../models/HealthInfo';
import { TextField } from "react-native-material-textfield";
import { Dropdown } from 'react-native-material-dropdown';
import Intl from 'react-native-intl';

import * as userActions from '../store/user_actions';
import * as Yup from "yup";
import { Formik } from "formik";



import UserItem from '../components/UserItem';

import { compose } from "recompose";
import {
    handleTextInput,
    withNextInputAutoFocusInput,
} from "react-native-formik";

import { withNextInputAutoFocusForm } from "react-native-formik";

const Form = withNextInputAutoFocusForm(View);

const MyInput = compose(
    handleTextInput,
    withNextInputAutoFocusInput
)(TextField);

const MyDropDown = compose(
    handleTextInput,
    withNextInputAutoFocusInput
)(Dropdown);

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
    const myHealthInfo = useSelector(state => state.users.healthInfo);


    const dispatch = useDispatch();

    const addHealthInfo = (values) => {

        const { temperature, coughType, bodyAche, respirationLevel } = values;

        const healthInfo = new HealthInfo(new Date().toISOString(), new Date(), temperature, coughType, bodyAche, respirationLevel);
        dispatch(userActions.addInfo(healthInfo));
    }

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
                        <Form>
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
                        </Form>
                    );
                }}
                </Formik>

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
    }
})
