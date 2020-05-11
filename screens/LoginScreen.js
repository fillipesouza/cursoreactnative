import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import * as userActions from '../store/user_actions';
import * as Yup from "yup";
import { Formik } from "formik";
import { MyForm, MyInput, MyDropDown } from '../components/FormComponents';


const validationSchema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().min(6)
});

const LoginScreen = (props) => {

    const token = useSelector(state => state.users.token);
    const [isSignUp, setisSignUp] = useState(false);

    const dispatch = useDispatch();

    const authenticateUser = async (values) => {
       
        const { email, password } = values;
        console.log(email, password);
        try {
            await dispatch(userActions.authenticateUser(email, password, isSignUp));
            props.navigation.navigate('Home');
        
        } catch (error) {

        }
    }

    return (
        <ScrollView>
            <View style={styles.LoginScreen}>
                <Formik
                    onSubmit={values => authenticateUser(values)}
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                >{props => {
                    return (
                        <MyForm>
                            <MyInput label="Your Email" name="email" type="text" />
                            <MyInput label="Your Password" name="password" type="password" />
                            <Button onPress={props.handleSubmit} title={
                                isSignUp ? 'Sign Up' : 'Sign In'
                            } />
                            <Button onPress={() => setisSignUp(state => !state)} title={
                                isSignUp ? 'Go to Login' : 'Go to Sign Up'
                            } />
                        </MyForm>
                    )
                }}
                </Formik>
                <View>
                    <Text>{token? 'Usuário Logado': 'Usuário Não Logado'}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

export default LoginScreen

const styles = StyleSheet.create({
    LoginScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
