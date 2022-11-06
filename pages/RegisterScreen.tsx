import React, {useState} from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  View,
  Image,
  Button,
} from 'react-native'
import {launchImageLibrary} from 'react-native-image-picker'
import {findUserById, register} from '../api/auth'
import {imgToBase64Code, nullCheck} from '../common/common'

export default function RegisterScreen({navigation}: any) {
  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [passwordc, setPasswordc] = useState('')
  const [photo, setPhoto]: any = useState(null)

  const onPressIdBtn = async () => {
    if (!nullCheck([id])) return Alert.alert('입력 해주세요.')
    const {data} = await findUserById(id)
    if (!data) return Alert.alert('사용 가능합니다.')
    return Alert.alert('사용 중인 ID 입니다.')
  }

  const onPressJoinBtn = async () => {
    const base = await imgToBase64Code(photo.uri)
    if (!nullCheck([name, id, password, passwordc]))
      return Alert.alert('입력 해주세요.')
    if (password !== passwordc)
      return Alert.alert('비밀번호와 비밀번호 체크가 같지 않습니다.')
    const {data} = await register(id, name, password, base)
    if (!data) return Alert.alert('회원 가입 실패')
    Alert.alert('회원 가입 성공')
    navigation.navigate('Login')
  }

  const handleChoosePhoto = () => {
    launchImageLibrary({mediaType: 'photo'}, (response: any) => {
      if (response) {
        setPhoto(response.assets[0])
      }
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>SIGN UP</Text>
      {photo ? (
        <TouchableOpacity onPress={handleChoosePhoto}>
          <Image style={styles.img} source={{uri: photo.uri}} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleChoosePhoto}>
          <Image style={styles.img} source={require('../assets/user.png')} />
        </TouchableOpacity>
      )}
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
      <TouchableOpacity style={styles.btn} onPress={onPressIdBtn}>
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
      <TouchableOpacity style={styles.btn} onPress={onPressJoinBtn}>
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
    marginTop: 20,
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
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
  },
  headerText: {
    fontSize: 30,
    color: '#C47DFF',
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#E8E8E8',
    marginTop: 30,
  },
})
