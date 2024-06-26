import React from 'react'
import { Route, Routes } from 'react-router-dom'
import InsertPage from '../menu/InsertPage'

const MenuRouter = () => {
  return (
    <Routes>
        <Route path='/insert/:restaurant_id' element={<InsertPage/>}/>
    </Routes>
  )
}

export default MenuRouter