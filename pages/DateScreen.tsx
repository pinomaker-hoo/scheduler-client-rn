import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

export default function DateScreen({navigation}: any) {
  const onPress = () => {
    navigation.navigate('Root')
  }

  return (
    <View style={styles.container}>
      <Text>돈 계산</Text>
      <TouchableOpacity onPress={onPress}>
        <Text>BACK</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
})
