import { client } from '../post-rpc'
import { useEffect } from 'react'

export const useSubscription = (event, callback) => {
  useEffect(() => {
    client.subscribe(event, callback)

    return () => client.unsubscribe(event)
  }, [callback])
}

export const useJRPMethod = (method, params, callback) => {
  useEffect(() => {
    client.call(method, { plugin: { apiVersion: '1.0.1' }, params }, callback)
  }, [])
}

export const useZnHttp = (params, callback) => useJRPMethod('znHttp', params, callback)

export const useGetMe = callback => useZnHttp({ method: 'get', url: '/users/me' }, callback)
