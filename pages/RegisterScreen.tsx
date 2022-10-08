import React, {useState} from 'react'
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'

export default function RegisterScreen({navigation}: any) {
  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [passwordc, setPasswordc] = useState('')

  const onPress = () => {
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>SIGN UP</Text>
      <TextInput
        onChangeText={name => setName(name)}
        placeholder="name"
        style={styles.textInput}
      />
      <TextInput
        onChangeText={id => setId(id)}
        placeholder="id"
        style={styles.textInput}
      />
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>ID 중복 확인</Text>
      </TouchableOpacity>
      <TextInput
        onChangeText={password => setPassword(password)}
        placeholder="password"
        secureTextEntry={true}
        style={styles.textInput}
      />
      <TextInput
        onChangeText={passwordc => setPasswordc(passwordc)}
        placeholder="password check"
        secureTextEntry={true}
        style={styles.textInput}
      />
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
    backgroundColor: 'white',
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
