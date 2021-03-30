import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Navigator from './routes/homeStack.js'
import TabNavigator from './routes/BottomTab.js'


const App = () => {
  return (
    <View style={styles.container}>
      <Navigator style={styles.content} />
      {/* <TabNavigator /> */}
    </View>
  );
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    height: '100%',
  }
});
