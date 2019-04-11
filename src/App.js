import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'

import { useSubscription } from './hooks'
import { getMe, znConfirm, znMessage, znModal, znFiltersPanel } from './post-rpc'

const App = props => {
  const [avatar, setAvatar] = useState(logo)
  const [name, setName] = useState('')
  const [timezone, setTimezone] = useState('')
  const [lastLogin, setLastLogin] = useState('')
  const [items, setItems] = useState([])

  useSubscription('item', (item, err) => {
    if (err) return console.error(err)
    console.log('event', items, item)
    setItems([...items, item])
  })

  const fetchUser = () => !name && getMe((result, error) => {
    if (error) return console.error(error)
    console.log(result, error)
    const { profile, settings, metadata } = result.data.data
    setAvatar(settings.avatarUrl)
    setName(profile.publicName)
    setTimezone(settings.timezone)
    setLastLogin(metadata.lastLogin)
  })

  const confirmButton = () => znConfirm('Did you really mean to press it?', () => {
    setItems([...items, 'confirmed!'])
  })

  const messageButton = () => znMessage('It works!', 'saved', 6000)

  const modalButton = () => znModal({ modalTemplateURL: 'https://b4c498b3.ngrok.io' }, something => console.log(something, 'hey!'))

  const filtersPanelButton = () => znFiltersPanel({ workspaceId: 3, formId: 4 }, something => console.log(something, 'hey!'))

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>React Plugin!</h1>
        <img src={avatar} className='App-logo' alt='logo' />
        <button onClick={confirmButton}>Press and Confirm</button>
        <button onClick={messageButton}>znMessage</button>
        <button onClick={modalButton}>znModal</button>
        <button onClick={filtersPanelButton}>znFiltersPanel</button>
        {!name && <button onClick={fetchUser}>Get User Info</button>}
        {name && <div>
          <p>Name: {name}</p>
          <p>TimeZone: {timezone}</p>
          <p>Last Login: {lastLogin}</p>
          <img src='/pbwh.png' alt='Powered by WizeHive' />
        </div>}
        {items.length > 0 && items.map((item, i) => <p key={i}>{ item }</p>)}
      </header>
    </div>
  )
}

export default App
