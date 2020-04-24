import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const LoginScreen = () => {
    return (
        <View style={styles.LoginScreen}>
            <Text>Login Screen</Text>
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
