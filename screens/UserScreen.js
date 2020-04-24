import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const UserScreen = () => {
    return (
        <View style={styles.UserScreen}>
            <Text>Tela do Usuário Feliz</Text>
        </View>
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
