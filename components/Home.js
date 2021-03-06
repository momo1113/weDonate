
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
const Home = ({ navigation }) => {
    const [items, setItems] = useState([])
    const [itemClaimed, setItemClaimed] = useState(false);
    useEffect(() => {
        axios.get('http://ec2-54-219-9-53.us-west-1.compute.amazonaws.com/')
            .then((response) => {
                setItems(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    });
    const renderItem = ({ item, key }) => {
        return (
            <TouchableOpacity onPress={() => navigation.push('Claim', item)}>
                <View style={styles.card}>
                    <Image
                        style={styles.item}
                        source={{
                            uri: `${item.url}`,
                        }}
                    />
                    <View style={styles.textes}>
                        <Text style={styles.text}> {item.product} </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.images}>
                <FlatList
                    numColumns={2}
                    data={items}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },

    images: {
        marginTop: 20,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    card: {
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2

    },
    item: {

        width: '90%',
        height: 70,
        marginLeft: 15,
        marginRight: 30,
        padding: 68,
        borderRadius: 6,
    },
    textes: {
        height: '12%',
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    // button: {
    //     backgroundColor: 'white'
    // }

});
export default Home;
