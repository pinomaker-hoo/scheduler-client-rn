import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import RootNavigator from './pages/RootNavigator';

const Stack = createNativeStackNavigator();

const App = () => {
  return <RootNavigator></RootNavigator>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
