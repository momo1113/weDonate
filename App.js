import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Navigator from './routes/homeStack.js'


const App = () => {
  return (
    <View style={styles.container}>
      <Navigator />
    </View>
  );
}

export default App;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },

});
