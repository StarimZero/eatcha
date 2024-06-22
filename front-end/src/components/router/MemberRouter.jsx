import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MypagePage from '../member/MypagePage'
import JoinPage from '../member/JoinPage'
import MeberListPage from '../member/MemberListPage'
import UpdatePage from '../member/UpdatePage'
import SearchPage from '../member/SearchPage'
import LoginPage from '../member/LoginPage'

const MemberRouter = () => {
    return (
        <Routes>
            <Route path='/read/:member_user_uid' element={<MypagePage/>} />
            <Route path='/join' element={<JoinPage/>} />
            <Route path='/list.json' element={<MeberListPage/>} />
            <Route path='/update/:member_user_key' element={<UpdatePage/>} />
            <Route path='/searchpage' element={<SearchPage/>} />
            <Route path='/login' element={<LoginPage/>}/>
        </Routes>
    )
}

export default MemberRouter