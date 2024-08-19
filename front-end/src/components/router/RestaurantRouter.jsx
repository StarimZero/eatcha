import React from 'react'
import { Route, Routes } from 'react-router-dom'
import InsertPage from '../restaurant/InsertPage'
import HomePage from '../HomePage'
import ListPage from '../restaurant/ListPage'
import ReadPage from '../restaurant/ReadPage'
import UpdatePage from '../restaurant/UpdatePage'
import Top10Slider from '../main/Top10Slider'
import TotalPage from '../restaurant/TotalPage'

const RestaurantRouter = () => {
  return (
    <Routes>
        <Route path='/insert' element={<InsertPage/>}/>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/list' element={<ListPage/>}/>
        <Route path='/read/:restaurant_id' element={<ReadPage/>}/>
        <Route path='/update/:restaurant_id' element={<UpdatePage/>}/>
        <Route path='/list/top10page' element={<Top10Slider/>}/>
        <Route path='/total' element={<TotalPage/>}/>
    </Routes>
  )
}

export default RestaurantRouter