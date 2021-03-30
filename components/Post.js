
import React from 'react';
import { StyleSheet, Text, View, Button, BackHandler } from 'react-native';

const Post = ({ navigation }) => {

    const pressHandler = () => {
        navigation.goBack();
    };
    return (
        <View >
            <View>
                <Text> I am the post </Text>
            </View>
            <View>
                <Text> upload the images? </Text>
            </View>
            <Button title="back" onPress={pressHandler} />
        </View>
    );
}

export default Post;