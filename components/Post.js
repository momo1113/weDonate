
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, SafeAreaView, TextInput, Modal, Alert, Pressable } from 'react-native';
import CameraPreview from './CameraPreview'
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

const Post = ({ navigation }) => {
    const [startCamera, setStartCamera] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false)
    const [capturedImage, setCapturedImage] = useState({})
    const [upload, setUpload] = useState(false)
    const [location, setLocation] = useState('');
    const [name, setName] = useState('')
    const [showModal, setShowModal] = useState(false)
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
    const handleUpload = () => {
        // if (name === '' || location === '' || !capturedImage) {
        //     Alert.alert(
        //         "Please fill the information",
        //         [
        //             {
        //                 text: "Cancel",
        //                 onPress: () => console.log("Cancel Pressed"),
        //                 style: "cancel"
        //             },
        //             { text: "OK", onPress: () => console.log("OK Pressed") }
        //         ]
        //     );
        // }
        if (!name.trim()) {
            alert('Please Enter Item Name');
            return;
        }
        //Check for the Email TextInput
        if (!location.trim()) {
            alert('Please Enter Pick Up City');
            return;
        }

        if (!Object.keys(capturedImage).length) {
            alert('Please Upload the Image');
            return;
        }

        //Checked Successfully
        //Do whatever you want

        setShowModal(true)

    };
    console.log(capturedImage)
    console.log(name)
    console.log(location)
    console.log(showModal)

    return (
        <View style={styles.container}>

            { showModal && (
                <TouchableOpacity>
                    <Modal>
                        <View style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1,
                        }}>
                            <Text style={styles.modalText}> Thanks for contributing to our community ! </Text>
                            <Pressable
                                style={[styles.modalButton, styles.buttonClose]}
                                onPress={() => setShowModal(!showModal)}
                            >
                                <Text style={styles.textStyle}>CLOSE</Text>
                            </Pressable>
                        </View>
                    </Modal>
                </TouchableOpacity>
            )}



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
                                style={styles.photoButton}
                            >
                            </TouchableOpacity>
                        </View>
                    </View>

                </Camera>
            )
            }
            {startCamera ? null :
                (<View style={styles.card}>
                    <SafeAreaView>

                        <TextInput
                            style={styles.input}
                            name="name"
                            value={name}
                            placeholder="Item Name"
                            mode="flat"
                            disabled={false}
                            onChangeText={name => setName(name)}
                            required
                        />
                        <TextInput
                            style={styles.input}
                            name="location"
                            value={location}
                            placeholder="City"
                            onChangeText={location => setLocation(location)}
                            required
                        />
                    </SafeAreaView>

                    <View style={styles.upload}>
                        <TouchableOpacity onPress={__startCamera}>
                            <View>
                                <Text style={styles.label}> Upload donation </Text>
                                {capturedImage && <TouchableOpacity onPress={imagePressed}>
                                    <Image source={{ uri: capturedImage.uri }} style={{ width: 300, height: 300 }} />
                                </TouchableOpacity>
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text onPress={handleUpload} style={styles.button} > UPLOAD </Text>

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
    card: {
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },


    label: {
        margin: 'auto',
        fontSize: 24,
        textAlign: 'center',
        letterSpacing: 3,
        fontFamily: 'Avenir',
        paddingTop: 20
    },
    upload: {
        borderTopColor: '#333',
        borderWidth: 1,
        marginTop: 2,
        padding: 5,
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
    photoButton: {
        width: 70,
        height: 70,
        bottom: 40,
        borderRadius: 50,
        backgroundColor: '#fff'
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#4b5666',
        margin: 12,
        textAlign: 'center',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderColor: '#333',
        fontFamily: 'Avenir',
        fontSize: 15,
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
    },
    modalText: {
        letterSpacing: 1,
        fontSize: 16,
        fontFamily: 'Avenir'
    },
    modalButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 20,
    },
    buttonClose: {
        backgroundColor: '#4b5666',
        margin: 12,
    },
    textStyle: {
        color: "white",
        textAlign: "center"
    },
})

export default Post;