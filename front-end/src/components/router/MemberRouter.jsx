import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MypagePage from '../member/MypagePage'
import JoinPage from '../member/JoinPage'
import MeberListPage from '../member/MemberListPage'
import UpdatePage from '../member/UpdatePage'
import LoginPage from '../member/LoginPage'
import SearchIdPage from '../member/SearchIdPage'
import SearchPassPage from '../member/SearchPassPage'
import RatingPage from '../member/RatingPage'

const MemberRouter = () => {
    return (
        <Routes>
            <Route path='/read/:member_user_uid' element={<MypagePage />} />
            <Route path='/join' element={<JoinPage />} />
            <Route path='/list.json' element={<MeberListPage />} />
            <Route path='/update/:member_user_key' element={<UpdatePage />} />
            <Route path='/searchId' element={<SearchIdPage />} />
            <Route path='/searchPass' element={<SearchPassPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/rating/:user_uid' element={<RatingPage />} />
        </Routes>
    )
}

export default MemberRouter