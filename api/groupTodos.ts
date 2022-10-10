'use strict'
import axios from 'axios'

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
