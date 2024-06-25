import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Card, Col, Button, InputGroup, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const SearchIdPage = () => {
    const [findid, setUid] = useState("");
    const [form, setform] = useState({
        name: '김인섭',
        phone: '01041110342'
    })
    const { name, phone } = form;

    const onChangeForm = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const onFindId = async (name, phone) => {
        const res = await axios.post('/member/find/id', { name, phone });
        console.log(res.data);
        if (res.data === "") {
            alert("등록된 아이디가 없습니다")
            if (window.confirm("회원가입하시겠습니까?")) {
                window.location.href = "/member/join"
            }
        } else {
            setUid(res.data.member_user_uid);
        }
    }
    useEffect(() => { console.log(findid) }, [findid])
    return (
        <div>
            <h3>아이디찾기</h3>
            {findid ?
                <div>
                    <h1> 아이디는 {findid} 입니다</h1>
                <Link to="/member/login">로그인</Link>
                <Link to={`/member/searchPass?findid=${findid}`}>비밀번호 찾기</Link>
                </div>
                :
                <Row>
                    <Col xs={6}>
                        <Card>
                            <InputGroup className='h-25'>
                                <InputGroup.Text className=' justify-content-center '>이름</InputGroup.Text>
                                <Form.Control name="name" value={name} onChange={onChangeForm} />
                            </InputGroup >
                            <InputGroup>
                                <InputGroup.Text className='justify-content-center ' >전화번호</InputGroup.Text>
                                <Form.Control name="phone" value={phone} onChange={onChangeForm} />
                            </InputGroup>
                            <Button className='w-100 mt-2 btn-warning' onClick={() => onFindId(name, phone)} >아이디 찾기</Button>
                        </Card>
                    </Col>
                </Row>
            }
        </div>
    )
}

export default SearchIdPage