import React from 'react'
import { Routes, Route } from 'react-router-dom'
import BadgeListPage from '../badge/BadgeListPage';
import BadgeUpdatePage from '../badge/BadgeUpdatePage';
import BadgeCreatePage from '../badge/BadgeCreatePage';
import MyBadgePage from '../badge/MyBadgePage';

const BadgeRouter = () => {
  return (
    <Routes>
        <Route path='/list.json' element={<BadgeListPage/>}/>
        <Route path='/update/:key' element={<BadgeUpdatePage/>}/>
        <Route path='/create' element={<BadgeCreatePage/>}/>
        <Route path='/:uid' element={<MyBadgePage/>}/>
    </Routes>
  )
}

export default BadgeRouter