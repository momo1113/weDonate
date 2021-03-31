
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import CameraPreview from './CameraPreview'
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

const Post = ({ navigation }) => {
    const [startCamera, setStartCamera] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false)
    const [capturedImage, setCapturedImage] = useState({})
    const [upload, setUpload] = useState(false)

    let camera = null;

    //handle start the camera
    const __startCamera = async () => {
        const { status } = await Camera.requestPermissionsAsync();
        if (status === 'granted') {
            setStartCamera(true)
        } else {
            Alert.alert('Acess denied')
        }
    }

    //handle take pictures
    const __takePicture = async () => {
        if (!camera) return
        const photo = await camera.takePictureAsync()
        setCapturedImage(photo)
        //get preview of the photo and save it to database
        setPreviewVisible(true)
        MediaLibrary.saveToLibraryAsync(photo.uri)
    }

    //retake photos

    const __reTake = (res) => {
        setStartCamera(res)
        setPreviewVisible(false)
        setCapturedImage({})
    }

    //
    const imagePressed = () => {
        setStartCamera(true)
        setPreviewVisible(false)
        setCapturedImage({})
        setUpload(false)

    }

    // console.log(photo)
    //handle screen go back 
    const pressHandler = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            {previewVisible && capturedImage && (<CameraPreview
                photo={capturedImage}
                reTake={__reTake}
                setCapturedImage={setCapturedImage}
                setUpload={setUpload}
                setStartCamera={setStartCamera}
                setPreviewVisible={setPreviewVisible}
            />)}
            {startCamera && !previewVisible && !upload && (
                <Camera
                    style={{ flex: 1, width: '100%' }}
                    ref={(r) => {
                        camera = r
                    }}
                >
                    <View style={styles.takenPhotoWrapper}>
                        <View style={styles.innerWrapper}>
                            <TouchableOpacity
                                onPress={__takePicture}
                                style={styles.button}
                            >
                            </TouchableOpacity>
                        </View>
                    </View>

                </Camera>
            )
            }
            {startCamera ? null :
                (<View>
                    <View style={styles.upload}>
                        <TouchableOpacity onPress={__startCamera}>
                            <View>
                                <Text> Upload donation </Text>
                                {capturedImage && <TouchableOpacity onPress={imagePressed}>
                                    <Image source={{ uri: capturedImage.uri }} style={{ width: 200, height: 200 }} />
                                </TouchableOpacity>
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Button title="back" onPress={pressHandler} />

                </View>)
            }
            < StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    upload: {
        borderTopColor: '#333',
        borderWidth: 2,
        padding: 50,
        marginBottom: 10,
    },
    takenPhotoWrapper: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        padding: 20,
        justifyContent: 'center'
    },
    innerWrapper: {
        alignSelf: 'center',
        flex: 1,
        alignItems: 'center'
    },
    button: {
        width: 70,
        height: 70,
        bottom: 40,
        borderRadius: 50,
        backgroundColor: '#fff'
    }
})

export default Post;