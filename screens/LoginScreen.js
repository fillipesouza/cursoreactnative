import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native'

const LoginScreen = () => {
    const myHealthInfo = useSelector(state => state.users.healthInfo);
    return (
        <View style={styles.LoginScreen}>
            <Text>{myHealthInfo[0].temperature}</Text>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    LoginScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
