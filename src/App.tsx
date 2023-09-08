import './App.css';
import Nav from './components/Nav'
import Card from './components/Card'
import { useEffect, useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import React from 'react';

function App() {

const [fact, setFact] = useState<string>("")
const [allFacts, setAllFacts] = useState<[]>([])
const [gif, setGif] = useState<string>("")
const [error, setError] = useState<string>('')

useEffect(() => {

  fetch("https://cat-fact.herokuapp.com/facts")
    .then(res => {
      if(!res.ok) {
        throw Error('Unexpected error. Please refresh the page')
      }
      return res.json()
    })
    .then(data => {
      setAllFacts(data)
    })
    .catch(err => {
      setError(err.message)
    })

},[])

useEffect(() => {

  fetch("https://cataas.com/cat/gif")
    .then(res => {
    if(!res.ok) {
      throw Error('Unexpected error. Please refresh the page')
    }
    return res
  })
    .then(data => {
      setGif(data.url)

  })
    .catch(err => {
      setError(err.message)
  })
    
},[])

function getFact() {
  const randomNum = Math.floor(Math.random() * allFacts.length)
  const currentFact = allFacts[randomNum].text
  setFact(currentFact)
}

  return (

    <div className="App">
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Lumanosimo&family=Roboto:wght@100&display=swap" rel="stylesheet"/>
      <Nav />
        <Routes>
          <Route path="/" element={ 
          <div className="home">
            { error ? <h3 className="error-message">{error}</h3> :
            !fact && 
            <>
            <div className="intro">
              <h2>Welcome Cat Lovers!</h2>
              <p>Click below to learn more about your Meow-velous companion!</p>
            </div>
              <button className="get-random-button" onClick={getFact}>Get New Fact</button>
            </> }
            {fact?  
              <>
              <button className="get-random-button" onClick={getFact}>Get New Fact 
              </button><Card gif={gif} factText={fact} />
              </> : <p></p> }
            </div> } />
        </Routes>
    </div>
  )
};

export default App;