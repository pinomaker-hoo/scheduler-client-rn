'use strict'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {BASE_SERVER_URL} from '.'

const group = axios.create({
  baseURL: `${BASE_SERVER_URL}/group`,
  withCredentials: true,
})

export const getGroupList = async () => {
  try {
    const {data} = await group({
      method: 'get',
      url: '/',
    })
    return data
  } catch (err) {
    console.log(err)
  }
}

export const saveGroup = async (
  name: string,
  password: string,
  memberCount: number,
  color: string,
) => {
  try {
    const token = await AsyncStorage.getItem('accesstoken')
    const jsonParser = token && (await JSON.parse(token))
    const {data} = await group({
      method: 'post',
      url: '/',
      data: {name, password, memberCount, color},
      headers: {
        accesstoken: jsonParser,
      },
    })
    return data
  } catch (err) {
    console.log(err)
  }
}

export const updateGroup = async (
  name: string,
  password: string,
  memberCount: number,
  color: string,
  idx: string,
) => {
  try {
    const {data} = await group({
      method: 'put',
      url: `/${idx}`,
      data: {name, password, memberCount, color},
    })
    return data
  } catch (err) {
    console.log(err)
  }
}

export const getGroup = async (idx: string) => {
  try {
    const {data} = await group({
      url: `/${idx}`,
      method: 'get',
    })
    return data
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
