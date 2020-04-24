import React from 'react'
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import VirusComponent from '../components/VirusComponent';
import Virus from '../models/Virus';

const VirusList = props => {
    const virusList = [
        new Virus(
            'https://static.poder360.com.br/2020/03/23312-868x644.png',
            'Covid-19',
            'It causes several diseases that may damage the patients\' lungs',
            '1'
        ),
        new Virus(
            'https://cvpvacinas.com.br/wp-content/uploads/2017/03/2015_prot_influenza_hero.jpg',
            'Influenza',
            'The most common virus for human beings',
            '2'
        ),
        new Virus(
            'https://static.poder360.com.br/2020/03/23312-868x644.png',
            'Covid-19',
            'It causes several diseases that may damage the patients\' lungs',
            '3'
        ),
        new Virus(
            'https://cvpvacinas.com.br/wp-content/uploads/2017/03/2015_prot_influenza_hero.jpg',
            'Influenza',
            'The most common virus for human beings',
            '4'
        ),
        new Virus(
            'https://static.poder360.com.br/2020/03/23312-868x644.png',
            'Covid-19',
            'It causes several diseases that may damage the patients\' lungs',
            '5'
        ),
        new Virus(
            'https://cvpvacinas.com.br/wp-content/uploads/2017/03/2015_prot_influenza_hero.jpg',
            'Influenza',
            'The most common virus for human beings',
            '6'
        ),
    ]

    return (
        <ScrollView>
            <View style={styles.container}>
                {/* {virusList.map(virus => 
          <VirusComponent imageUrl={virus.imageUrl} title={virus.title} description={virus.description} />
         )} */}
                <FlatList
                    data={virusList}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <VirusComponent
                        virus={item} navigation={props.navigation}
                    />}
                />
            </View>
        </ScrollView>

    )
}

export default VirusList

const styles = StyleSheet.create({
    container: {

        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    botoes: {
        width: '100%',
        flexDirection: "row",
        justifyContent: 'space-around',
        marginTop: 20
    },
    background: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.3
    }
})
