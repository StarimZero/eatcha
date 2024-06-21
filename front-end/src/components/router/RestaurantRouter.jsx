import React from 'react'
import { Route, Routes } from 'react-router-dom'
import InsertPage from '../restaurant/InsertPage'
import HomePage from '../HomePage'
import ListPage from '../restaurant/ListPage'
import ReadPage from '../restaurant/ReadPage'

const RestaurantRouter = () => {
  return (
    <Routes>
        <Route path='/insert' element={<InsertPage/>}/>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/list' element={<ListPage/>}/>
        <Route path='/read/:restaurant_id' element={<ReadPage/>}/>
    </Routes>
  )
}

export default RestaurantRouter