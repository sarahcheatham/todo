import React, { Component } from 'react';
import './App.css';
import Todolist from './todolist'
import List from './list'


class App extends Component {
  state = {
    list: [],
    inputValue: '',
    checked: false,
};
  
  render() {
    return (
      <div className="App">
        <Todolist/>
        <List/>
      </div>
    );
  }
}

export default App;
