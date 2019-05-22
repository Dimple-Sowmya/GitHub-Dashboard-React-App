import React from 'react';
import RepoDetail from './RepoDetail';
const { useState } = React;
const axios = require('axios');

const Card = (props) => {
  return (
    <div style={{ margin: '1em' }}>
      <div>
        <div onClick={() => props.selectRepo(props)} style={{ cursor: 'pointer', fontWeight: 'bold', color: 'blue' }}>{props.name}</div>
        <div>{props.blog}</div>
      </div>
    </div>
  )
}

const User = (props) => {
  return (
    <div style={{ margin: '1em' }}>
      {props.user.avatar_url ? 
        <img alt="avatar" style={{ width: '70px' }} src={props.user.avatar_url} />
        : null
      }
      <div>
        <div style={{ fontWeight: 'bold' }}>{props.user.name}</div>
        <div>{props.user.blog}</div>
      </div>
    </div>
  )
}

const Error = (props) => {
  return (
    <div style={{ margin: '1em', color: 'red' }}>
      <div>
        <div>{props.error}</div>
      </div>
    </div>
  )
}

const CardList = (props) => {
  return (
  <div> 
    {props.cards.length ? <h2>Repositories:</h2> : ''}
    {props.cards.map((card, index) => <Card key={index} selectRepo={props.onSelectRepo} {...card} />)}
  </div>
  );
}

const Form = (props) => {
  const [username, setUsername] = useState('')

  function handleSubmit (event){
    event.preventDefault()

    axios
      .get(`https://api.github.com/users/${username}`)
      .then(resp => {
        props.onUserAdd(resp.data)
        setUsername('') 
        props.addError('')
      }).catch((error)=>{
        props.addError('Username not found!')
      })

      axios
      .get(`https://api.github.com/users/${username}/repos`)
      .then(resp => {
        props.onReposAdd(resp.data)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={event => setUsername(event.target.value)}
        placeholder="GitHub username"
        required
      />
      <button type="submit">search</button>
    </form>
  )
}


const App = () => {
  const [cards, setCards] = useState([])
  const [user, setUser] = useState({});
  const [repo, setRepo] = useState({});
  const [error, setError] = useState('');

  function addNewCard(cardInfo){
    setCards(cardInfo);
  }

  function addUser(userInfo){
    setUser(userInfo);
  }

  function selectRepo(repo){
    setRepo(repo)
  }
  return (
    <div style={{float: 'left'}}>
      <h1>Github Dashboard Sample</h1>
      <RepoDetail selectedRepo={repo}/>
      <Form onUserAdd={addUser} onReposAdd={addNewCard} addError={setError}/>
      <User user={user} />
      <Error error={error}/>
      <CardList cards={cards} onSelectRepo={selectRepo}/>
    </div>
  )
}

export default App;
