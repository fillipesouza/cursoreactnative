import React from 'react'
import { StyleSheet, Text, View, Button, Platform } from 'react-native'

const Cassiel = props => {
    return (
        <View style={styles.cassiel}>
           <Text style={{fontSize: 20, color: Platform.OS === 'android'? 'blue': 'black'}} >Cassiel Estranho</Text>
           <Text style={{fontSize: 30, color: props.numero<0 ? 'red': 'green'}}> {props.numero} </Text>
           <Button title="Resetar" onPress={props.reset} />
        </View>
    )
}
export default Cassiel

const styles = StyleSheet.create({
    cassiel: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        borderWidth: 1
    }
})
