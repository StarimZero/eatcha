import axios from 'axios';
import React, { useEffect, useState } from 'react'

const MemberListPage = () => {
    const [list, setList] = useState([]);
    const [page,setPage] =useState(1);
    const [size,setSize]=useState(5);
    const [word, setWord] =useState('');
    const [key,setKey]= useState('Member_user_name')
   
  return (
    <div>MemberListPage /member/list.json
      <h1>회원정보</h1>
      

    </div>
  )
}

export default MemberListPage