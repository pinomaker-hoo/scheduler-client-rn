import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

export default function DateScreen({navigation}: any) {
  const onPress = () => {
    navigation.navigate('Root')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>디데이 설정</Text>
      </View>
      <View style={styles.body}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
