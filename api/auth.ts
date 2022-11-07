'use strict'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const auth = axios.create({
  baseURL: 'http://localhost:3020/auth',
  withCredentials: true,
})

export const login = async (id: string, password: string) => {
  try {
    const {data} = await auth({
      url: '/local',
      method: 'post',
      data: {id, password},
    })
    return data
  } catch (err) {
    console.log(err)
  }
}

export const register = async (
  id: string,
  name: string,
  password: string,
  base: string,
) => {
  try {
    const {data} = await auth({
      url: '/',
      method: 'post',
      data: {id, name, password, base},
    })
    return data
  } catch (err) {
    console.log(err)
  }
}

export const findUserById = async (id: string) => {
  try {
    const {data} = await auth({
      method: 'post',
      url: '/check',
      data: {
        id,
      },
    })
    return data
  } catch (err) {
    console.log(err)
  }
}

export const updateImg = async (base: string) => {
  try {
    const token = await AsyncStorage.getItem('accesstoken')
    const jsonParser = token && (await JSON.parse(token))
    const {data} = await auth({
      method: 'patch',
      url: '/image',
      data: {base},
      headers: {
        accesstoken: jsonParser,
      },
    })
    return data
  } catch (err) {
    console.log(err)
  }
}

export const updatePassword = async (password: string) => {
  try {
    const token = await AsyncStorage.getItem('accesstoken')
    const jsonParser = token && (await JSON.parse(token))
    const {data} = await auth({
      method: 'patch',
      url: '/',
      data: {password},
      headers: {
        accesstoken: jsonParser,
      },
    })

    return data
  } catch (err) {
    console.log(err)
  }
}

export const deleteUser = async () => {
  try {
    const token = await AsyncStorage.getItem('accesstoken')
    const jsonParser = token && (await JSON.parse(token))
    const {data} = await auth({
      method: 'delete',
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
