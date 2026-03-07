import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Movies from './pages/Movies';
import AddMovie from './pages/AddMovie';
import EditMovie from './pages/EditMovie';

const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/movies" element={<PrivateRoute><Movies /></PrivateRoute>} />
        <Route path="/movies/add" element={<PrivateRoute><AddMovie /></PrivateRoute>} />
        <Route path="/movies/edit/:id" element={<PrivateRoute><EditMovie /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default AppRouter;