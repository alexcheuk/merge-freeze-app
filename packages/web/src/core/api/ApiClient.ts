import axios from 'axios'

export interface ApiResponse<T = any> {
  data: T
}

export const ApiClient = axios.create()
