import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';

const VirusDetails = props => {

    const { virus } = props.route.params;
   
    return (
        <View style={styles.VirusDetails}>
            <Image style={styles.image} source={{ uri: virus.imageUrl }} />
            <View style={styles.title}>
                <Text>{virus.title}</Text>
            </View>
            <View style={styles.description}>
                <Text>{virus.description} </Text>
            </View>
            <View style={styles.details}>
                <Text style={{ color: 'white' }}>Details</Text>
                <Text>{virus.details}</Text>
            </View>

        </View>
    )
}

export default VirusDetails

const styles = StyleSheet.create({
    VirusDetails: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '80%',
        height: 200
    },
    details: {
        width: '100%',
        padding: 20,
        backgroundColor: 'brown'
    }
})
