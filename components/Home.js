
import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, } from 'react-native';
import items from '../items/items.js'

const Home = ({ navigation }) => {
    const renderItem = ({ item, key }) => {
        return (
            <TouchableOpacity>
                <Image
                    style={styles.item}
                    source={{
                        uri: `${item.url}`,
                    }}
                />
                <Text> {item.name} </Text>
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
    images: {
        marginTop: 50,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    item: {

        width: '80%',
        height: 70,
        marginLeft: 15,
        marginRight: 40,
        padding: 65,
    },

});
export default Home;