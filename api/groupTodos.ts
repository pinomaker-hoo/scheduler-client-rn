'use strict'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const groupTodos = axios.create({
  baseURL: 'http://localhost:3020/groupTodos',
  withCredentials: true,
})

export const getTodosList = async (idx: string) => {
  return await groupTodos({
    method: 'get',
    url: `/${idx}`,
  })
}

export const saveGroupTodos = async (
  date: string,
  place: string,
  title: string,
  idx: string,
) => {
  const token = await AsyncStorage.getItem('accesstoken')
  const jsonParser = token && (await JSON.parse(token))
  return await groupTodos({
    method: 'post',
    url: `/${idx}`,
    data: {date, place, title},
    headers: {
      accesstoken: jsonParser,
    },
  })
}
