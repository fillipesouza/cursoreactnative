import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const MyCard = props => {
    return (
        <View style={styles.MyCard}>
            {props.children}
        </View>
    )
}

export default MyCard;

const styles = StyleSheet.create({
    MyCard: {
        width: '100%',
        elevation: 5,
        shadowColor: '#ccc',
        padding: 10,
        borderRadius: 20,
        overflow: 'hidden'
    }

})
