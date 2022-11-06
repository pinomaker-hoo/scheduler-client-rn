'use strict'
import axios from 'axios'

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

export const register = async (id: string, name: string, password: string) => {
  try {
    const {data} = await auth({
      url: '/',
      method: 'post',
      data: {id, name, password},
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
