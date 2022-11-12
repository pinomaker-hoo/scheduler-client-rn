import React, {useEffect, useState} from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function AdminScreen({navigation}: any) {
  const [loading, setLoading] = useState(true)
  const [user, setUser]: any = useState()

  useEffect(() => {
    callApi()
  }, [])

  const callApi = async () => {
    const user = await AsyncStorage.getItem('user')
    const jsonParser = user && (await JSON.parse(user))
    setUser(jsonParser)
    setLoading(false)
  }

  const onPressUpdate = () => {
    navigation.navigate('Update')
  }

  const onPressMoney = () => {
    navigation.navigate('Money')
  }

  const onPressDate = () => {
    navigation.navigate('Date')
  }

  const onPressLogout = async () => {
    await AsyncStorage.removeItem('accesstoken')
    await AsyncStorage.removeItem('user')
    navigation.navigate('Login')
  }

  if (loading) return null
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        {user.image ? (
          <Image
            style={styles.img}
            source={{uri: `http://localhost:3020${user.image.substr(1)}.jpg`}}
          />
        ) : (
          <Image style={styles.img} source={require('../../assets/user.png')} />
        )}
        <Text style={styles.bodyText}>{user.name}</Text>
        <TouchableOpacity style={styles.bodyBtn} onPress={onPressUpdate}>
          <Text style={styles.bodyBtnText}>계정 설정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bodyBtn} onPress={onPressDate}>
          <Text style={styles.bodyBtnText}>디데이 설정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bodyBtn} onPress={onPressMoney}>
          <Text style={styles.bodyBtnText}>임금 확인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bodyBtn} onPress={onPressLogout}>
          <Text style={styles.bodyBtnText}>로그아웃</Text>
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
  header: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
    marginTop: 30,
    alignItems: 'center',
  },
  body: {
    flex: 6,
    alignItems: 'center',
  },
  headerBtn: {
    width: 60,
    height: 40,
    backgroundColor: '#CDC2DF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  nameText: {
    fontSize: 30,
    width: 200,
    marginLeft: 30,
  },
  bodyText: {
    marginTop: 30,
    fontSize: 30,
  },
  bodyBtn: {
    width: 150,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#C47DFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E8E8E8',
    marginTop: 150,
  },
  bodyBtnText: {
    color: 'white',
  },
})
