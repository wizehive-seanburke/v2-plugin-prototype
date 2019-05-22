import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'

import { useSubscription } from './hooks'
import {getMe, znConfirm, znMessage, znModal, znFiltersPanel, znSize, znCookies, $log} from './post-rpc'
import ZnSize from "./post-rpc/ZnSize";

const App = props => {
  const [avatar, setAvatar] = useState(logo)
  const [name, setName] = useState('')
  const [timezone, setTimezone] = useState('')
  const [lastLogin, setLastLogin] = useState('')
  const [items, setItems] = useState([])
  let [boxDim, setBoxDim] = useState({width: '50px', height: '50px'})

  znSize.autoSize();

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

  const modalButton = () => znModal({ modalTemplateURL: 'https://plugin.localdev.site:3000' }, something => console.log(something, 'hey!'))

  const filtersPanelButton = () => znFiltersPanel({ workspaceId: 3, formId: 4 }, something => console.log(something, 'hey!'))

  const znCookieGetButton = () => znCookies.get('test', data => {
      // console.log({
      //   'data': data
      // });
    $log.log({
      'data': data
    })
  });

  const znCookiesSetButton = () => znCookies.set('test', 'test string');

  const realRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const changeDocumentSize = () => {
    console.log(boxDim);
    let width = realRandom(100, 900) + 'px';
    let height = realRandom(100, 600) + 'px';
    setBoxDim({height: height, width: width});
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>React Plugin!</h1>
        <img src={avatar} className='App-logo' alt='logo' />
        <button onClick={confirmButton}>Press and Confirm</button>
        <button onClick={messageButton}>znMessage</button>
        <button onClick={modalButton}>znModal</button>
        <button onClick={filtersPanelButton}>znFiltersPanel</button>
        <button onClick={znCookiesSetButton}>znCookiesSet</button>
        <button onClick={znCookieGetButton}>znCookiesGet</button>
        <button onClick={changeDocumentSize}>Change size</button>
        {!name && <button onClick={fetchUser}>Get User Info</button>}
        {name && <div>
          <p>Name: {name}</p>
          <p>TimeZone: {timezone}</p>
          <p>Last Login: {lastLogin}</p>
          <img src='/pbwh.png' alt='Powered by WizeHive' />
        </div>}
        {items.length > 0 && items.map((item, i) => <p key={i}>{ item }</p>)}
        <div style={{width: boxDim.width, height: boxDim.height, background: 'red'}}> </div>
      </header>
    </div>
  )
}

export default App
