import React from 'react'
import { Routes, Route } from 'react-router-dom'
import BadgeListPage from '../badge/BadgeListPage';
import BadgeUpdatePage from '../badge/BadgeUpdatePage';

const BadgeRouter = () => {
  return (
    <Routes>
        <Route path='/list.json' element={<BadgeListPage/>}/>
        <Route path='/update' element={<BadgeUpdatePage/>}/>
    </Routes>
  )
}

export default BadgeRouter