import React, {useState} from 'react'
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {login} from '../../api/auth'
import {nullCheck} from '../../common/common'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function LoginScreen({navigation}: any) {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  const onPressJoinBtn = () => {
    navigation.navigate('Register')
  }

  const opPressLoginBtn = async () => {
    try {
      if (!nullCheck([id, password])) return Alert.alert('입력 해주세요.')
      const {data}: any = await login(id, password)
      if (!data) return Alert.alert('로그인 실패')
      await AsyncStorage.setItem('accesstoken', JSON.stringify(data.token))
      await AsyncStorage.setItem('user', JSON.stringify(data.user))
      Alert.alert('로그인 성공')
      navigation.navigate('Root')
    } catch (err) {
      console.log(err)
      Alert.alert('ERROR')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image style={styles.img} source={require('../../assets/logo.png')} />
      </View>
      <View style={styles.bodyBox}>
        <TextInput
          onChangeText={id => setId(id)}
          placeholder="id"
          style={styles.textInput}
        />
        <TextInput
          onChangeText={password => setPassword(password)}
          placeholder="password"
          style={styles.textInput}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.btn} onPress={opPressLoginBtn}>
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
    width: 230,
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
