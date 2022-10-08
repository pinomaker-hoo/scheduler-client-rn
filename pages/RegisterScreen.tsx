import React from 'react'
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'

export default function RegisterScreen({navigation}: any) {
  const onPress = () => {
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>SIGN UP</Text>
      <TextInput placeholder="name" style={styles.textInput} />
      <TextInput placeholder="id" style={styles.textInput} />
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>ID 중복 확인</Text>
      </TouchableOpacity>
      <TextInput placeholder="password" style={styles.textInput} />
      <TextInput placeholder="password" style={styles.textInput} />
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.btnText}>JOIN</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: 240,
    height: 45,
    backgroundColor: '#C47DFF',
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 20,
  },
  textInput: {
    width: 240,
    height: 45,
    backgroundColor: '#D9D9D9',
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
  },
  headerText: {
    fontSize: 30,
    color: '#C47DFF',
    marginBottom: 30,
  },
})
