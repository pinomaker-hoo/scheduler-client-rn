import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'

export default function MoneyScreen({navigation}: any) {
  const onPress = () => {
    navigation.navigate('Root')
  }
  return (
    <View>
      <Text>돈 계산</Text>
      <TouchableOpacity onPress={onPress}>
        <Text>BACK</Text>
      </TouchableOpacity>
    </View>
  )
}
