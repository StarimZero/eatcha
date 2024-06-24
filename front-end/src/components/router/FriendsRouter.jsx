import React from 'react'
import { Routes, Route } from 'react-router-dom'
import FriendsListPage from '../friends/FriendsListPage'
import FriendsAdminPage from '../friends/FriendsAdminPage'
const FriendsRouter = () => {
  return (
    <Routes>
        <Route path='/list.json' element={<FriendsListPage/>}/>
        <Route path='/admin/list.json' element={<FriendsAdminPage/>}/>
    </Routes>
  )
}

export default FriendsRouter