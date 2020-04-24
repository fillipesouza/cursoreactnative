import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import MyCard from './MyCard';

const VirusComponent = props => {
    const navigate = () => {
        props.navigation.navigate('Details',
            { virus: props.virus }
        );
    }
    return (
        <TouchableOpacity onPress={navigate}>
            <MyCard>
                <View style={styles.virus}>
                    <Image style={styles.image} source={{ uri: props.virus.imageUrl }} />
                    <View style={styles.texts}>
                        <Text>{props.virus.title}</Text>
                        <Text>{props.virus.description}</Text>
                    </View>
                </View>
            </MyCard>
        </TouchableOpacity>
    )
}

export default VirusComponent

const styles = StyleSheet.create({
    virus: {
        flexDirection: 'row'
    },
    texts: {
        fontSize: 12,
        marginLeft: 10,
        width: '70%'
    },
    image: {
        width: '30%',
        height: 100
    }
})
