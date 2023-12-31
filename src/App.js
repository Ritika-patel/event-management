// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TodoList from './components/TodoList';
import AddGuest from './components/AddGuest';
import ViewGuest from './components/ViewGuest';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<TodoList />}/>
        <Route exact path="/add/:id" element={<AddGuest />}/>
        <Route exact path="/view/:id" element={<ViewGuest />}/>
      </Routes>
  </Router>
  );
};

export default App;
