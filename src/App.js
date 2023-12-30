// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TodoList from './components/TodoList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<TodoList />}/>
      </Routes>
  </Router>
  );
};

export default App;
