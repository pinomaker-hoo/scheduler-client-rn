'use strict'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const group = axios.create({
  baseURL: 'http://localhost:3020/group',
  withCredentials: true,
})

export const saveGroup = async (
  name: string,
  password: string,
  memberCount: number,
  color: string,
) => {
  const token = await AsyncStorage.getItem('accesstoken')
  const jsonParser = token && (await JSON.parse(token))
  return await group({
    method: 'post',
    url: '/',
    data: {name, password, memberCount, color},
    headers: {
      accesstoken: jsonParser,
    },
  })
}

export const updateGroup = async (
  name: string,
  password: string,
  memberCount: number,
  color: string,
  idx: string,
) => {
  return await group({
    method: 'put',
    url: `/${idx}`,
    data: {name, password, memberCount, color},
  })
}

export const getGroup = async (idx: string) => {
  try {
    return await group({
      url: `/${idx}`,
      method: 'get',
    })
  } catch (err) {
    console.log(err)
  }
}

export const deleteGroup = async (idx: string) => {
  try {
    console.log(idx)
    return await group({
      url: `/${idx}`,
      method: 'delete',
    })
  } catch (err) {
    console.log(err)
  }
}
