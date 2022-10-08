'use strict'
import axios from 'axios'

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
