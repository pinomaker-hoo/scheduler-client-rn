'use strict'
import axios from 'axios'

const auth = axios.create({
  baseURL: 'http://localhost:3020/auth',
  withCredentials: true,
})

export const login = async (id: string, password: string) => {
  try {
    return await auth({
      url: '/local',
      method: 'post',
      data: {id, password},
    })
  } catch (err) {
    console.log(err)
  }
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
