import React from 'react'
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

export default function LoginScreen({navigation}: any) {
  const onPressJoinBtn = () => {
    navigation.navigate('Register')
  }

  const opPressLogin = () => {
    navigation.navigate('Root')
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image style={styles.img} source={require('../assets/logo.png')} />
      </View>
      <View style={styles.bodyBox}>
        <TextInput placeholder="id" style={styles.textInput} />
        <TextInput placeholder="password" style={styles.textInput} />
        <TouchableOpacity style={styles.btn} onPress={opPressLogin}>
          <Text style={styles.btnText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={onPressJoinBtn}>
          <Text style={styles.btnText}>JOIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyBox: {
    flex: 1,
    alignItems: 'center',
    marginTop: -100,
  },
  img: {
    width: 200,
    height: 145,
  },
  textInput: {
    width: 240,
    height: 45,
    backgroundColor: '#D9D9D9',
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
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
})
