import Client from './client'

export const client = new Client('https://platform.wizehive-dev.com')

client.logging(true)
client.start()

export const getMe = callback => client.call('znHttp', {
  plugin: { apiVersion: '1.0.1' },
  params: { method: 'get', url: '/users/me' }
}, callback)

export const znConfirm = (message, callback) => {
  console.log('calling confirm')
  client.call('confirm', { message }, callback, Infinity)
}

export const znMessage = (message, type, duration) => {
  console.log('calling znMessage')
  client.call('message', { params: { message, type, duration } })
}

export const znModal = (options = {}, callback) => {
  console.log('calling znModal')
  client.call('modal', { options }, callback, Infinity)
}

export const znFiltersPanel = (options, callback) => {
  console.log('calling znFiltersPanel')
  client.call('filtersPanel', { options }, callback, Infinity)
}

// client.subscribe('item', (result, error) => {
//   console.log(result)
// })
