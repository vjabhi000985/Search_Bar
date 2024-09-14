import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar_2'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Country Search</h1>
        <SearchBar />
      </header>
    </div>
  )
}

export default App
