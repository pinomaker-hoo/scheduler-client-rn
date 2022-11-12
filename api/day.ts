'use strict'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {BASE_SERVER_URL} from '.'

const day = axios.create({
  baseURL: `${BASE_SERVER_URL}/day`,
  withCredentials: true,
})

export const saveDay = async (name?: string, date?: string) => {
  try {
    const token = await AsyncStorage.getItem('accesstoken')
    const jsonParser = token && (await JSON.parse(token))
    const {data} = await day({
      url: '',
      method: 'post',
      data: {
        name: name || null,
        date: date || null,
      },
      headers: {
        accesstoken: jsonParser,
      },
    })
    return data
  } catch (err) {
    console.log(err)
  }
}

export const getDay = async () => {
  try {
    const token = await AsyncStorage.getItem('accesstoken')
    const jsonParser = token && (await JSON.parse(token))
    const {data} = await day({
      url: '/',
      method: 'get',
      headers: {
        accesstoken: jsonParser,
      },
    })
    return data
  } catch (err) {
    console.log(err)
  }
}
