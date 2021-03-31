import React from 'react';
import { registerRootComponent } from 'expo';
import { StyleSheet, View } from 'react-native';
import Navigator from './routes/homeStack.js';



const App = () => {

  return (
    <View style={styles.container}>
      <Navigator />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },

});

export default App;