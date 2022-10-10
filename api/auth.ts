'use strict'
import axios from 'axios'
import {Alert} from 'react-native'

const auth = axios.create({
  baseURL: 'http://localhost:3020/auth',
  withCredentials: true,
})

export const login = async (id: string, password: string) => {
  const res = await auth({
    url: '/local',
    method: 'post',
    data: {id, password},
  })
  console.log(res)
}

export const register = async (id: string, name: string, password: string) => {
  return await auth({
    url: '/',
    method: 'post',
    data: {id, name, password},
  })
}

export const findUserById = async (id: string) => {
  return await auth({
    method: 'post',
    url: '/check',
    data: {
      id,
    },
  })
}
