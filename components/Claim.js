
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, SafeAreaView, TextInput, } from 'react-native';

import axios from 'axios';
// import Constants from "expo-constants";



// const { manifest } = Constants;
// const uri = `http://${manifest.debuggerHost.split(':').shift()}:8000`;

const Claim = ({ navigation }) => {
    const [name, setName] = useState('');
    const pickupLocation = navigation.getParam('url');
    console.log(pickupLocation)
    const handleClaim = () => {

        if (!name.trim()) {
            alert('Please Enter Your Name');
            return;
        }
        //do something about the claim, send message on twillio
        axios.get('http://ec2-54-219-9-53.us-west-1.compute.amazonaws.com/claim', {
            params: {
                name
            }
        })
            .then(response => {
                alert('Donator will message you directly with all the pickup details')
            }).catch(err => {
                alert('Fail to send message')
            })

    }

    return (
        <View style={styles.container}>
            {/* <View style={{ borderWidth: 1, padding: 50 }}>
                <View>
                    <Text> pick up location</Text>
                    <Text>{pickupLocation}</Text>
                </View>
            </View> */}
            <View >
                <SafeAreaView>
                    <TextInput
                        name="name"
                        value={name}
                        placeholder="Your Name"
                        style={styles.input}
                        onChangeText={text => setName(text)}
                    />
                </SafeAreaView>
                <Text onPress={handleClaim} style={styles.button}> CLAIM </Text>
            </View>
            < StatusBar style="auto" />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        shadowOffset: { width: 100, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#4b5666',
        margin: 12,
        textAlign: 'center',
        borderColor: '#333',
        fontFamily: 'Avenir',
        fontSize: 15,
        letterSpacing: 3,
        fontFamily: 'Avenir',
    },
    button: {
        backgroundColor: '#4b5666',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 3,
        color: 'white',
        fontSize: 18,
        overflow: 'hidden',
        padding: 12,
        textAlign: 'center',
        letterSpacing: 7,
        fontFamily: 'Avenir'
    }

});

export default Claim;