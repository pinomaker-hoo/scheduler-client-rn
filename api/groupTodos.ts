'use strict'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const groupTodos = axios.create({
  baseURL: 'http://localhost:3020/groupTodos',
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
) => {
  try {
    const token = await AsyncStorage.getItem('accesstoken')
    const jsonParser = token && (await JSON.parse(token))
    const {data} = await groupTodos({
      method: 'post',
      url: `/${idx}`,
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
