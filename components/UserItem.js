import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { CoughType, RespirationLevel } from '../models/HealthInfo';

const UserItem = props => {
    return (
        <View style={styles.UserItem}>
            <View style={styles.viewItem}>
                <Text>{props.userInfo.temperature}</Text>
            </View>
            <View style={styles.viewItem}>
                <Text style={{ color: props.userInfo.coughType === CoughType.HARD ? 'red' : 'black' }}>{props.userInfo.coughType}</Text>
            </View>
            <View style={styles.viewItem}><Text>{props.userInfo.bodyAche === 'YES' ? 'Yes, I have' : 'No, I do not have'}</Text>
            </View>
            <View style={styles.viewItem}>
                <Text color={{ color: props.userInfo.respirationLevel === RespirationLevel.CRITICAL ? 'red' : 'black' }}>{props.userInfo.respirationLevel}</Text>
            </View>
        </View >
    )
}

export default UserItem

const styles = StyleSheet.create({
    UserItem: {
        flexDirection: 'row'
    },
    viewItem: {
        borderWidth: 1,
        width: '25%',
        paddingHorizontal: 5
    }
})
