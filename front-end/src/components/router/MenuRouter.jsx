import React from 'react'
import { Route, Routes } from 'react-router-dom'
import InsertPage from '../menu/InsertPage'
import UpdatePage from '../menu/UpdatePage'

const MenuRouter = () => {
  return (
    <Routes>
        <Route path='/insert/:restaurant_id' element={<InsertPage/>}/>
        <Route path='/update/:menu_id' element={<UpdatePage/>}/>
    </Routes>
  )
}

export default MenuRouter