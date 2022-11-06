'use strict'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const day = axios.create({
  baseURL: 'http://localhost:3020/day',
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
