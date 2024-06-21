import React from 'react'
import { Routes, Route } from 'react-router-dom'
import FriendsListPage from '../friends/FriendsListPage'
const FriendsRouter = () => {
  return (
    <Routes>
        <Route path='/list.json' element={<FriendsListPage/>}/>
    </Routes>
  )
}

export default FriendsRouter