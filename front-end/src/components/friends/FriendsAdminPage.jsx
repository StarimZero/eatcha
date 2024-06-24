import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row, Col, Table, Button } from 'react-bootstrap'

const FriendsAdminPage = () => {
    const [list,setList]= useState([]);
    const callAPI=async()=>{
        const res = await axios.get('/friends/admin/list')
        console.log(res.data)
        setList(res.data);
    }
    useEffect(()=>{
        callAPI();
    },[])
    return (
        <div>
            <h1>전체즐겨찾기목록</h1>
            <Row>
                <Col xs={6}>
                    <Table className='mt-3 text-center'>
                        <thead>
                            <tr className='text-center table-dark'>
                                <td>no</td>
                                <td>From</td>
                                <td>To</td>
                                <td>친구추가한 날짜</td>
                                <td>삭제</td>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map(f=>
                            <tr key={f.member_friends_fid}>
                                <td>{f.member_friends_fid}</td>
                                <td>{f.member_friends_uid}({f.member_user_name})</td>
                                <td>{f.member_friends_followid}</td>
                                <td>{f.fmtdate}</td>
                                <td><Button>삭제하기</Button></td>
                            </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div>
    )
}

export default FriendsAdminPage