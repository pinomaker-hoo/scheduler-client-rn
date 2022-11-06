'use strict'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const todos = axios.create({
  baseURL: 'http://localhost:3020/todos',
  withCredentials: true,
})

export const saveTodos = async (date: string, place: string, title: string) => {
  try {
    const token = await AsyncStorage.getItem('accesstoken')
    const jsonParser = token && (await JSON.parse(token))
    const {data} = await todos({
      method: 'post',
      url: '/',
      data: {date, place, title},
      headers: {
        accesstoken: jsonParser,
      },
    })
    return data
  } catch (err) {
    console.log(err)
  }
}

export const getTodos = async () => {
  try {
    const token = await AsyncStorage.getItem('accesstoken')
    const jsonParser = token && (await JSON.parse(token))
    const {data} = await todos({
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
