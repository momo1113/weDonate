
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const CameraPreview = ({ photo, reTake, setCapturedImage }) => {
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work')
                }
            }
        }
        )();
    }, [])



    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,

            quality: 1
        });

        console.log(result.height);
        if (!result.cancelled) {
            setCapturedImage(result);
        }
    }


    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.bgImage}
                source={{ uri: photo && photo.uri }}
            >
                <View style={styles.icons}>
                    <TouchableOpacity style={styles.retake} onPress={() => reTake(true)}>
                        <MaterialCommunityIcons name="camera-retake-outline" size={55} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.album} onPress={pickImage} >
                        <MaterialCommunityIcons name="image-album" size={55} color="white" />
                    </TouchableOpacity>
                </View>
            </ImageBackground>

        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%',

    },

    bgImage: {
        flex: 1,
        resizeMode: "cover",
        width: '100%',
        height: '100%'
    },
    icons: {
        marginTop: '120%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    retake: {
        padding: 50
    },
    album: {
        padding: 50
    }
})

export default CameraPreview;