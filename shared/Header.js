
import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'

const Header = ({ navigation, post }) => {
    const pressHandler = () => {
        navigation.navigate('Post')
    }

    return (
        <View style={styles.header}>
            <View   >
                {!post && <MaterialIcons name="face" size={30} color="#4b5666" style={styles.profile} />}
            </View>
            <View  >
                {post ? <Button title='UPLOAD' color='#4b5666' style={styles.upload} /> : <Button title='DONATE' color='#4b5666' onPress={pressHandler} style={styles.donate} />}
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
        justifyContent: 'center',

    },
    profile: {
        marginTop: 10,
        marginRight: '70%',
    },
    donate: {
        marginTop: 10,
    },
    upload: {
        marginTop: 10,
        marginLeft: '170%',
        padding: '200%'
    }
})

export default Header;