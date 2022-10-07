import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {create} from 'react-test-renderer';

export default function HomeScreen({navigation}: any) {
  const onPress = () => {
    console.log(1);
    navigation.navigate('Root');
  };
  return (
    <View style={styles.container}>
      <Text onPress={onPress}>LoginScreeen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
