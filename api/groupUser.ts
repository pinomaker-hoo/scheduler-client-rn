'use strict'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Alert} from 'react-native'
import {BASE_SERVER_URL} from '.'

const groupUser = axios.create({
  baseURL: `${BASE_SERVER_URL}/groupUser`,
  withCredentials: true,
})

export const joinGroup = async (idx: number) => {
  try {
    const token = await AsyncStorage.getItem('accesstoken')
    const jsonParser = token && (await JSON.parse(token))
    const {data} = await groupUser({
      method: 'post',
      url: `/${String(idx)}`,
      headers: {
        accesstoken: jsonParser,
      },
    })
    return data
  } catch (err) {
    console.log(err)
    Alert.alert('ERROR')
    return null
  }
}

export const findGroupUser = async () => {
  try {
    const token = await AsyncStorage.getItem('accesstoken')
    const jsonParser = token && (await JSON.parse(token))
    const {data} = await groupUser({
      method: 'get',
      url: '/',
      headers: {
        accesstoken: jsonParser,
      },
    })
    return data
  } catch (err) {
    console.log(err)
  }
}

export const deleteGroupUser = async (idx: string) => {
  try {
    const token = await AsyncStorage.getItem('accesstoken')
    const jsonParser = token && (await JSON.parse(token))
    return await groupUser({
      url: `/${idx}`,
      method: 'delete',
      headers: {
        accesstoken: jsonParser,
      },
    })
  } catch (err) {
    console.log(err)
  }
}
