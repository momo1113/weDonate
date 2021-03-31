import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../components/Home.js'
import Header from '../shared/Header.js'
import Post from '../components/Post.js'

const screens = {
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} />
            }
        }
    },
    Post: {
        screen: Post,
        navigationOptions: {
            headerTitle: 'UPLOADING'
        }

    }
};
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);

