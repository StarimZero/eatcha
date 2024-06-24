import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Col, Table, Alert, Button, InputGroup, Form } from 'react-bootstrap';
import { FaTrashCan } from "react-icons/fa6";
import Pagination from 'react-js-pagination';
import '../Paging.css'

const MemberListPage = () => {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [word, setWord] = useState('');
    const [key, setKey] = useState('Member_user_name')
    const [count, setCount] = useState(0);
    const [chk, setChk] = useState(0);

    const callAPI = async () => {
        const res = await axios.get(`/member/list?page=${page}&size=${size}&key=${key}&word=${word}`)
        const documents = res.data.documents;
        console.log(documents)
        if (documents) {
            const updatedList = documents.map(user => ({
                ...user,
                member_user_gender: user.member_user_gender === 1 ? '남자' : '여자'
            }));
            setList(updatedList);
        } else {
            setList([]);
        }

        setCount(res.data.count);
        if (page > Math.ceil(res.data.count / size)) setPage(page - 1);

    }
    /*회원정보검색*/
    const onClickSerch = () => {
        setPage(1);
        callAPI();
    }

    /* 체크 시스템 */
    const onChangeAll = (e) => {
        setList(list.map(u => u && { ...u, checked: e.target.checked }));
    }

    const onChangeSingle = (e, key) => {
        setList(list.map(u => u.member_user_key === key ? { ...u, checked: e.target.checked } : u));
    }

    const onDelete = async (user) => {
        if (!window.confirm(`"${user.member_user_name}" 회원정보를 삭제하시겠습니까?`)) return;
        const res = await axios.post('/member/delete', { key: user.member_user_key });
        if (res.data.result === 1) {
            alert("회원정보 삭제 성공!")
            callAPI();
        } else {
            alert("회원정보 삭제 실패!")
        }
    }

    const onCheckedDelete = () => {
        if (chk === 0) {
            alert("삭제할 회원정보를 선택하세요!")
            return;
        }
        if (!window.confirm(`"${chk}" 개  데이터를 삭제하시겠습니까?`)) return;
        let deleted = 0;
        let cnt = 0;
        list.forEach(async u => {
            if (u.checked) {
                const res = await axios.post('/books/delete', { key: u.member_user_key });
                cnt++;
                if (res.data.result === 1) deleted++;
                if (cnt === chk) {
                    alert(`${deleted}개의 회원정보가 삭제되었습니다.`);
                    callAPI();
                }
            }
        })
    }
    useEffect(() => {
        let count = 0;
        list.map(e => e.checked && count++);
        setChk(count);
    }, [list]);

    useEffect(() => {
        callAPI()
    }, [page])

    //친구추가 시스템 테스트 나중에 삭제 예정//
    const onAddFriends = async (followid) => {
        const uid = sessionStorage.getItem("uid")
        if(uid===followid){
            alert("자기 자신은 친구추가가 안됩니다")
        }else{
            await axios.post('/friends/insert', { uid, followid})
            alert("친구추가완료!")
        }
        
    }

    return (
        <div className='text-center'>
            <h3>회원정보</h3>
            <Row className='justify-content-center'>
                <Col xs={10}>
                    <Row>
                        <Col xs={8} md={6} lg={4} >
                            <form>
                                <InputGroup className='text-center'>
                                    <Form.Select
                                        value={key} className='me-2 selectbox'
                                        onChange={(e) => {
                                            setKey(e.target.value)
                                        }}>
                                        <option value="member_user_name">이름</option>
                                        <option value="member_user_key">Key</option>
                                        <option value="member_user_uid">아이디</option>
                                        <option value="member_user_auth">권한</option>
                                    </Form.Select>
                                    <Form.Control onChange={(e) => { setWord(e.target.value) }} value={word} placeholder='검색어를 입력하세요' className='me-2 w-50'></Form.Control>
                                    <Button variant='warning' onClick={onClickSerch} >검색</Button>
                                </InputGroup>
                            </form>
                        </Col>
                        <Col className='text-end'>
                            <Button variant='danger' onClick={onCheckedDelete}>선택삭제</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='text-center'>
                            {count > 0 ?
                                <Table striped bordered hover className='mt-3'>
                                    <thead>
                                        <tr className='text-center table-dark'>
                                            <td><input type='checkbox' checked={list.length === chk} onChange={onChangeAll} /></td>
                                            <td>KEY</td>
                                            <td>ID</td>
                                            <td>이름</td>
                                            <td>생년월일</td>
                                            <td>성별</td>
                                            <td>전화번호</td>
                                            <td>등록일</td>
                                            <td>권한</td>
                                            <td>레벨</td>
                                            <td>삭제</td>
                                            <td>친구추가</td>
                                        </tr>
                                    </thead>
                                    <tbody className='align-middle'>
                                        {list.map(u =>
                                            <tr key={u.member_user_key}>
                                                <td><input type='checkbox' checked={u.checked} onChange={(e) => onChangeSingle(e, u.member_user_key)} /></td>
                                                <td width="10%" >{u.member_user_key}</td>
                                                <td width="10%"> {u.member_user_uid}</td>
                                                <td width="10%"> <a href={`/member/update/${u.member_user_key}`}>{u.member_user_name}</a></td>
                                                <td width="10%">{u.fmtbirth}</td>
                                                <td width="10%">{u.member_user_gender}</td>
                                                <td width="10%">{u.member_user_phone}</td>
                                                <td width="10%">{u.fmtdate}</td>
                                                <td width="10%">{u.member_user_auth}</td>
                                                <td width="10%">{u.member_user_grade}({u.member_user_exp})</td>
                                                <td><Button variant='danger' className='btn-sm' onClick={() => onDelete(u)}><FaTrashCan /></Button></td>
                                                <td><Button onClick={() => onAddFriends(u.member_user_uid)}>친구추가</Button></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                                :
                                <div className='my-5'>
                                    <Alert variant='secondary'>
                                        <h1 className='my-3'>검색된 결과가 없습니다!</h1>
                                    </Alert>
                                </div>
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>

            {count > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={count}
                    pageRangeDisplayed={5}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={(e) => setPage(e)} />
            }
        </div>
    )
}

export default MemberListPage