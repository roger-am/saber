import React from 'react'
import { Routes, Route } from 'react-router-dom'
import List from './pages/Client/List'
export default function AppRoutes(){
    return (
       <Routes>
            <Route path='/' element={ <List/>}>
            </Route>
       </Routes>
    )
}