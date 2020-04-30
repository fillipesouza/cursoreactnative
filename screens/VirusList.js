import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, FlatList, ScrollView, ActivityIndicator } from 'react-native'
import VirusComponent from '../components/VirusComponent';
import Virus from '../models/Virus';

import * as virusAction from '../store/virus_actions';

const VirusList = props => {
    const virusList = useSelector(state => state.virus.virusList);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();  

    const loadPage = useCallback( async () => {  // memoization 
        setLoading(true);
        await dispatch(virusAction.loadViruses());
        setLoading(false);
    }, [dispatch])

    useEffect(() => {  // componentDidMount + componentDidUpdate 
        loadPage();
    }, [loadPage])

    if (loading) {
        return <View style={styles.container}><ActivityIndicator size="large" color="#0000ff" /></View>
    }

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
