import React, { Component } from 'react';
import { WaveIndicator } from 'react-native-indicators';
import { StyleSheet, View, Text } from 'react-native';


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:100,
  },
  indicatorView: {
    height: 120,
    width: 120,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  loadingText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 3,
  }
})

class LoadingIndicator extends Component {
  static propTypes = {
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.indicatorView} >
          <WaveIndicator color='rgba(50,205,255,0.7)' size={50} />
          <Text style={styles.loadingText}>loading....</Text>
        </View>
      </View>
    );
  }
}

export default LoadingIndicator;