'use strict'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Alert} from 'react-native'

const groupUser = axios.create({
  baseURL: 'http://localhost:3020/groupUser',
  withCredentials: true,
})

export const joinGroup = async (idx: number) => {
  const token = await AsyncStorage.getItem('accesstoken')
  const jsonParser = token && (await JSON.parse(token))
  try {
    return await groupUser({
      method: 'post',
      url: `/${String(idx)}`,
      headers: {
        accesstoken: jsonParser,
      },
    })
  } catch (err) {
    console.log(err)
    Alert.alert('ERROR')
    return null
  }
}

export const findGroupUser = async () => {
  const token = await AsyncStorage.getItem('accesstoken')
  const jsonParser = token && (await JSON.parse(token))
  return await groupUser({
    method: 'get',
    url: '/',
    headers: {
      accesstoken: jsonParser,
    },
  })
}

export const deleteGroupUser = async (idx: string) => {
  try {
    return await groupUser({
      url: `/${idx}`,
      method: 'delete',
    })
  } catch (err) {
    console.log(err)
  }
}
