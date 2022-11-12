import React, {useEffect, useState} from 'react'
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {imgToBase64Code, nullCheck} from '../common/common'
import {launchImageLibrary} from 'react-native-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {deleteUser, updateImg, updatePassword} from '../api/auth'

export default function UpdateInfoScreen({navigation}: any) {
  const [photo, setPhoto]: any = useState(null)
  const [user, setUser]: any = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    callApi()
  }, [])

  const callApi = async () => {
    const user = await AsyncStorage.getItem('user')
    const jsonParser = user && (await JSON.parse(user))
    setUser(jsonParser)
    setLoading(false)
  }

  const handleChoosePhoto = () => {
    launchImageLibrary({mediaType: 'photo'}, (response: any) => {
      if (response) {
        setPhoto(response.assets[0])
      }
    })
  }

  const onPressUpdate = async () => {
    const base = await imgToBase64Code(photo.uri)
    const {data}: any = await updateImg(base)
    if (!data) return Alert.alert('ERROR')
    return LogoutFunc()
  }

  const onPressChangePassword = () => {
    Alert.prompt('변경할 비밀번호를 입력하세요.', '', [
      {
        text: '아니요.',
        style: 'cancel',
      },
      {
        text: '네',
        onPress: (value: any) => updatePasswordFunc(value),
      },
    ])
  }

  const onPressDeleteUser = async () => {
    Alert.alert('정말로 탈퇴하시나요.', '', [
      {
        text: '아니요.',
        style: 'cancel',
      },
      {
        text: '네',
        onPress: deleteFunc,
      },
    ])
  }

  const deleteFunc = async () => {
    const {data}: any = await deleteUser()
    if (!data) return Alert.alert('ERROR')
    return LogoutFunc()
  }

  const updatePasswordFunc = (value: string) => {
    console.log(value)
    const res: any = updatePassword(value)
    if (!res) return Alert.alert('ERROR')
    return LogoutFunc()
  }

  const LogoutFunc = async () => {
    await AsyncStorage.removeItem('accesstoken')
    await AsyncStorage.removeItem('user')
    navigation.navigate('Login')
  }

  if (loading) return null
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>내 프로필</Text>
      {photo ? (
        <TouchableOpacity onPress={handleChoosePhoto}>
          <Image style={styles.img} source={{uri: photo.uri}} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleChoosePhoto}>
          <Image
            style={styles.img}
            source={{uri: `http://localhost:3020${user.image.substr(1)}.jpg`}}
          />
        </TouchableOpacity>
      )}
      <Text style={styles.bodyText}>{user.name}</Text>
      <TouchableOpacity style={styles.btn} onPress={onPressChangePassword}>
        <Text style={styles.btnText}>비밀번호 변경</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={onPressDeleteUser}>
        <Text style={styles.btnText}>회원 탈퇴</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={onPressUpdate}>
        <Text style={styles.btnText}>수정 완료</Text>
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
    marginBottom: 30,
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#E8E8E8',
    marginTop: 30,
  },
  bodyText: {
    marginTop: 30,
    marginBottom: 30,
    fontSize: 30,
  },
})
