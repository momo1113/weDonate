
import React from 'react';
import { StyleSheet, Text, View, Button, BackHandler } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'

const Header = ({ navigation }) => {
    const pressHandler = () => {
        navigation.navigate('Post')
    }
    return (
        <View style={styles.header}>
            <View style={styles.profile}  >
                <MaterialIcons name="face" size={30} color="black" />
            </View>
            <View style={styles.icon} >
                <Button title='donate' onPress={pressHandler} />
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',

    },
    profile: {
        marginTop: 10,
        marginRight: '50%',
    },
    icon: {
        marginTop: 10,
        marginLeft: '50%',

    }

})

export default Header;