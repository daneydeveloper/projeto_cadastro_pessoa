import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import UserDetails from './pages/UserDetails';
import UserList from './pages/UserList';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<UserList />} />
                <Route path='userDetails' element={<UserDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
