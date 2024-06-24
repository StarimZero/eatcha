import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row, Col, Table, Button, InputGroup, Form } from 'react-bootstrap'
import { FaTrashCan } from "react-icons/fa6";
import Pagination from 'react-js-pagination';
import '../Paging.css'

const FriendsListPage = () => {
    const [listFromMe, setListFromMe] = useState([]);
    const [listToMe, setListToMe] = useState([]);
    const uid = sessionStorage.getItem("uid")
    const [word, setWord] = useState('');
    const [key, setKey] = useState('member_friends_followid')


    const callAPI = async () => {
        // 내가 등록한 친구 목록 가져오기
        const res1 = await axios.get(`/friends/listFromMe?uid=${uid}&word=${word}&key=${key}`);
        setListFromMe(res1.data.doc);

        // 나를 등록한 친구 목록 가져오기
        const res2 = await axios.get(`/friends/listToMe?uid=${uid}&word=${word}&key=${key}`);
        setListToMe(res2.data.doc);
    }


    const onClickSearch = (e) => {
        e.preventDefault();
        callAPI();
    }

    const onDeleteFriends = async (fid, name) => {
        if (!window.confirm(`${name} 친구를 삭제하시겠습니까?`)) return;
        await axios.post('/friends/delete', { fid })
        alert("친구삭제가 완료되었습니다")
        callAPI();

    }

    useEffect(() => {
        callAPI();
    }, [])

    return (
        <div>
            <h1>즐겨찾기</h1>
            <Row>
                <Col xs={8} md={6} lg={4} >
                    <form onSubmit={onClickSearch}>
                        <InputGroup className='text-center'>
                            <Form.Select
                                value={key} className='me-2 selectbox'
                                onChange={(e) => {
                                    setKey(e.target.value)
                                }}>
                                <option value="member_friends_followid">아이디</option>
                                <option value="member_user_name">이름</option>
                            </Form.Select>
                            <Form.Control onChange={(e) => { setWord(e.target.value) }} value={word} placeholder='검색어를 입력하세요' className='me-2 w-50'></Form.Control>
                            <Button type='submit' variant='warning'>검색</Button>
                        </InputGroup>
                    </form>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <Table className='mt-3 text-center'>
                        <thead>
                            <tr className='text-center table-dark'>
                                <td>내가 등록한 친구</td>
                                <td>친구추가한 날짜</td>
                                <td>삭제</td>
                            </tr>
                        </thead>
                        <tbody>
                            {listFromMe.map(f =>
                                <tr key={f.member_friends_fid}>
                                    <td>{f.member_friends_followid}({f.member_user_name})</td>
                                    <td>{f.fmtdate}</td>
                                    <td><Button variant='danger' size='sm' onClick={() => onDeleteFriends(f.member_friends_fid, f.member_user_name)}><FaTrashCan /></Button></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <Table className='mt-3 text-center'>
                        <thead>
                            <tr className='text-center table-dark'>
                                <td>나를 등록한 친구</td>
                                <td>친구추가한 날짜</td>
                                <td>삭제</td>
                            </tr>
                        </thead>
                        <tbody>
                            {listToMe.map(f =>
                                <tr key={f.member_friends_fid}>
                                    <td>{f.member_friends_uid}({f.member_user_name})</td>
                                    <td>{f.fmtdate}</td>
                                    <td><Button variant='danger' size='sm' onClick={() => onDeleteFriends(f.member_friends_fid, f.member_user_name)}><FaTrashCan /></Button></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div>
    )
}

export default FriendsListPage