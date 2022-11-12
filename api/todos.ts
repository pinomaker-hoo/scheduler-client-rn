'use strict'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {BASE_SERVER_URL} from '.'

const todos = axios.create({
  baseURL: `${BASE_SERVER_URL}/todos`,
  withCredentials: true,
})

export const saveTodos = async (
  date: string,
  place: string,
  title: string,
  year: boolean,
) => {
  try {
    const token = await AsyncStorage.getItem('accesstoken')
    const jsonParser = token && (await JSON.parse(token))
    const {data} = await todos({
      method: 'post',
      url: '/',
      data: {date, place, title, year},
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
