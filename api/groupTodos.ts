'use strict'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {BASE_SERVER_URL} from '.'

const groupTodos = axios.create({
  baseURL: `${BASE_SERVER_URL}/groupTodos`,
  withCredentials: true,
})

export const getGroupTodosList = async (idx: string) => {
  try {
    const {data} = await groupTodos({
      method: 'get',
      url: `/${idx}`,
    })
    return data
  } catch (err) {
    console.log(err)
  }
}

export const saveGroupTodos = async (
  date: string,
  place: string,
  title: string,
  idx: string,
  year: string,
) => {
  try {
    const token = await AsyncStorage.getItem('accesstoken')
    const jsonParser = token && (await JSON.parse(token))
    const {data} = await groupTodos({
      method: 'post',
      url: `/${idx}`,
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
